import { useNavigate } from 'react-router-dom'

export default function CreateSessionButton() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/session/new')
  }

  return (
    <button
      onClick={handleClick}
      className="mt-6 w-full text-left p-4 bg-blue-100 text-blue-700 rounded-xl font-semibold"
    >
      + Create a session
    </button>
  )
}
