import axios from "axios";
import { useEffect, useState } from "react"
import { LeaveButtons } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/LeaveHelper";
import { FaFileAlt, FaSearch, FaSpinner, FaFilter, FaCalendarAlt, FaUsers, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa"

const Table = () => {
    const [leaves,setLeaves] = useState(null)
    const [filteredLeaves,setFilteredLeaves] = useState(null)
    const [activeFilter, setActiveFilter] = useState('all')

    const fetchLeaves = async()=>{
        try{
          const response =await axios.get('http://localhost:3000/api/leave',{
            headers:{
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          if(response.data.success){
            let sno=1;
            const data = await response.data.leaves.map((leave)=>({
              _id:leave._id,
              sno: sno++,
              employeeId: leave.employeeId.employeeId,
              name: leave.employeeId.userId.name,
              leaveType: leave.leaveType,
              department: leave.employeeId.department.dep_name,
              days:
                  Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)) + 1,
              status: leave.status, 
              action: (<LeaveButtons Id={leave._id}/>),
            }))
            console.log("Leaves fetched:", response.data.leaves);

            setLeaves(data)
            setFilteredLeaves(data)
          }
        } catch(error){
          if(error.response && !error.response.data.success){
            alert(error.response.data.error)
          }
        } 
    }
    useEffect(()=>{
        fetchLeaves()
    },[])

    const filterByInput= (e)=>{
        const data= leaves.filter(leave => 
            leave.employeeId
            .toLowerCase()
            .includes(e.target.value.toLowerCase()))
            setFilteredLeaves(data)
    }
    const filterByButton= (status)=>{
        setActiveFilter(status.toLowerCase())
        if (status.toLowerCase() === 'all') {
            setFilteredLeaves(leaves)
        } else {
            const data= leaves.filter(leave => 
                leave.status
                .toLowerCase()
                .includes(status.toLowerCase()))
                setFilteredLeaves(data)
        }
    }

    // Calculate leave statistics
    const calculateStats = () => {
        if (!leaves || leaves.length === 0) return { total: 0, approved: 0, pending: 0, rejected: 0 }
        
        return leaves.reduce((acc, leave) => {
            acc.total++
            acc[leave.status.toLowerCase()]++
            return acc
        }, { total: 0, approved: 0, pending: 0, rejected: 0 })
    }

    const stats = calculateStats()

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

    if (!filteredLeaves) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-20">
                        <div className="flex items-center justify-center">
                            <div className="text-center">
                                <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto mb-4" />
                                <p className="text-gray-600 text-lg">Loading leave applications...</p>
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
                <FaFileAlt className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Leave Management
                </h1>
                <p className="text-gray-600 mt-1">Review and manage all employee leave applications</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FaCalendarAlt className="text-white text-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Approved</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.approved || 0}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <FaCheckCircle className="text-white text-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending || 0}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <FaClock className="text-white text-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Rejected</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{stats.rejected || 0}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <FaTimesCircle className="text-white text-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by employee ID..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                onChange={filterByInput}
              />
            </div>
            
            {/* Filter Buttons */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 mr-4">
                <FaFilter className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter by Status:</span>
              </div>
              
              <button 
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeFilter === 'all' 
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => filterByButton("all")}
              >
                All
              </button>
              
              <button 
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeFilter === 'pending' 
                    ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-lg' 
                    : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                }`}
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>
              
              <button 
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeFilter === 'approved' 
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>
              
              <button 
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeFilter === 'rejected' 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg' 
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Leave Applications</h3>
            <p className="text-gray-600 text-sm mt-1">
              {filteredLeaves ? `${filteredLeaves.length} application(s) found` : 'Loading applications...'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <DataTable 
              columns={columns} 
              data={filteredLeaves} 
              pagination
              customStyles={customStyles}
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 20, 30, 50]}
              highlightOnHover
              responsive
              noDataComponent={
                <div className="p-20 text-center">
                  <FaFileAlt className="text-6xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No leave applications found</p>
                  <p className="text-gray-400">Try adjusting your search or filter criteria</p>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table