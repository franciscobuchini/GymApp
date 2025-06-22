// src/router/AppRouter.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import App from '../pages/App'
import SessionPage from '../pages/SessionPage'
import RequireAuth from '../components/RequireAuth'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/app" element={<App />} />
          <Route path="/session/new" element={<SessionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
