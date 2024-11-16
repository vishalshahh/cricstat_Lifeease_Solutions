// components/admin/AdminLayout.tsx
import Sidebar from './Sidebar'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">{children}</div>
    </div>
  )
}

export default AdminLayout
