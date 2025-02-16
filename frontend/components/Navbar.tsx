// components/Navbar.jsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <ul className="flex gap-4 px-4 py-2">
        <li>
          <Link href="/" className="text-gray-700 hover:text-pink-600 font-semibold">
            Home
          </Link>
        </li>
        <li>
          <Link href="/degrees" className="text-gray-700 hover:text-pink-600 font-semibold">
            Degrees
          </Link>
        </li>
        <li>
          <Link href="/classes" className="text-gray-700 hover:text-pink-600 font-semibold">
            Classes
          </Link>
        </li>
        <li>
          <Link href="/clubs" className="text-gray-700 hover:text-pink-600 font-semibold">
            Clubs
          </Link>
        </li>
        <li>
          <Link href="/punishments" className="text-gray-700 hover:text-pink-600 font-semibold">
            Punishments
          </Link>
        </li>
        <li>
          <Link href="/help" className="text-gray-700 hover:text-pink-600 font-semibold">
            Help
          </Link>
        </li>
        <li>
          <Link href="/play" className="text-gray-700 hover:text-pink-600 font-semibold">
            Play
          </Link>
        </li>
      </ul>
    </nav>
  );
}
