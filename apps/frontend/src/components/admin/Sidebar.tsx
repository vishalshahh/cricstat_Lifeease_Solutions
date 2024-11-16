// components/admin/Sidebar.tsx
import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-bold text-center">Admin Panel</h2>
      <ul className="mt-10">
        <li className="mb-4">
          <Link href="/admin/dashboard">
            <a className="hover:text-gray-400">Dashboard</a>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/batsman">
            <a className="hover:text-gray-400">Batsman Scorecard</a>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/bowler">
            <a className="hover:text-gray-400">Bowler Scorecard</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
