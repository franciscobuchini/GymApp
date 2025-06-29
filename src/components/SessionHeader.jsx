// src/components/SessionHeader.jsx
import { useNavigate } from 'react-router-dom'
import DayNavigator from './DayNavigator'
import { Icon } from '@iconify/react'

export default function SessionHeader() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/app')
  }

  const handleDayChange = (date) => {
    console.log('Día seleccionado:', date.toISOString())
  }

  return (
    <header className="flex justify-between items-center p-4 bg-blue-100 relative">
      <div>
        <button
          onClick={handleBack}
          className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          <Icon icon="line-md:chevron-double-left" />
        </button>
      </div>
      <DayNavigator onChange={handleDayChange} />
    </header>
  )
}
