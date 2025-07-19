import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { FaBuilding, FaEdit, FaArrowLeft, FaSave, FaSpinner, FaFileAlt } from "react-icons/fa"

const EditDepartment = () => {
    const {id} = useParams()
    const [department, setDepartment] =useState([])
    const [depLoading, setDepLoading] =useState(false)
    const navigate = useNavigate()
    
  useEffect(()=>{
    const fetchDepartments =async()=>{
      setDepLoading(true)
      try{
        const response =await axios.get(`http://localhost:3000/api/department/${id}`,{
          headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
            setDepartment(response.data.department)                   
        }
      } catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      } finally{
        setDepLoading(false)
      }
    }
    fetchDepartments()
  },[])

     const handleChange= (e)=>{
        const {name,value} =e.target;
        setDepartment({...department, [name]:value})
    }

    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            const response =await axios.put(`http://localhost:3000/api/department/${id}`,department,{
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
                navigate("/admin-dashboard/departments")
            }
        } catch(error){
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }

   return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate("/admin-dashboard/departments")}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <FaEdit className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Edit Department
                </h1>
                <p className="text-gray-600 mt-1">Update department information</p>
              </div>
            </div>
          </div>
        </div>

        {depLoading ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-20">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Loading department data...</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8">
              {/* Department Information Section */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <FaBuilding className="text-white text-sm" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Department Information</h3>
                </div>
                
                <div className="space-y-6">
                  {/* Department Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaBuilding className="inline mr-2 text-gray-500" />
                      Department Name
                    </label>
                    <input 
                      type="text"
                      name="dep_name"
                      onChange={handleChange}
                      value={department.dep_name}
                      placeholder="Enter department name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaFileAlt className="inline mr-2 text-gray-500" />
                      Description
                    </label>
                    <textarea 
                      name="description" 
                      placeholder="Enter department description"
                      onChange={handleChange}
                      value={department.description}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                      rows={4}
                    />
                    <p className="text-gray-500 text-sm mt-2">Provide a brief description of the department's role and responsibilities.</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button 
                  type="button"
                  onClick={() => navigate("/admin-dashboard/departments")}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaSave className="mr-2" />
                  Update Department
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default EditDepartment