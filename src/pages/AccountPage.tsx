import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/auth-context'
import { PageFrame } from '../components/PageFrame'
import { countries } from '../data/countries'
import { supabase } from '../lib/supabase'
import type { Profile } from '../types/backend'

const emptyProfile = (userId: string, email: string): Profile => ({
  user_id: userId,
  title: '',
  first_name: '',
  last_name: '',
  gender: '',
  institution: '',
  department: '',
  country_region: '',
  contact_email: email,
})

export function AccountPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [editing, setEditing] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [busy, setBusy] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const client = supabase
    if (!user || !client) return
    let active = true

    const loadAccount = async () => {
      setBusy(true)
      const [profileResult, adminResult] = await Promise.all([
        client.from('profiles').select('*').eq('user_id', user.id).maybeSingle(),
        client.rpc('is_admin'),
      ])
      if (!active) return

      const nextProfile = (profileResult.data as Profile | null) ?? emptyProfile(user.id, user.email ?? '')
      setProfile(nextProfile)
      setEditing(!nextProfile.first_name && !nextProfile.last_name)
      setIsAdmin(Boolean(adminResult.data))
      setMessage(profileResult.error ? profileResult.error.message : '')
      setBusy(false)
    }

    loadAccount()
    return () => { active = false }
  }, [user])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setProfile((current) => current ? { ...current, [name]: value } : current)
  }

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!supabase || !profile) return
    setBusy(true)
    setMessage('')
    const { error } = await supabase.from('profiles').upsert({
      user_id: profile.user_id,
      title: profile.title,
      first_name: profile.first_name,
      last_name: profile.last_name,
      gender: profile.gender,
      institution: profile.institution,
      department: profile.department,
      country_region: profile.country_region,
      contact_email: profile.contact_email,
      updated_at: new Date().toISOString(),
    })
    setBusy(false)
    if (error) {
      setMessage(error.message)
      return
    }
    setEditing(false)
    setMessage('Profile saved successfully.')
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login', { replace: true })
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Sign out failed.')
    }
  }

  if (!user || !profile || busy && !profile) {
    return <div className="utility-loading">Loading account...</div>
  }

  return (
    <PageFrame showSchoolCarousel={false} showIntroSections={false} pageName="ACCOUNT" pageStatement="Participant account">
      <section className="utility-page page-width" data-reveal>
        <div className="utility-heading account-heading">
          <div>
            <p className="section-kicker">PERSONAL PROFILE</p>
            <h1>My account</h1>
            <p>Signed in as {user.email}</p>
          </div>
          <button className="text-action" type="button" onClick={handleSignOut}>Sign out</button>
        </div>

        <form className="utility-form profile-form" onSubmit={saveProfile}>
          <div className="profile-actions">
            <button className="pill-action-link utility-secondary-button" type="button" onClick={() => setEditing(true)} disabled={editing}>
              <span className="pill-link-icon" aria-hidden="true">✎</span>
              <strong>Edit profile</strong>
            </button>
            <Link className="pill-action-link" to="/submission">
              <span className="pill-link-icon" aria-hidden="true">↗</span>
              <strong>Edit my submission</strong>
            </Link>
            {isAdmin ? <Link className="pill-action-link" to="/admin"><span className="pill-link-icon" aria-hidden="true">→</span><strong>Admin dashboard</strong></Link> : null}
          </div>

          <div className="profile-grid">
            <label>
              <span>Title</span>
              <select name="title" value={profile.title} onChange={handleChange} disabled={!editing}>
                <option value="">Select title</option>
                <option>Prof.</option><option>Dr.</option><option>Mr.</option><option>Ms.</option><option>Mx.</option><option>Other</option>
              </select>
            </label>
            <label>
              <span>Gender</span>
              <select name="gender" value={profile.gender} onChange={handleChange} disabled={!editing}>
                <option value="">Select gender</option>
                <option>Female</option><option>Male</option><option>Non-binary</option><option>Other</option><option>Prefer not to say</option>
              </select>
            </label>
            <label>
              <span>First name</span>
              <input name="first_name" value={profile.first_name} onChange={handleChange} disabled={!editing} />
            </label>
            <label>
              <span>Last name</span>
              <input name="last_name" value={profile.last_name} onChange={handleChange} disabled={!editing} />
            </label>
            <label>
              <span>School / Institution</span>
              <input name="institution" value={profile.institution} onChange={handleChange} disabled={!editing} />
            </label>
            <label>
              <span>Department</span>
              <input name="department" value={profile.department} onChange={handleChange} disabled={!editing} />
            </label>
            <label>
              <span>Country / Region</span>
              <select name="country_region" value={profile.country_region} onChange={handleChange} disabled={!editing}>
                <option value="">Select country or region</option>
                {countries.map((country) => <option value={country} key={country}>{country}</option>)}
              </select>
            </label>
            <label>
              <span>Contact email</span>
              <input type="email" name="contact_email" value={profile.contact_email} onChange={handleChange} disabled={!editing} required />
            </label>
          </div>

          {message ? <p className="form-message" role="status">{message}</p> : null}
          {editing ? (
            <button className="pill-action-link utility-primary-button" type="submit" disabled={busy}>
              <span className="pill-link-icon" aria-hidden="true">✓</span>
              <strong>{busy ? 'Saving...' : 'Save changes'}</strong>
            </button>
          ) : null}
        </form>
      </section>
    </PageFrame>
  )
}