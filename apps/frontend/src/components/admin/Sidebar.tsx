import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-bold text-center">Admin Panel</h2>
      <ul className="mt-10">
        <li className="mb-4">
          <Link href="/admin/dashboard">
            <span className="hover:text-gray-400">Dashboard</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/batsman">
            <span className="hover:text-gray-400">Batsman Scorecard</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/bowler">
            <span className="hover:text-gray-400">Bowler Scorecard</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
