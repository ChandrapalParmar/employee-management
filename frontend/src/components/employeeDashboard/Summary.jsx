import { FaUser, FaClock, FaCalendarAlt, FaBriefcase, FaChartLine } from "react-icons/fa"
import {useAuth} from '../../context/AuthContext'

const Summary = () => {
    const {user} = useAuth()
    
    // Get current time for greeting
    const currentHour = new Date().getHours()
    const getGreeting = () => {
        if (currentHour < 12) return "Good Morning"
        if (currentHour < 17) return "Good Afternoon"
        return "Good Evening"
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <FaUser className="text-3xl text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-center md:text-left flex-1">
              <p className="text-teal-100 text-lg mb-2">{getGreeting()},</p>
              <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
              <p className="text-teal-200 text-lg">Welcome to your Employee Dashboard</p>
              <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                  Employee Portal
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                  <FaClock className="inline mr-2" />
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Profile Status */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Profile Status</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">Active</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <FaUser className="text-white text-lg" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full w-full"></div>
              </div>
            </div>
          </div>

          {/* Today's Tasks */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Today's Tasks</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FaBriefcase className="text-white text-lg" />
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-4">No pending tasks</p>
          </div>

          {/* This Month */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">This Month</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{new Date().toLocaleDateString('en-US', { month: 'short' })}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FaCalendarAlt className="text-white text-lg" />
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-4">Current period</p>
          </div>

          {/* Performance */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Performance</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">Excellent</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <FaChartLine className="text-white text-lg" />
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-4">Keep up the good work!</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6 group-hover:from-teal-100 group-hover:to-teal-200 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                  <FaUser className="text-white text-lg" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">View Profile</h4>
                <p className="text-gray-600 text-sm">Check and update your personal information</p>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <FaCalendarAlt className="text-white text-lg" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Manage Leaves</h4>
                <p className="text-gray-600 text-sm">Apply for leave or check leave status</p>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 group-hover:from-green-100 group-hover:to-green-200 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                  <FaChartLine className="text-white text-lg" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">View Salary</h4>
                <p className="text-gray-600 text-sm">Check your salary details and history</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summary