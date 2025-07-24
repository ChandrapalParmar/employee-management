import { useAuth } from "../context/AuthContext"
import { FaUser, FaSignOutAlt, FaBell, FaCog } from "react-icons/fa"

const Navbar = () => {
    const {user,logout} = useAuth()

    const getUserInitials = (name) => {
        return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
    }

    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return 'Good morning'
        if (hour < 17) return 'Good afternoon'
        return 'Good evening'
    }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Welcome message */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-gray-900">
                {getGreeting()}, <span className="text-teal-600">{user.name}</span>
              </h1>
              <p className="text-sm text-gray-600">
                {user.role === 'admin' ? 'Administrator Dashboard' : 'Employee Portal'}
              </p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-semibold text-gray-900">
                Hi, <span className="text-teal-600">{user.name?.split(' ')[0]}</span>
              </h1>
            </div>
          </div>

          {/* Right side - User actions */}
          <div className="flex items-center space-x-4">

            {/* User profile section */}
            <div className="flex items-center space-x-8">
              {/* User avatar */}
              <div className="relative">
                {user.profileImage ? (
                  <img
                    src={`https://employee-ms-server.onrender.com/${user.profileImage}`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 hover:border-teal-500 transition-colors"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm border-2 border-gray-200 hover:border-teal-500 transition-colors">
                    {getUserInitials(user.name)}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              {/* User info - hidden on mobile */}
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-600 capitalize">{user.role}</p>
              </div>

              {/* Logout button */}
              <button 
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={logout}
              >
                <FaSignOutAlt className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">Exit</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile user info */}
      <div className="sm:hidden bg-gray-50 border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-600 capitalize">{user.role} • Online</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Active</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar