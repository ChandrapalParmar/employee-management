import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { FaDollarSign, FaSearch, FaSpinner, FaArrowLeft, FaCalendarAlt, FaChartLine, FaMoneyBillWave } from "react-icons/fa"

const View = () => {
    const [salaries,setSalaries] = useState(null)
    const [filterSalaries, setFilterSalaries] = useState(null)
    const {id} = useParams()
    const {user} = useAuth()
    const navigate = useNavigate()
    let sno = 1

    const fetchSalaries = async ()=>{
        try {
              const salaryId = typeof id === 'object' ? id.id : id;
              const response = await axios.get(`https://employee-ms-server.onrender.com/api/salary/${salaryId}/${user.role}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            if(response.data.success){
                setSalaries(response.data.salary)
                setFilterSalaries(response.data.salary)
            }
        } catch(error){
            if(error.response && !error.response.data.success){
                alert(error.message)
            }
        }
    }

    useEffect(()=>{
        fetchSalaries()
    },[])

    const filterSalarie = (q)=>{
        const filterRecords= salaries.filter((salaryItem) => 
        salaryItem.employeeId.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())) 
        setFilterSalaries(filterRecords)
    }

    // Calculate total statistics
    const calculateStats = () => {
        if (!filterSalaries || filterSalaries.length === 0) return { totalSalary: 0, totalAllowances: 0, totalDeductions: 0, totalNet: 0 }
        
        return filterSalaries.reduce((acc, salary) => ({
            totalSalary: acc.totalSalary + salary.basicSalary,
            totalAllowances: acc.totalAllowances + salary.allowances,
            totalDeductions: acc.totalDeductions + salary.deductions,
            totalNet: acc.totalNet + salary.netSalary
        }), { totalSalary: 0, totalAllowances: 0, totalDeductions: 0, totalNet: 0 })
    }

    const stats = calculateStats()

    const handleEditSalary = () => {

        if (filterSalaries && filterSalaries.length > 0) {
            const employeeDocId = filterSalaries[0].employeeId._id; 
            navigate(`/employee-dashboard/salary/edit/${employeeDocId}`); 
        } else {
            alert("No salary records found to edit."); 
        }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => handleEditSalary}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <FaDollarSign className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Salary History
                </h1>
                <p className="text-gray-600 mt-1">View detailed salary records and payments</p>
              </div>
            </div>
          </div>
        </div>

        {filterSalaries === null ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-20">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <FaSpinner className="animate-spin text-4xl text-green-600 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Loading salary data...</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Statistics Cards */}
            {filterSalaries && filterSalaries.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Total Basic Salary</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">${stats.totalSalary.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <FaMoneyBillWave className="text-white text-lg" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Total Allowances</p>
                      <p className="text-2xl font-bold text-green-600 mt-1">${stats.totalAllowances.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <FaChartLine className="text-white text-lg" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Total Deductions</p>
                      <p className="text-2xl font-bold text-red-600 mt-1">${stats.totalDeductions.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                      <FaCalendarAlt className="text-white text-lg" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Total Net Salary</p>
                      <p className="text-2xl font-bold text-teal-600 mt-1">${stats.totalNet.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <FaDollarSign className="text-white text-lg" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Search and Table Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Search Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Salary Records</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {filterSalaries ? `${filterSalaries.length} record(s) found` : 'Loading records...'}
                    </p>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by Employee ID..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      onChange={(e) => filterSalarie(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Table */}
              {filterSalaries && filterSalaries.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SNO</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Employee ID</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Basic Salary</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Allowances</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Deductions</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Net Salary</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pay Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filterSalaries.map((salary) => (
                        <tr key={salary._id} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sno++}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                              {salary.employeeId.employeeId}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                            ${salary.basicSalary.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                            +${salary.allowances.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                            -${salary.deductions.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-green-100 to-green-200 text-green-800">
                              ${salary.netSalary.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <div className="flex items-center">
                              <FaCalendarAlt className="mr-2 text-gray-400" />
                              {new Date(salary.payDate).toLocaleDateString()}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-20 text-center">
                  <FaDollarSign className="text-6xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No salary records found</p>
                  <p className="text-gray-400">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default View