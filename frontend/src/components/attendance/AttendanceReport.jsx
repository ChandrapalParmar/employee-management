import axios from "axios"
import { useEffect, useState } from "react"
import { FaFileAlt, FaCalendarAlt, FaSearch, FaSpinner, FaUsers, FaChartBar, FaArrowLeft, FaDownload } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const AttendanceReport = () => {
  const [report,setReport] = useState({})
  const [limit,setLimit] = useState(5)
  const [skip,setSkip] = useState(0)
  const [dateFilter,setDateFilter] = useState()
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchReport = async()=>{
    try{
      setLoading(true)
      const query = new URLSearchParams({limit,skip})
      if(dateFilter){
        query.append("date", dateFilter)
      }
      const response =await axios.get(`https://employee-ms-server.onrender.com/api/attendance/report?${query.toString()}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        if(skip == 0){
          setReport(response.data.groupData)
        } else {
          setReport((prevData) => ({...prevData, ...response.data.groupData}))
        }
      }
      setLoading(false)
    } catch(error){
      alert(error.message)
    }
  }
  useEffect(()=>{
    fetchReport()
  },[skip,dateFilter])

  const handleLoadmore = () =>{
    setSkip((prevSkip) => prevSkip + limit)
  }

  // Calculate overall statistics
  const calculateOverallStats = () => {
    let totalEmployees = 0
    let totalPresent = 0
    let totalAbsent = 0
    let totalDays = Object.keys(report).length

    Object.values(report).forEach(dayRecords => {
      totalEmployees += dayRecords.length
      totalPresent += dayRecords.filter(record => record.status === 'Present').length
      totalAbsent += dayRecords.filter(record => record.status === 'Absent').length
    })

    return {
      totalDays,
      totalEmployees,
      totalPresent,
      totalAbsent,
      attendanceRate: totalEmployees > 0 ? ((totalPresent / totalEmployees) * 100).toFixed(1) : 0
    }
  }

  const stats = calculateOverallStats()

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
        case 'present':
            return "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
        case 'absent':
            return "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
        default:
            return "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/admin-dashboard/attendance')}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FaFileAlt className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Attendance Report
                </h1>
                <p className="text-gray-600 mt-1">Comprehensive attendance analytics and insights</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Report Days</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalDays}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FaCalendarAlt className="text-white text-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Records</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalEmployees}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FaUsers className="text-white text-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Present</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.totalPresent}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <FaUsers className="text-white text-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Absent</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{stats.totalAbsent}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <FaUsers className="text-white text-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Attendance Rate</p>
                <p className="text-2xl font-bold text-teal-600 mt-1">{stats.attendanceRate}%</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <FaChartBar className="text-white text-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <FaCalendarAlt className="text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900">Filter by Date</h3>
            <div className="flex-1 max-w-md">
              <input 
                type="date" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                onChange={(e)=>{
                  setDateFilter(e.target.value)
                  setSkip(0)
                }}
              />
            </div>
          </div>
        </div>

        {/* Report Content */}
        {loading && skip === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-20">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Loading attendance report...</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(report).map(([date, records]) => (
              <div key={date} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Date Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FaCalendarAlt className="text-xl" />
                      <div>
                        <h3 className="text-xl font-bold">
                          {new Date(date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </h3>
                        <p className="text-blue-100">{records.length} employee records</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-100 text-sm">Attendance Rate</p>
                      <p className="text-2xl font-bold">
                        {((records.filter(r => r.status === 'Present').length / records.length) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">S No</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Employee ID</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {records.map((data, i) => (
                        <tr key={data.employeeId} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{data.employeeId}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.employeeName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{data.departmentName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={getStatusBadge(data.status)}>
                              {data.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            {/* Load More Button */}
            <div className="text-center">
              <button 
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                onClick={handleLoadmore}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  <>
                    <FaChartBar className="mr-2" />
                    Load More Records
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AttendanceReport