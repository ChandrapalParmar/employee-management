import {Link} from "react-router-dom"
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper"
import { useEffect, useState } from "react"
import axios from "axios"
import { FaPlus, FaSearch, FaBuilding, FaSpinner } from "react-icons/fa"

const DepartmentList = () => {
  const [departments, setDepartments] = useState([])
  const [depLoading, setDepLoading] = useState(false)
  const [filterDepartment, setFilterDepartment] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const onDepartmentDelete = () => {
    fetchDepartments()
  }

  const fetchDepartments = async () => {
    setDepLoading(true)
    try {
      const response = await axios.get('https://employee-ms-server.onrender.com/api/department', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (<DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete} />)
        }))
        setDepartments(data)
        setFilterDepartment(data)
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    } finally {
      setDepLoading(false)
    }
  }

  useEffect(() => {
    fetchDepartments()
  }, [])

  const filterDepartments = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(value.toLowerCase()))
    setFilterDepartment(records)
  }

  const customStyles = {
    header: {
      style: {
        minHeight: '56px',
      },
    },
    headRow: {
      style: {
        backgroundColor: '#f8fafc',
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: '#e2e8f0',
      },
    },
    headCells: {
      style: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#374151',
        paddingLeft: '16px',
        paddingRight: '16px',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '12px',
        paddingBottom: '12px',
      },
    },
    rows: {
      style: {
        '&:hover': {
          backgroundColor: '#f8fafc',
        },
      },
    },
  }

  if (depLoading) {
    return (
      <div className="p-6 lg:p-8 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Loading Departments</h3>
              <p className="text-gray-500">Please wait while we fetch the department data...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 min-h-screen bg-gray-50 fade-in">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
              <FaBuilding className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-inter">Department Management</h1>
              <p className="text-gray-600">Organize and manage company departments</p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" size={16} />
              </div>
              <input
                type="text"
                placeholder="Search departments..."
                value={searchTerm}
                onChange={filterDepartments}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Add Department Button */}
            <Link
              to="/admin-dashboard/add-department"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg btn-animate"
            >
              <FaPlus size={16} />
              <span>Add Department</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <FaBuilding className="text-white" size={16} />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-600">Total Departments</p>
                  <p className="text-2xl font-bold text-blue-900">{departments.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <FaSearch className="text-white" size={16} />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-600">Search Results</p>
                  <p className="text-2xl font-bold text-green-900">{filterDepartment.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Departments List</h3>
            <p className="text-sm text-gray-600 mt-1">
              {filterDepartment.length} department{filterDepartment.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <DataTable
              columns={columns}
              data={filterDepartment}
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[5, 10, 15, 20]}
              customStyles={customStyles}
              highlightOnHover
              pointerOnHover
              responsive
              noDataComponent={
                <div className="text-center py-12">
                  <FaBuilding className="text-gray-300 text-4xl mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-500 mb-2">No Departments Found</h3>
                  <p className="text-gray-400 mb-4">
                    {searchTerm ? `No departments match "${searchTerm}"` : "No departments have been created yet."}
                  </p>
                  {!searchTerm && (
                    <Link
                      to="/admin-dashboard/add-department"
                      className="inline-flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      <FaPlus size={14} />
                      <span>Add First Department</span>
                    </Link>
                  )}
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepartmentList