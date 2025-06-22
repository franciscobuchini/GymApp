// src/components/SessionsList.jsx
export default function SessionsList({ sessions = [] }) {
  return (
    <div className="mt-6 w-full">
      <ul className="space-y-2">
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