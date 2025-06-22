// src/components/SessionHeader.jsx
import { useNavigate } from 'react-router-dom'
import DayNavigator from './DayNavigator'

export default function SessionHeader() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/app')
  }

  const handleDayChange = (date) => {
    console.log('Día seleccionado:', date.toISOString())
  }

  return (
    <header className="flex justify-between items-center p-4 shadow-md relative">
      <DayNavigator onChange={handleDayChange} />
      <button
        onClick={handleBack}
        className="w-10 h-10 bg-gray-200 text-xl rounded-full flex items-center justify-center hover:bg-gray-300"
        aria-label="Back to menu"
      >
        ←
      </button>
    </header>
  )
}
