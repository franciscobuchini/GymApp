// pages/App.jsx
import { useState } from 'react'
import AppHeader from '../components/AppHeader'
import SessionsList from '../components/SessionsList'
import CreateSessionButton from '../components/CreateSessionButton'
import MobileContainer from '../components/MobileContainer'

export default function App() {
  const [sessions, setSessions] = useState([])

  return (
    <div className="min-h-screen bg-white">
      <AppHeader />
      <MobileContainer>
        <CreateSessionButton />
        <SessionsList sessions={sessions} />
      </MobileContainer>
    </div>
  )
}
