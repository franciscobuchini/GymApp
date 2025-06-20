import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import App from '../pages/App'
import RequireAuth from '../components/RequireAuth'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/app"
          element={
            <RequireAuth>
              <App /> {/* ← AppHeader se usa dentro de App */}
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
