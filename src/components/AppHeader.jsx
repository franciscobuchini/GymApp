import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import DayNavigator from './DayNavigator'

export default function AppHeader() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  const user = JSON.parse(localStorage.getItem('user'))
  const photo = user?.picture

  const toggleMenu = () => setOpen(!open)
  const logout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  console.log('Foto de usuario:', photo)

  const handleDayChange = (date) => {
  console.log('Día seleccionado:', date.toISOString())

  }

  return (
    <header className="flex justify-between items-center p-4 shadow-md relative">
      <DayNavigator onChange={handleDayChange} />
      <div className="relative" ref={dropdownRef}>
        {photo ? (
          <img
            src={photo}
            alt="avatar"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={toggleMenu}
            onError={e => (e.currentTarget.style.display = 'none')}
          />
        ) : (
          <div
            onClick={toggleMenu}
            className="w-10 h-10 bg-gray-300 text-white rounded-full flex items-center justify-center cursor-pointer"
          >
            {user?.name?.[0] || 'U'}
          </div>
        )}
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
