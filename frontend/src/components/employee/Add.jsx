import { useEffect, useState } from "react"
import { fetchDepartments } from "../../utils/EmployeeHelper"
import axios from "axios"
import { useNavigate} from "react-router-dom"
import { FaUser, FaEnvelope, FaIdCard, FaCalendar, FaPhone, FaMapMarkerAlt, FaVenusMars, FaRing, FaBriefcase, FaBuilding, FaDollarSign, FaLock, FaUserTag, FaImage, FaArrowLeft, FaSave } from "react-icons/fa"

const Add = () => {
    const [departments,setDepartments]= useState([])
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    
    useEffect(()=>{
        const getDepartments = async()=>{
        const departments = await fetchDepartments()
        setDepartments(departments)
        }
        getDepartments()
    },[])

    const handleChange = (e)=>{
        const {name, value,files} = e.target
        if(name === "image"){
            setFormData((prevData) => ({...prevData, [name]:files[0]}))
        } else {
            setFormData((prevData) => ({...prevData, [name]:value}))
        }
    }

    const handleSubmit = async(e)=>{
          e.preventDefault()

          const formDataObj= new FormData()
          Object.keys(formData).forEach((key) =>{
            formDataObj.append(key,formData[key])
          })

        try{
            const response =await axios.post('http://localhost:3000/api/employee/add',
                formDataObj,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            if(response.data.success){
                navigate("/admin-dashboard/employees")
            }
        } catch(error){
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate("/admin-dashboard/employees")}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <FaUser className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Add New Employee
                </h1>
                <p className="text-gray-600 mt-1">Create a new employee profile</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            {/* Personal Information Section */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <FaUser className="text-white text-sm" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaUser className="inline mr-2 text-gray-500" />
                    Full Name
                  </label>
                  <input 
                    type="text"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaEnvelope className="inline mr-2 text-gray-500" />
                    Email Address
                  </label>
                  <input 
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>

                {/* Employee ID */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaIdCard className="inline mr-2 text-gray-500" />
                    Employee ID
                  </label>
                  <input 
                    type="text"
                    name="employeeId"
                    onChange={handleChange}
                    placeholder="Enter employee ID"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaCalendar className="inline mr-2 text-gray-500" />
                    Date of Birth
                  </label>
                  <input 
                    type="date"
                    name="dob"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaVenusMars className="inline mr-2 text-gray-500" />
                    Gender
                  </label>
                  <select 
                    name="gender"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Marital Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaRing className="inline mr-2 text-gray-500" />
                    Marital Status
                  </label>
                  <select 
                    name="maritalStatus"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <FaPhone className="text-white text-sm" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaPhone className="inline mr-2 text-gray-500" />
                    Phone Number
                  </label>
                  <input 
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaMapMarkerAlt className="inline mr-2 text-gray-500" />
                    Address
                  </label>
                  <input 
                    type="text"
                    name="address"
                    onChange={handleChange}
                    placeholder="Enter address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FaBriefcase className="text-white text-sm" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Professional Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Designation */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaBriefcase className="inline mr-2 text-gray-500" />
                    Designation
                  </label>
                  <input 
                    type="text"
                    name="designation"
                    onChange={handleChange}
                    placeholder="Enter designation"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaBuilding className="inline mr-2 text-gray-500" />
                    Department
                  </label>
                  <select 
                    name="department"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map(dep =>(
                        <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                    ))}
                  </select>
                </div>

                {/* Salary */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaDollarSign className="inline mr-2 text-gray-500" />
                    Salary
                  </label>
                  <input 
                    type="number"
                    name="salary"
                    onChange={handleChange}
                    placeholder="Enter salary amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaUserTag className="inline mr-2 text-gray-500" />
                    Role
                  </label>
                  <select 
                    name="role"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Security & Media Section */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <FaLock className="text-white text-sm" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Security & Media</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaLock className="inline mr-2 text-gray-500" />
                    Password
                  </label>
                  <input 
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>

                {/* Profile Image */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaImage className="inline mr-2 text-gray-500" />
                    Profile Image
                  </label>
                  <input 
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button 
                type="button"
                onClick={() => navigate("/admin-dashboard/employees")}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaSave className="mr-2" />
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Add