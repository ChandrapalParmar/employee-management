import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers, FaChartLine, FaCalendarAlt } from "react-icons/fa"
import SummaryCard from "./SummaryCard"
import { useEffect, useState } from "react"
import axios from 'axios'

const AdminSummary = () => {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get('https://employee-ms-server.onrender.com/api/dashboard/summary', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setSummary(response.data)
      } catch (error) {
        setError(error.response?.data?.error || 'Failed to fetch dashboard data')
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchSummary()
  }, [])

  if (loading) {
    return (
      <div className="p-6 lg:p-8 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Loading skeleton */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded-lg w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-300 rounded-2xl"></div>
              ))}
            </div>
            <div className="h-8 bg-gray-300 rounded-lg w-48 mb-8 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-300 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 lg:p-8 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTimesCircle className="text-red-500 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Dashboard</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 min-h-screen bg-gray-50 fade-in">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-inter mb-2">
                Dashboard Overview
              </h1>
              <p className="text-gray-600 text-lg">
                Welcome to your employee management dashboard
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FaCalendarAlt />
                  <span>{new Date().toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Statistics */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SummaryCard 
              icon={<FaUsers />} 
              text="Total Employees" 
              number={summary.totalEmployees} 
              color="bg-gradient-to-br from-teal-500 to-teal-600" 
            />
            <SummaryCard 
              icon={<FaBuilding />} 
              text="Total Departments" 
              number={summary.totalDepartments} 
              color="bg-gradient-to-br from-amber-500 to-orange-600" 
            />
            <SummaryCard 
              icon={<FaMoneyBillWave />} 
              text="Monthly Salary" 
              number={`$${summary.totalSalary?.toLocaleString() || '0'}`} 
              color="bg-gradient-to-br from-emerald-500 to-green-600" 
            />
          </div>
        </div>

        {/* Leave Management Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 bg-white rounded-2xl px-6 py-3 shadow-sm border border-gray-200">
              <FaChartLine className="text-teal-600 text-xl" />
              <h2 className="text-2xl font-bold text-gray-900 font-inter">
                Leave Management Analytics
              </h2>
            </div>
            <p className="text-gray-600 mt-3">
              Track and monitor employee leave requests and approvals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard 
              icon={<FaFileAlt />} 
              text="Leave Applied" 
              number={summary.leaveSummary?.appliedFor || 0} 
              color="bg-gradient-to-br from-blue-500 to-blue-600" 
            />
            <SummaryCard 
              icon={<FaCheckCircle />} 
              text="Leave Approved" 
              number={summary.leaveSummary?.approved || 0} 
              color="bg-gradient-to-br from-green-500 to-emerald-600" 
            />
            <SummaryCard 
              icon={<FaHourglassHalf />} 
              text="Leave Pending" 
              number={summary.leaveSummary?.pending || 0} 
              color="bg-gradient-to-br from-yellow-500 to-amber-600" 
            />
            <SummaryCard 
              icon={<FaTimesCircle />} 
              text="Leave Rejected" 
              number={summary.leaveSummary?.rejected || 0} 
              color="bg-gradient-to-br from-red-500 to-rose-600" 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSummary