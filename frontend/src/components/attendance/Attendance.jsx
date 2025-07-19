import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, AttendanceHelper } from '../../utils/AttendanceHelper'
import DataTable from 'react-data-table-component' 
import axios from 'axios'
import { FaUserCheck, FaSearch, FaSpinner, FaCalendarAlt, FaUsers, FaChartLine, FaFileAlt, FaClock } from "react-icons/fa"

const Attendance = () => {
  const [attendance, setAttendance]=useState([])
  const [loading,setLoading] =useState(false)
  const [filteredAttendance,setFilteredAttendance] = useState([])

  const statusChange =()=>{
    fetchAttendance()
  }

  const fetchAttendance =async()=>{
    setLoading(true)
    try{
      const response =await axios.get('http://localhost:3000/api/attendance',{
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        let sno=1;
        const data = await response.data.attendance.map((att)=>({
          employeeId: att.employeeId.employeeId,
          sno: sno++,
          department: att.employeeId.department.dep_name,
          name: att.employeeId.userId.name,
          action: (<AttendanceHelper status={att.status} employeeId={att.employeeId.employeeId} statusChange={statusChange}/>),
        }))
        setAttendance(data)
        setFilteredAttendance(data)
      }
    } catch(error){
      if(error.response && !error.response.data.success){
        alert(error.response.data.error)
      }
    } finally{
      setLoading(false)
    }
  }
    useEffect(()=>{
      fetchAttendance()
    },[])

    const handleFilter =(e) =>{
      const records= attendance.filter((emp)=>(
        emp.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
      ))
      setFilteredAttendance(records)
    }

    // Calculate attendance statistics
    const calculateStats = () => {
      if (!filteredAttendance || filteredAttendance.length === 0) return { total: 0, present: 0, absent: 0, pending: 0 }
      
      return {
        total: filteredAttendance.length,
        present: filteredAttendance.filter(att => att.action?.props?.status === 'Present').length,
        absent: filteredAttendance.filter(att => att.action?.props?.status === 'Absent').length,
        pending: filteredAttendance.filter(att => att.action?.props?.status === 'Pending' || !att.action?.props?.status).length
      }
    }

    const stats = calculateStats()
    const currentDate = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })

    // Custom table styles
    const customStyles = {
      headRow: {
        style: {
          backgroundColor: '#f8fafc',
          borderBottom: '2px solid #e2e8f0',
          minHeight: '60px',
        },
      },
      headCells: {
        style: {
          fontSize: '14px',
          fontWeight: '600',
          color: '#374151',
          paddingLeft: '24px',
          paddingRight: '24px',
        },
      },
      rows: {
        style: {
          minHeight: '60px',
          '&:hover': {
            backgroundColor: '#f8fafc',
          },
        },
      },
      cells: {
        style: {
          paddingLeft: '24px',
          paddingRight: '24px',
          fontSize: '14px',
          color: '#374151',
        },
      },
    }

    if(loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-20">
                        <div className="flex items-center justify-center">
                            <div className="text-center">
                                <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto mb-4" />
                                <p className="text-gray-600 text-lg">Loading attendance data...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <FaUserCheck className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Attendance Management
                </h1>
                <p className="text-gray-600 mt-1">Track and manage employee attendance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Date Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-center">
            <FaCalendarAlt className="mr-3 text-xl" />
            <div className="text-center">
              <h2 className="text-2xl font-bold">Mark Attendance for Today</h2>
              <p className="text-blue-100 mt-1">{currentDate}</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FaUsers className="text-white text-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Present</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.present}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <FaUserCheck className="text-white text-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Absent</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{stats.absent}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <FaClock className="text-white text-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <FaChartLine className="text-white text-lg" />
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
                placeholder="Search by employee ID..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                onChange={handleFilter}
              />
            </div>
            
            {/* Attendance Report Button */}
            <Link 
              to="/admin-dashboard/attendance-report"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FaFileAlt className="mr-2" />
              Attendance Report
            </Link>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Employee Attendance</h3>
            <p className="text-gray-600 text-sm mt-1">
              {filteredAttendance ? `${filteredAttendance.length} employee(s) found` : 'Loading records...'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <DataTable 
              columns={columns} 
              data={filteredAttendance} 
              pagination
              customStyles={customStyles}
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 20, 30, 50]}
              highlightOnHover
              responsive
              noDataComponent={
                <div className="p-20 text-center">
                  <FaUsers className="text-6xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No attendance records found</p>
                  <p className="text-gray-400">Try adjusting your search criteria</p>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Attendance