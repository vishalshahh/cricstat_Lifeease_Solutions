import AdminLayout from './AdminLayout'

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>
        <p className="text-lg">
          Welcome to the Admin Panel. Here you can manage the game data,
          scorecards, and more.
        </p>
      </div>
    </AdminLayout>
  )
}

export default Dashboard
