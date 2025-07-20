import axios from 'axios'
import { useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { FaUser, FaIdCard, FaCalendar, FaVenusMars, FaBuilding, FaRing, FaArrowLeft, FaSpinner, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const View = () => {
    const {id} = useParams()
    const [employee, setEmployee]= useState(null)
    const navigate = useNavigate()
    const { user } = useAuth()

  useEffect(()=>{
     const fetchEmployee =async()=>{
      try{
        const response =await axios.get(`http://localhost:3000/api/employee/${id}`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
            setEmployee(response.data.employee)                   
        }
      } catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      } 
    }
    fetchEmployee()
  },[id])
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => user.role === 'admin' ? navigate("/admin-dashboard/employees") : navigate("/employee-dashboard")}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <FaUser className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Employee Profile
                </h1>
                <p className="text-gray-600 mt-1">View employee details and information</p>
              </div>
            </div>
          </div>
        </div>

        {employee ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-8 py-12">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="relative">
                  <img 
                    src={`http://localhost:3000/${employee.userId.profileImage}`} 
                    alt={employee.userId.name}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                </div>
                <div className="text-center md:text-left text-white">
                  <h2 className="text-3xl font-bold mb-2">{employee.userId.name}</h2>
                  <p className="text-teal-100 text-lg mb-1">{employee.designation || 'Employee'}</p>
                  <p className="text-teal-200 text-sm">{employee.department.dep_name}</p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                      ID: {employee.employeeId}
                    </span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium capitalize">
                      {employee.gender}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <FaUser className="text-white text-sm" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <FaUser className="text-gray-500" />
                        <span className="font-medium text-gray-700">Full Name</span>
                      </div>
                      <span className="text-gray-900 font-semibold">{employee.userId.name}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <FaEnvelope className="text-gray-500" />
                        <span className="font-medium text-gray-700">Email</span>
                      </div>
                      <span className="text-gray-900 font-semibold">{employee.userId.email}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <FaCalendar className="text-gray-500" />
                        <span className="font-medium text-gray-700">Date of Birth</span>
                      </div>
                      <span className="text-gray-900 font-semibold">
                        {new Date(employee.dob).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <FaVenusMars className="text-gray-500" />
                        <span className="font-medium text-gray-700">Gender</span>
                      </div>
                      <span className="text-gray-900 font-semibold capitalize">{employee.gender}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <FaRing className="text-gray-500" />
                        <span className="font-medium text-gray-700">Marital Status</span>
                      </div>
                      <span className="text-gray-900 font-semibold capitalize">{employee.maritalStatus}</span>
                    </div>

                    {employee.phone && (
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <FaPhone className="text-gray-500" />
                          <span className="font-medium text-gray-700">Phone</span>
                        </div>
                        <span className="text-gray-900 font-semibold">{employee.phone}</span>
                      </div>
                    )}

                    {employee.address && (
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <FaMapMarkerAlt className="text-gray-500" />
                          <span className="font-medium text-gray-700">Address</span>
                        </div>
                        <span className="text-gray-900 font-semibold">{employee.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <FaBriefcase className="text-white text-sm" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Professional Information</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <FaIdCard className="text-gray-500" />
                        <span className="font-medium text-gray-700">Employee ID</span>
                      </div>
                      <span className="text-gray-900 font-semibold">{employee.employeeId}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <FaBuilding className="text-gray-500" />
                        <span className="font-medium text-gray-700">Department</span>
                      </div>
                      <span className="text-gray-900 font-semibold">{employee.department.dep_name}</span>
                    </div>

                    {employee.designation && (
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <FaBriefcase className="text-gray-500" />
                          <span className="font-medium text-gray-700">Designation</span>
                        </div>
                        <span className="text-gray-900 font-semibold">{employee.designation}</span>
                      </div>
                    )}

                    {employee.salary && (
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">$</span>
                          </div>
                          <span className="font-medium text-green-700">Salary</span>
                        </div>
                        <span className="text-green-900 font-bold text-lg">${employee.salary.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <FaCalendar className="text-gray-500" />
                        <span className="font-medium text-gray-700">Join Date</span>
                      </div>
                      <span className="text-gray-900 font-semibold">
                        {new Date(employee.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {user.role === 'admin' && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <button 
                      onClick={() => navigate(`/admin-dashboard/employees/edit/${employee._id}`)}
                      className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Edit Profile
                    </button>
                    <button 
                      onClick={() => navigate(`/admin-dashboard/employees/salary/${employee._id}`)}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      View Salary
                    </button>
                    <button 
                      onClick={() => navigate(`/admin-dashboard/employees/leaves/${employee._id}`)}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      View Leaves
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-20">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Loading employee details...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default View 