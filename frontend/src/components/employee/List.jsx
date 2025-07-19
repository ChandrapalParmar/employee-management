import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { FaSearch, FaPlus, FaUsers, FaSpinner } from 'react-icons/fa'

const List = () => {
  const [employees, setEmployees]=useState([])
  const [empLoading,setEmpLoading] =useState(false)
  const [filterEmployee,setFilterEmployee] = useState([])

    useEffect(()=>{
      const fetchEmployees =async()=>{
        setEmpLoading(true)
        try{
          const response =await axios.get('http://localhost:3000/api/employee',{
            headers:{
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          })
          if(response.data.success){
            let sno=1;
            const data = await response.data.employees.map((emp)=>({
              _id:emp._id,
              sno: sno++,
              dep_name: emp.department.dep_name,
              name: emp.userId.name,
              dob: new Date(emp.dob).toLocaleDateString(),
              profileImage: <img width={40} className='rounded-full' src={`http://localhost:3000/${emp.userId.profileImage}`}/>, 
              action: (<EmployeeButtons Id={emp._id}/>),
            }))
            setEmployees(data)
            setFilterEmployee(data)
          }
        } catch(error){
          if(error.response && !error.response.data.success){
            alert(error.response.data.error)
          }
        } finally{
          setEmpLoading(false)
        }
      }
      fetchEmployees()
    },[])

    const handleFilter =(e) =>{
      const records= employees.filter((emp)=>(
        emp.name.toLowerCase().includes(e.target.value.toLowerCase())
      ))
      setFilterEmployee(records)
    }

  // Custom styles for DataTable
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
        color: '#475569',
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
          backgroundColor: '#f1f5f9',
        },
      },
    },
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6'>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <FaUsers className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Employee Management
                </h1>
                <p className="text-gray-600 mt-1">Manage and organize your workforce</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-teal-50 to-teal-100 px-4 py-2 rounded-lg">
                <span className="text-teal-700 font-semibold">{filterEmployee.length} Employees</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Actions Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text"
                placeholder="Search employees by name..." 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                onChange={handleFilter}
              />
            </div>
            
            {/* Add Employee Button */}
            <Link 
              to="/admin-dashboard/add-employee"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FaPlus className="mr-2" />
              Add New Employee
            </Link>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {empLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Loading employees...</p>
              </div>
            </div>
          ) : (
            <DataTable 
              columns={columns} 
              data={filterEmployee} 
              pagination
              customStyles={customStyles}
              highlightOnHover
              pointerOnHover
              responsive
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 20, 30, 50]}
              noDataComponent={
                <div className="py-20 text-center">
                  <FaUsers className="text-6xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No employees found</p>
                  <p className="text-gray-400">Try adjusting your search criteria</p>
                </div>
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default List