import { useEffect, useState } from "react"
import { fetchDepartments } from "../../utils/EmployeeHelper"
import axios from "axios"
import { useNavigate, useParams} from "react-router-dom"
import { FaUser, FaRing, FaBriefcase, FaDollarSign, FaBuilding, FaArrowLeft, FaSave, FaSpinner, FaEdit } from "react-icons/fa"

const Edit = () => {
    const [employee,setEmployee]= useState({
        name: '',
        maritalStatus: '',
        designation: '',
        salary: 0,
        department: '' 
    })
    const [departments,setDepartments]= useState(null)
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(()=>{
        const getDepartments = async()=>{
        const departments = await fetchDepartments()
        setDepartments(departments)
        }
        getDepartments()
    },[])

    
   useEffect(()=>{
     const fetchEmployee =async()=>{
      try{
        const response =await axios.get(`http://localhost:3000/api/employee/${id}`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
            const employee = response.data.employee
            setEmployee((prev)=>({
                ...prev,
                name: employee.userId.name,
                maritalStatus: employee.maritalStatus,
                designation: employee.designation,
                salary: employee.salary,
                department: employee.department
            }))                   
        }
      } catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      } 
    }
    fetchEmployee()
  },[])

    const handleChange = (e)=>{
        const {name, value} = e.target
            setEmployee((prevData) => ({...prevData, [name]:value}))
    }

    const handleSubmit = async(e)=>{
          e.preventDefault()

        try{
            const response =await axios.put(`http://localhost:3000/api/employee/${id}`,
                employee,{
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
      <div className="max-w-4xl mx-auto">
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
                <FaEdit className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Edit Employee
                </h1>
                <p className="text-gray-600 mt-1">Update employee information</p>
              </div>
            </div>
          </div>
        </div>

        {departments && employee ? (
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
                      value={employee.name}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      required
                    />
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
                      value={employee.maritalStatus}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      required
                    >
                      <option value="">Select Marital Status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                    </select>
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
                      value={employee.designation}
                      onChange={handleChange}
                      placeholder="Enter designation"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      required
                    />
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
                      value={employee.salary}
                      onChange={handleChange}
                      placeholder="Enter salary amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>

                  {/* Department */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaBuilding className="inline mr-2 text-gray-500" />
                      Department
                    </label>
                    <select 
                      name="department"
                      value={employee.department}
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
                  Update Employee
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-20">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Loading employee data...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Edit