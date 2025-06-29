import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import DayNavigator from './DayNavigator'
import { Icon } from '@iconify/react'

export default function AppHeader() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

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

  const handleDayChange = (date) => {
    console.log('Día seleccionado:', date.toISOString())
  }

  return (
    <header className="flex justify-between items-center p-4 bg-blue-100 relative">
      
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleMenu}
          className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          <Icon icon="line-md:menu" />
        </button>
        {open && (
          <div className="absolute -right-30 w-40 bg-white border rounded-md shadow-lg z-50">
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>

      <DayNavigator onChange={handleDayChange} />

    </header>
  )
}
