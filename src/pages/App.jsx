// pages/App.jsx
import AppHeader from '../components/AppHeader'

export default function App() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Página Principal</h1>
        <p>Bienvenido a la app del gimnasio</p>
      </main>
    </div>
  )
}