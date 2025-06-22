import { useNavigate } from 'react-router-dom'

export default function CreateSessionButton() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/session/new')
  }

  return (
    <button
      onClick={handleClick}
      className="mt-6 w-full text-left px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
    >
      + Create a session
    </button>
  )
}
