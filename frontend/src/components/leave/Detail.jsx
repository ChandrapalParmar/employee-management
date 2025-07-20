import axios from 'axios'
import { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { FaCalendarAlt, FaUser, FaBuilding, FaFileAlt, FaArrowLeft, FaSpinner, FaCheckCircle, FaTimesCircle, FaClock, FaCalendarCheck } from "react-icons/fa"

const Detail = () => {
    const {id} = useParams()
    const navigate= useNavigate()
    const [leave,setLeave]= useState(null)
    const [isUpdating, setIsUpdating] = useState(false)

  useEffect(()=>{
     const fetchLeave =async()=>{
      try{
        const response =await axios.get(`https://employee-ms-server.onrender.com/api/leave/detail/${id}`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
            setLeave(response.data.leave)                   
        }
      } catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      } 
    }
    fetchLeave()
  },[])
    
  const changeStatus = async (id,status)=>{
        setIsUpdating(true)
        try{
        const response =await axios.put(`https://employee-ms-server.onrender.com/api/leave/${id}`,status,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
            navigate('/admin-dashboard/leaves')                
        }
      } catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      } finally {
        setIsUpdating(false)
      }
  }

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
        case 'approved':
            return {
                icon: FaCheckCircle,
                className: "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800",
                color: "text-green-600"
            }
        case 'rejected':
            return {
                icon: FaTimesCircle,
                className: "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800",
                color: "text-red-600"
            }
        case 'pending':
            return {
                icon: FaClock,
                className: "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800",
                color: "text-yellow-600"
            }
        default:
            return {
                icon: FaClock,
                className: "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800",
                color: "text-gray-600"
            }
    }
  }

  // Calculate leave duration
  const calculateDuration = () => {
    if (leave?.startDate && leave?.endDate) {
        const start = new Date(leave.startDate)
        const end = new Date(leave.endDate)
        const diffTime = Math.abs(end - start)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
        return diffDays > 0 ? diffDays : 0
    }
    return 0
  }

  if (!leave) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-20">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Loading leave details...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const statusBadge = getStatusBadge(leave.status)
  const StatusIcon = statusBadge.icon
  const duration = calculateDuration()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/admin-dashboard/leaves')}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <FaFileAlt className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Leave Application Details
                </h1>
                <p className="text-gray-600 mt-1">Review and manage leave request</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Employee Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-teal-500 to-teal-600">
                <h3 className="text-xl font-semibold text-white mb-4">Employee Profile</h3>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <img 
                      src={`https://employee-ms-server.onrender.com/${leave.employeeId.userId.profileImage}`} 
                      alt="Employee Profile"
                      className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover mx-auto"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mt-4">{leave.employeeId.userId.name}</h4>
                  <p className="text-gray-600">Employee ID: {leave.employeeId.employeeId}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                    <FaBuilding className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Department</p>
                      <p className="font-semibold text-gray-900">{leave.employeeId.department.dep_name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leave Details Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600">
                <h3 className="text-xl font-semibold text-white">Leave Request Information</h3>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Leave Type */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <FaFileAlt className="text-gray-500 mr-2" />
                      <p className="text-sm font-medium text-gray-600">Leave Type</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{leave.leaveType}</p>
                  </div>

                  {/* Duration */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <FaCalendarCheck className="text-gray-500 mr-2" />
                      <p className="text-sm font-medium text-gray-600">Duration</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{duration} day{duration > 1 ? 's' : ''}</p>
                  </div>

                  {/* Start Date */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <FaCalendarAlt className="text-gray-500 mr-2" />
                      <p className="text-sm font-medium text-gray-600">Start Date</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{new Date(leave.startDate).toLocaleDateString()}</p>
                  </div>

                  {/* End Date */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <FaCalendarAlt className="text-gray-500 mr-2" />
                      <p className="text-sm font-medium text-gray-600">End Date</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{new Date(leave.endDate).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Reason Section */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <FaFileAlt className="text-gray-500 mr-2" />
                    <h4 className="text-lg font-semibold text-gray-900">Reason for Leave</h4>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <p className="text-gray-700 leading-relaxed">{leave.reason}</p>
                  </div>
                </div>

                {/* Status and Actions Section */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        {leave.status === "Pending" ? "Action Required" : "Current Status"}
                      </p>
                      {leave.status === "Pending" ? (
                        <div className="flex space-x-3">
                          <button 
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            onClick={() => changeStatus(leave._id, {status:"Approved"})}
                            disabled={isUpdating}
                          >
                            {isUpdating ? (
                              <FaSpinner className="animate-spin mr-2" />
                            ) : (
                              <FaCheckCircle className="mr-2" />
                            )}
                            Approve
                          </button>
                          <button 
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            onClick={() => changeStatus(leave._id, {status:"Rejected"})}
                            disabled={isUpdating}
                          >
                            {isUpdating ? (
                              <FaSpinner className="animate-spin mr-2" />
                            ) : (
                              <FaTimesCircle className="mr-2" />
                            )}
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className={statusBadge.className}>
                          <StatusIcon className={`mr-2 ${statusBadge.color}`} />
                          {leave.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail
