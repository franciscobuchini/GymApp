// pages/App.jsx
import { useState } from 'react'
import AppHeader from '../components/AppHeader'
import DayNavigator from '../components/DayNavigator'
import SessionsList from '../components/SessionsList'
import MobileContainer from '../components/MobileContainer'

export default function App() {
  const [sessions, setSessions] = useState([])

  const handleDayChange = (date) => {
    console.log('Día seleccionado:', date.toISOString())
    // TODO: usar esta fecha como filtro o clave de guardado
  }

  return (
    <div className="min-h-screen bg-white">
      <AppHeader />
      <MobileContainer>
        <DayNavigator onChange={handleDayChange} />
        <SessionsList sessions={sessions} />
      </MobileContainer>
    </div>
  )
}
