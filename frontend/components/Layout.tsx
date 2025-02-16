// components/Layout.jsx
import TopBar from './TopBar'
import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Obere Leiste mit Spiel-Name und Fortschritt */}
      <TopBar />
      {/* Navigation */}
      <Navbar />
      {/* Seiteninhalt */}
      <main className="flex-1 p-4">
        {children}
      </main>
      {/* Optional ein Footer */}
      <footer className="p-4 text-center text-sm text-gray-400">
        © 2025 YourGameName
      </footer>
    </div>
  )
}
