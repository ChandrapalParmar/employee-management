import { useEffect, useState } from "react"
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper"
import axios from "axios"
import { useNavigate, useParams} from "react-router-dom"
import { FaMoneyBillWave, FaBuilding, FaUser, FaCalendarAlt, FaArrowLeft, FaSave, FaSpinner, FaCalculator, FaPlus, FaMinus } from "react-icons/fa"

const Add = () => {
    const [salary,setSalary]= useState({
       employeeId: null,
       basicSalary: 0,
       allowances:0,
       deductions: 0,
       payDate: null,
    })
    const [departments,setDepartments]= useState(null)
    const [employees,setEmployees]= useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        const getDepartments = async()=>{
        const departments = await fetchDepartments()
        setDepartments(departments)
        }
        getDepartments()
    },[])

    const handleDepartment = async (e) =>{
        const emps= await getEmployees(e.target.value)
        setEmployees(emps)
    }

    const handleChange = (e)=>{
        const {name, value} = e.target
            setSalary((prevData) => ({...prevData, [name]:value}))
    }

    const handleSubmit = async(e)=>{
          e.preventDefault()
          setIsSubmitting(true)

        try{
            const response =await axios.post(`https://employee-ms-server.onrender.com/api/salary/add`,
                salary,{
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
        } finally {
            setIsSubmitting(false)
        }
    }

    // Calculate net salary
    const calculateNetSalary = () => {
        const basic = parseFloat(salary.basicSalary) || 0
        const allowances = parseFloat(salary.allowances) || 0
        const deductions = parseFloat(salary.deductions) || 0
        return basic + allowances - deductions
    }

    const netSalary = calculateNetSalary()

    if (!departments) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-20">
                        <div className="flex items-center justify-center">
                            <div className="text-center">
                                <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto mb-4" />
                                <p className="text-gray-600 text-lg">Loading departments...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <FaMoneyBillWave className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Add Salary Record
                </h1>
                <p className="text-gray-600 mt-1">Create a new salary entry for an employee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Employee Selection Section */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <FaUser className="text-white text-sm" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Employee Selection</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Department */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaBuilding className="inline mr-2 text-gray-500" />
                      Department
                    </label>
                    <select 
                      name="department"
                      onChange={handleDepartment}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map(dep =>(
                        <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Employee */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaUser className="inline mr-2 text-gray-500" />
                      Employee
                    </label>
                    <select 
                      name="employeeId"
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      required
                    >
                      <option value="">Select Employee</option>
                      {employees.map((emp) =>(
                        <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Salary Details Section */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <FaMoneyBillWave className="text-white text-sm" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Salary Components</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Salary */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaMoneyBillWave className="inline mr-2 text-gray-500" />
                      Basic Salary
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input 
                        type="number"
                        name="basicSalary"
                        onChange={handleChange}
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Allowances */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaPlus className="inline mr-2 text-green-500" />
                      Allowances
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input 
                        type="number"
                        name="allowances"
                        onChange={handleChange}
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        required
                      />
                    </div>
                    <p className="text-gray-500 text-sm mt-1">Bonuses, overtime, benefits, etc.</p>
                  </div>

                  {/* Deductions */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaMinus className="inline mr-2 text-red-500" />
                      Deductions
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input 
                        type="number"
                        name="deductions"
                        onChange={handleChange}
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        required
                      />
                    </div>
                    <p className="text-gray-500 text-sm mt-1">Taxes, insurance, loans, etc.</p>
                  </div>

                  {/* Pay Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaCalendarAlt className="inline mr-2 text-gray-500" />
                      Pay Date
                    </label>
                    <input 
                      type="date"
                      name="payDate"
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Salary Summary */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <div className="flex items-center space-x-3 mb-4">
                  <FaCalculator className="text-green-600 text-lg" />
                  <h4 className="text-lg font-semibold text-green-900">Salary Summary</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600">Basic Salary</p>
                    <p className="text-lg font-bold text-gray-900">${parseFloat(salary.basicSalary || 0).toFixed(2)}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-green-600">+ Allowances</p>
                    <p className="text-lg font-bold text-green-600">${parseFloat(salary.allowances || 0).toFixed(2)}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-red-600">- Deductions</p>
                    <p className="text-lg font-bold text-red-600">${parseFloat(salary.deductions || 0).toFixed(2)}</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-4 text-white">
                    <p className="text-sm text-green-100">Net Salary</p>
                    <p className="text-xl font-bold">${netSalary.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button 
                  type="button"
                  onClick={() => navigate("/admin-dashboard/employees")}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Adding Salary...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" />
                      Add Salary Record
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