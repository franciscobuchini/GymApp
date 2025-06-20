import { Navigate } from 'react-router-dom'

export default function RequireAuth({ children }) {
  const user = localStorage.getItem('user')

  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}
// Este componente verifica si el usuario está autenticado