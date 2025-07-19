import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/AdminSidebar"
import AdminSummary from "../components/AdminSummary"
import Navbar from "../components/Navbar"
import { useAuth } from "../context/authContext"

const AdminDashboard = () => {
  const { user } = useAuth()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 ml-64 transition-all duration-300 ease-in-out bg-gray-100 h-screen">
        <Navbar />
        
        {/* Page Content */}
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard