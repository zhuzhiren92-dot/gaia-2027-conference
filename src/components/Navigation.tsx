import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { DockSurface } from './DockSurface'
import { conference } from '../content/conference'

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="nav-shell">
        <NavLink className="brand-mark" to="/" aria-label="GAIA 2027 home">
          <span className="brand-symbol" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>
            GAIA <b>2027</b>
          </span>
        </NavLink>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span>{menuOpen ? 'CLOSE' : 'MENU'}</span>
          <span className="menu-lines" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>

        <DockSurface
          as="nav"
          id="main-navigation"
          className={`main-nav ${menuOpen ? 'is-open' : ''}`}
          distance={145}
          magnification={1.038}
          lift={5}
          aria-label="Main navigation"
        >
          {conference.navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'is-active' : ''}`
              }
              data-dock-item
            >
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </DockSurface>
      </div>
    </header>
  )
}
