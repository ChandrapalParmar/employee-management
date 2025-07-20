import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FaCalendarPlus, FaCalendarAlt, FaFileAlt, FaArrowLeft, FaSave, FaSpinner, FaUser, FaClock } from "react-icons/fa"

const Add = () => {
    const {user} = useAuth()
    const [leave,setLeave] = useState({
        userId: user._id,
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e)=> {
        const {name, value} = e.target
        setLeave((prevState) => ({...prevState, [name] : value}))
    }

    const handleSubmit= async (e)=>{
        e.preventDefault()
        setIsSubmitting(true)
        try{
        const response =await axios.post(`http://localhost:3000/api/leave/add`, leave,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
            navigate(`/employee-dashboard/leaves/${user._id}`)
        }
      } catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      } finally {
        setIsSubmitting(false)
      }
    }

    // Calculate leave duration
    const calculateDuration = () => {
        if (leave.startDate && leave.endDate) {
            const start = new Date(leave.startDate)
            const end = new Date(leave.endDate)
            const diffTime = Math.abs(end - start)
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
            return diffDays > 0 ? diffDays : 0
        }
        return 0
    }

    const duration = calculateDuration()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate(`/employee-dashboard/leaves/${user._id}`)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <FaCalendarPlus className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Request Leave
                </h1>
                <p className="text-gray-600 mt-1">Submit a new leave application</p>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Info Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <FaUser className="text-white text-lg" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Employee Information</h3>
              <p className="text-gray-600">Name: {user.name}</p>
              <p className="text-gray-600">Employee ID: {user._id}</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Leave Type Section */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <FaFileAlt className="text-white text-sm" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Leave Details</h3>
                </div>

                <div className="space-y-6">
                  {/* Leave Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaFileAlt className="inline mr-2 text-gray-500" />
                      Leave Type
                    </label>
                    <select
                      name="leaveType"
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      required
                    >
                      <option value="">Select Leave Type</option>
                      <option value="Sick Leave">🏥 Sick Leave</option>
                      <option value="Casual Leave">☀️ Casual Leave</option>
                      <option value="Annual Leave">🏖️ Annual Leave</option>
                    </select>
                  </div>

                  {/* Date Range */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FaCalendarAlt className="inline mr-2 text-gray-500" />
                        From Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FaCalendarAlt className="inline mr-2 text-gray-500" />
                        To Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Duration Display */}
                  {duration > 0 && (
                    <div className="p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl border border-teal-200">
                      <div className="flex items-center">
                        <FaClock className="text-teal-600 mr-2" />
                        <span className="text-teal-800 font-medium">
                          Leave Duration: {duration} day{duration > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Reason */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaFileAlt className="inline mr-2 text-gray-500" />
                      Reason for Leave
                    </label>
                    <textarea
                      name="reason"
                      placeholder="Please provide a detailed reason for your leave request..."
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                      required
                    />
                    <p className="text-gray-500 text-sm mt-2">
                      Provide a clear and detailed explanation for your leave request.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button 
                  type="button"
                  onClick={() => navigate(`/employee-dashboard/leaves/${user._id}`)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" />
                      Submit Leave Request
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add