import GoogleLoginButton from '../components/GoogleLoginButton'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-4 bg-white rounded-2xl shadow-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6">Iniciar sesión</h1>
        <GoogleLoginButton />
      </div>
    </div>
  )
}