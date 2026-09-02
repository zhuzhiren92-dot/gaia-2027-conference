import { FormEvent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PageFrame } from '../components/PageFrame'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

type AuthMode = 'login' | 'register'
type LocationState = { from?: string }

export function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const destination = (location.state as LocationState | null)?.from || '/account'

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode)
    setMessage('')
    setPassword('')
    setConfirmPassword('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!supabase) return
    if (password.length < 8) {
      setMessage('Password must contain at least 8 characters.')
      return
    }
    if (mode === 'register' && password !== confirmPassword) {
      setMessage('The two passwords do not match.')
      return
    }

    setBusy(true)
    setMessage('')
    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        navigate(destination, { replace: true })
        return
      }

      const appBaseUrl = new URL(import.meta.env.BASE_URL, window.location.origin)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: new URL('account', appBaseUrl).toString(),
          data: { contact_email: email },
        },
      })
      if (error) throw error
      if (data.session) {
        navigate('/account', { replace: true })
      } else {
        setMessage('Registration received. Please check your email to confirm your account, then sign in.')
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Authentication failed. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <PageFrame showSchoolCarousel={false} showIntroSections={false} pageName="ACCOUNT" pageStatement="Participant account">
      <section className="utility-page page-width" data-reveal>
        <div className="utility-heading">
          <p className="section-kicker">PARTICIPANT ACCOUNT</p>
          <h1>{mode === 'login' ? 'Sign in' : 'Create your account'}</h1>
          <p>Use your email and password to manage your profile and GAIA 2027 submission.</p>
        </div>

        {!isSupabaseConfigured ? (
          <div className="utility-notice">
            <strong>Account service setup is in progress.</strong>
            <p>The registration system will be available after the conference backend is connected.</p>
          </div>
        ) : (
          <div className="auth-panel">
            <div className="auth-tabs" role="tablist" aria-label="Account access">
              <button type="button" className={mode === 'login' ? 'is-active' : ''} onClick={() => switchMode('login')}>Sign in</button>
              <button type="button" className={mode === 'register' ? 'is-active' : ''} onClick={() => switchMode('register')}>Register</button>
            </div>

            <form className="utility-form" onSubmit={handleSubmit}>
              <label>
                <span>Email</span>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
              </label>
              <label>
                <span>Password</span>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength={8} required />
              </label>
              {mode === 'register' ? (
                <label>
                  <span>Confirm password</span>
                  <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" minLength={8} required />
                </label>
              ) : null}

              {message ? <p className="form-message" role="status">{message}</p> : null}
              <button className="pill-action-link utility-primary-button" type="submit" disabled={busy}>
                <span className="pill-link-icon" aria-hidden="true">→</span>
                <strong>{busy ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Register'}</strong>
              </button>
            </form>
          </div>
        )}
      </section>
    </PageFrame>
  )
}