import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { FaBuilding, FaArrowLeft } from "react-icons/fa";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: '',
    description: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://employee-ms-server.onrender.com/api/department/add', department, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        navigate("/admin-dashboard/departments")
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    }
  }

  return (
    <div className="p-6 lg:p-8 min-h-screen bg-gray-50 fade-in">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin-dashboard/departments")}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <FaArrowLeft size={16} />
            <span>Back to Departments</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
              <FaBuilding className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-inter">Add Department</h1>
              <p className="text-gray-600">Create a new department for your organization</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Department Name */}
              <div>
                <label htmlFor="dep_name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Department Name
                </label>
                <input
                  type="text"
                  id="dep_name"
                  name="dep_name"
                  value={department.dep_name}
                  onChange={handleChange}
                  placeholder="Department Name"
                  className="form-input"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={department.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="form-input resize-none"
                  rows={4}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate("/admin-dashboard/departments")}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg btn-animate"
                >
                  Add Department
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddDepartment