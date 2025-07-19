import axios from "axios"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../../context/authContext"
import { FaCalendarAlt, FaSearch, FaSpinner, FaArrowLeft, FaPlus, FaCalendarCheck, FaClock, FaCheckCircle, FaTimesCircle, FaExclamationCircle } from "react-icons/fa"

const List = () => {
  const [leaves,setLeaves] = useState(null)
  const [filteredLeaves, setFilteredLeaves] = useState(null) 
  let sno =1
  const {id} = useParams()
  const {user} = useAuth()
  const navigate = useNavigate()

  const fetchLeaves = async ()=>{
        try {
            const response= await axios.get(`http://localhost:3000/api/leave/employee/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            if(response.data.success){
                setLeaves(response.data.leaves)
                setFilteredLeaves(response.data.leaves) 
            }
        } catch(error){
            if(error.response && !error.response.data.success){
                alert(error.message)
            }
        }
    }

    useEffect(()=>{
        fetchLeaves()
    },[])

    const handleFilter = (e) => {
        const query = e.target.value.toLowerCase();
        if (leaves) {
            const filtered = leaves.filter(leave =>
                leave.leaveType.toLowerCase().includes(query) ||
                leave.reason.toLowerCase().includes(query)
            );
            setFilteredLeaves(filtered);
        }
    }

    // Get status badge styling
    const getStatusBadge = (status) => {
        switch(status.toLowerCase()) {
            case 'approved':
                return {
                    icon: FaCheckCircle,
                    className: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800",
                    color: "text-green-600"
                }
            case 'rejected':
                return {
                    icon: FaTimesCircle,
                    className: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800",
                    color: "text-red-600"
                }
            case 'pending':
                return {
                    icon: FaClock,
                    className: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800",
                    color: "text-yellow-600"
                }
            default:
                return {
                    icon: FaExclamationCircle,
                    className: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800",
                    color: "text-gray-600"
                }
        }
    }

    // Calculate leave statistics
    const calculateStats = () => {
        if (!filteredLeaves || filteredLeaves.length === 0) return { total: 0, approved: 0, pending: 0, rejected: 0 }
        
        return filteredLeaves.reduce((acc, leave) => {
            acc.total++
            acc[leave.status.toLowerCase()]++
            return acc
        }, { total: 0, approved: 0, pending: 0, rejected: 0 })
    }

    const stats = calculateStats()

    if(!filteredLeaves) { 
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-20">
                        <div className="flex items-center justify-center">
                            <div className="text-center">
                                <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto mb-4" />
                                <p className="text-gray-600 text-lg">Loading leave data...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate(-1)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <FaCalendarAlt className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Leave Management
                </h1>
                <p className="text-gray-600 mt-1">Track and manage leave requests</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Leaves</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FaCalendarCheck className="text-white text-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Approved</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.approved || 0}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <FaCheckCircle className="text-white text-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending || 0}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <FaClock className="text-white text-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Rejected</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{stats.rejected || 0}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <FaTimesCircle className="text-white text-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Actions Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by leave type or reason..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                onChange={handleFilter}
              />
            </div>
            
            {/* Add Leave Button */}
            {user.role === "employee" && (
              <Link 
                to="/employee-dashboard/add-leave"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaPlus className="mr-2" />
                Add New Leave
              </Link>
            )}
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Leave Records</h3>
            <p className="text-gray-600 text-sm mt-1">
              {filteredLeaves ? `${filteredLeaves.length} record(s) found` : 'Loading records...'}
            </p>
          </div>

          {filteredLeaves.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SNO</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Leave Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">From Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">To Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Reason</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLeaves.map((leave) => {
                    const statusBadge = getStatusBadge(leave.status)
                    const StatusIcon = statusBadge.icon
                    
                    return (
                      <tr key={leave._id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sno++}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                            {leave.leaveType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-2 text-gray-400" />
                            {new Date(leave.startDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-2 text-gray-400" />
                            {new Date(leave.endDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                          {leave.reason}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={statusBadge.className}>
                            <StatusIcon className={`mr-1 ${statusBadge.color}`} />
                            {leave.status}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-20 text-center">
              <FaCalendarAlt className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No leave records found</p>
              <p className="text-gray-400">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default List