// src/components/SessionsList.jsx
import { useNavigate } from 'react-router-dom'

export default function SessionsList({ sessions = [] }) {
  const navigate = useNavigate()

  const handleCreateSession = () => {
    navigate('/session/new') // Ruta global sin rutina
  }

  return (
    <div className="mt-6 w-full">
      <h2 className="text-lg font-semibold mb-2">Sessions</h2>
      <ul className="space-y-2">
        <li>
          <button
            onClick={handleCreateSession}
            className="w-full text-left px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
          >
            + Create a session
          </button>
        </li>
        {sessions.map(session => (
          <li
            key={session.id}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            {session.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
