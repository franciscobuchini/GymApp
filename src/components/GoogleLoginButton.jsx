// src/components/GoogleLoginButton.jsx
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

export default function GoogleLoginButton() {
  const navigate = useNavigate()

  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential)
    console.log('Usuario:', decoded)

    localStorage.setItem('user', JSON.stringify(decoded))
    navigate('/app')
  }

  const handleError = () => {
    console.error('Error al iniciar sesión con Google')
  }

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      theme="outline"
      size="large"
    />
  )
}
