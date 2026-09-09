import assert from 'node:assert/strict'
import { pathToFileURL } from 'node:url'
import { readFile } from 'node:fs/promises'
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE_PATH ? pathToFileURL(process.env.PLAYWRIGHT_MODULE_PATH).href : 'playwright')
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, serviceWorkers: 'block' })
const page = await context.newPage()
const errors = []
page.on('pageerror', error => errors.push(error.message))
let signup = null
let submission = null
let uploads = 0
let writes = 0
let failWrite = false
const id = '00000000-0000-4000-8000-000000000001'
const user = { id, aud: 'authenticated', role: 'authenticated', email: 'test@example.com', app_metadata: { provider: 'email' }, user_metadata: { first_name: 'Zhiren', last_name: 'Zhu' }, created_at: new Date().toISOString() }
const profile = { user_id: id, title: 'Dr.', first_name: 'Zhiren', last_name: 'Zhu', gender: '', institution: 'City University of Hong Kong', department: '', country_region: 'China', contact_email: 'test@example.com' }
const enc = value => Buffer.from(JSON.stringify(value)).toString('base64url')
const token = enc({ alg: 'HS256', typ: 'JWT' }) + '.' + enc({ sub: id, aud: 'authenticated', role: 'authenticated', exp: Math.floor(Date.now()/1000)+3600 }) + '.test'
await context.route('https://*.supabase.co/**', async route => {
  const request = route.request()
  const url = new URL(request.url())
  const method = request.method()
  const respond = (body, status=200, headers={}) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body), headers })
  if (url.pathname === '/auth/v1/signup') {
    signup = request.postDataJSON()
    return respond(user)
  }
  if (url.pathname === '/auth/v1/token') return respond({ access_token: token, refresh_token: 'test-refresh', token_type: 'bearer', expires_in: 3600, user })
  if (url.pathname === '/auth/v1/user') return respond(user)
  if (url.pathname === '/rest/v1/rpc/is_admin') return respond(false)
  if (url.pathname === '/rest/v1/profiles') {
    if (method === 'POST') Object.assign(profile,request.postDataJSON())
    return respond(profile)
  }
  if (url.pathname === '/rest/v1/submissions') {
    if (method === 'POST') {
      writes++
      if (failWrite) return respond({ message: 'Simulated save failure' },500)
      submission = { id: 'test-submission', ...request.postDataJSON() }
    }
    return respond(submission)
  }
  if (url.pathname.startsWith('/storage/v1/object/')) {
    if (method === 'POST') { uploads++; return respond({ Key: 'test-file', Id: 'test-id' }) }
    if (method === 'DELETE') return respond([])
    return route.fulfill({ contentType: 'application/pdf', body: Buffer.from('%PDF-1.4 test submission') })
  }
  throw Error('Unexpected backend request: '+method+' '+url.pathname)
})
try {
  await page.goto('http://127.0.0.1:5180/submission')
  await page.getByRole('link',{name:'Sign in or register',exact:true}).click()
  await page.getByRole('button',{name:'Register',exact:true}).click()
  await page.getByLabel('First name',{exact:true}).fill(' Zhiren ')
  await page.getByLabel('Last name',{exact:true}).fill(' Zhu ')
  await page.getByLabel('Email',{exact:true}).fill('test@example.com')
  await page.getByLabel('Password',{exact:true}).fill('Test-only-password-123!')
  await page.getByLabel('Confirm password',{exact:true}).fill('Test-only-password-123!')
  await page.locator('form').getByRole('button',{name:'Register',exact:true}).click()
  await page.getByText('Registration received.',{exact:false}).waitFor()
  assert.equal(signup.data.first_name,'Zhiren')
  assert.equal(signup.data.last_name,'Zhu')
  await page.getByRole('button',{name:'Sign in',exact:true}).click()
  await page.getByLabel('Password',{exact:true}).fill('Test-only-password-123!')
  await page.locator('form').getByRole('button',{name:'Sign in',exact:true}).click()
  await page.getByRole('heading',{name:'Welcome, Zhiren Zhu',exact:true}).waitFor()
  assert.equal(await page.getByLabel('First name',{exact:true}).inputValue(),'Zhiren')
  await page.getByRole('button',{name:'Edit my submission',exact:true}).click()
  assert.ok(page.url().endsWith('/account'))
  await page.getByLabel('Paper Title',{exact:true}).fill('Partial abstract')
  await page.getByLabel('Upload File',{exact:false}).setInputFiles({ name: 'abstract.pdf', mimeType:'application/pdf', buffer: Buffer.from('%PDF-1.4 test submission') })
  await page.getByRole('button',{name:'Save',exact:true}).click()
  await page.getByRole('dialog').waitFor()
  assert.equal(uploads,1)
  assert.equal(submission.status,'draft')
  assert.ok(submission.file_path)
  assert.equal(submission.file_name,'abstract.pdf')
  assert.ok((await page.getByRole('dialog').innerText()).includes('Dear Zhiren Zhu'))
  const red = await page.locator('#submission-notice-message').evaluate(el=>getComputedStyle(el).color)
  assert.equal(red,'rgb(16, 23, 28)')
  await page.getByRole('button',{name:'OK',exact:true}).click()
  await page.reload()
  await page.getByRole('button',{name:'Edit my submission',exact:true}).click()
  await page.getByLabel('Paper Title',{exact:true}).waitFor()
  assert.equal(await page.getByLabel('Paper Title',{exact:true}).inputValue(),'Partial abstract')
  const savedFile = submission.file_path
  await page.getByRole('button',{name:'Save',exact:true}).click()
  await page.getByRole('dialog').waitFor()
  assert.equal(submission.file_path,savedFile)
  assert.equal(uploads,1)
  await page.getByText('Note: No file uploaded.',{exact:true}).waitFor()
  assert.equal(await page.locator('.submission-notice-warning').evaluate(el=>getComputedStyle(el).color),'rgb(180, 35, 24)')
  await page.getByRole('button',{name:'OK',exact:true}).click()
  await page.getByText('Select Files',{exact:true}).waitFor()
  await page.getByText('No file selected',{exact:true}).waitFor()
  const oldWrites = writes
  await page.getByRole('button',{name:'Submit',exact:true}).click()
  await page.getByRole('alert').waitFor()
  assert.equal(writes,oldWrites)
  await page.getByLabel('Poster',{exact:true}).check()
  const topics = await page.getByLabel('Conference Topic',{exact:false}).locator('option').allTextContents()
  assert.deepEqual(topics.slice(1).map(s=>s.slice(0,2)),['01','02','03','04','05','06'])
  await page.getByLabel('Conference Topic',{exact:false}).selectOption({index:1})
  await page.getByLabel('Authors Name',{exact:true}).fill('Zhiren Zhu')
  await page.getByLabel('Upload File',{exact:false}).setInputFiles({ name:'abstract.pdf', mimeType:'application/pdf', buffer:Buffer.from('%PDF-1.4 test submission') })
  await page.getByRole('button',{name:'Submit',exact:true}).click()
  await page.getByRole('dialog').waitFor()
  assert.equal(uploads,2)
  assert.equal(submission.status,'submitted')
  assert.equal(submission.file_name,'abstract.pdf')
  await page.getByRole('button',{name:'OK',exact:true}).click()
  const downloadPromise=page.waitForEvent('download')
  await page.getByRole('button',{name:'Download my file',exact:true}).click()
  const download=await downloadPromise
  assert.equal(download.suggestedFilename(),'abstract.pdf')
  assert.equal((await readFile(await download.path())).toString(),'%PDF-1.4 test submission')
  await page.getByRole('button',{name:'Edit profile',exact:true}).click()
  await page.getByLabel('First name',{exact:true}).fill('Jeff')
  await page.getByRole('button',{name:'Save changes',exact:true}).click()
  await page.getByText('Profile saved successfully.').waitFor()
  await page.getByRole('heading',{name:'Welcome, Jeff Zhu',exact:true}).waitFor()
  await page.getByRole('button',{name:'Edit my submission',exact:true}).click()
  assert.equal(await page.getByLabel('Paper Title',{exact:true}).inputValue(),'Partial abstract')
  failWrite = true
  await page.getByRole('button',{name:'Save',exact:true}).click()
  await page.getByRole('alert').filter({hasText:'Simulated save failure'}).waitFor()
  assert.equal(await page.getByRole('dialog').count(),0)
  failWrite = false
  await page.setViewportSize({width:390,height:844})
  await page.evaluate(()=>window.scrollTo(0,0))
  await page.getByLabel('Paper Title',{exact:true}).scrollIntoViewIfNeeded()
  await page.waitForFunction(() => {
    const el=document.querySelector('input[name="paperTitle"]')
    for(let node=el;node;node=node.parentElement) if(getComputedStyle(node).opacity==='0') return false
    return Boolean(el)
  })
  await page.waitForTimeout(700)
  await page.screenshot({path:'tests/account-mobile.local.png',fullPage:false})
  const overflow = await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth)
  assert.equal(overflow,false,'Mobile horizontal overflow')
  await page.setViewportSize({width:1440,height:1000})
  await page.getByLabel('Paper Title',{exact:true}).scrollIntoViewIfNeeded()
  await page.waitForTimeout(700)
  await page.screenshot({path:'tests/account-desktop.local.png',fullPage:false})
  await page.goto('http://127.0.0.1:5180/submission')
  await page.getByRole('heading',{name:'Submission',exact:true}).waitFor()
  assert.equal(await page.getByRole('link',{name:'Sign in or register',exact:true}).count(),0)
  assert.equal(await page.locator('form').count(),0)
  assert.deepEqual(errors,[])
  console.log('PASS: registration names, welcome/profile, inline editor, SAVE uploads files and preserves them on text-only updates, validation, submit, own-file download, profile edits, save failure, mobile overflow, no JS errors.')
} finally {
  await context.close()
  await browser.close()
}
