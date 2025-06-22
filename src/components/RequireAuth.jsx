import { Outlet, Navigate } from 'react-router-dom'

export default function RequireAuth() {
  const isAuthenticated = true // tu lógica real aquí

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  return <Outlet />
}
// Este componente asegura que solo los usuarios autenticados puedan acceder a las rutas protegidas
// Si no están autenticados, los redirige a la página de inicio de sesión