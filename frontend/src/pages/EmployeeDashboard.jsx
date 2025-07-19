import { Outlet } from "react-router-dom"
import Sidebar from "../components/employeeDashboard/Sidebar"
import Navbar from '../components/Navbar.jsx'

const EmployeeDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
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

export default EmployeeDashboard