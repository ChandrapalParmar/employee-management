import {NavLink} from 'react-router-dom'
import {FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaRegCalendarAlt, FaTachometerAlt, FaUsers} from 'react-icons/fa'
import {AiOutlineFileText} from 'react-icons/ai'

const AdminSidebar = () => {
  return (
    <div className='bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white h-screen fixed left-0 bottom-0 top-0 space-y-2 w-64 shadow-2xl custom-scrollbar'>
        <div className='bg-gradient-to-r from-teal-600 to-teal-700 h-16 flex items-center justify-center shadow-lg'>
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <div>
                    <h3 className='text-xl font-bold font-inter'>Employee MS</h3>
                    <p className="text-teal-100 text-sm">Admin Panel</p>
                </div>
            </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600"></div>
        
        <div className='px-4 space-y-2'>
            <NavLink to="/admin-dashboard"
            className={({isActive})=> `${isActive ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg transform scale-[1.02]" : "text-gray-300 hover:text-white hover:bg-white/10"} flex items-center space-x-4 py-3 px-4 rounded-xl transition-all duration-300`}
            end>
            <FaTachometerAlt />
                <span>Dashboard</span>
            </NavLink>
             <NavLink to="/admin-dashboard/employees"
             className={({isActive})=> `${isActive ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg transform scale-[1.02]" : "text-gray-300 hover:text-white hover:bg-white/10"} flex items-center space-x-4 py-3 px-4 rounded-xl transition-all duration-300`}>
            <FaUsers />
                <span>Employee</span>
            </NavLink>
             <NavLink to="/admin-dashboard/departments"
             className={({isActive})=> `${isActive ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg transform scale-[1.02]" : "text-gray-300 hover:text-white hover:bg-white/10"} flex items-center space-x-4 py-3 px-4 rounded-xl transition-all duration-300`}>
            <FaBuilding />
                <span>Departments</span>
            </NavLink>
             <NavLink to="/admin-dashboard/leaves"
             className={({isActive})=> `${isActive ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg transform scale-[1.02]" : "text-gray-300 hover:text-white hover:bg-white/10"} flex items-center space-x-4 py-3 px-4 rounded-xl transition-all duration-300`}>
            <FaCalendarAlt />
                <span>Leaves</span>
            </NavLink>
             <NavLink to="/admin-dashboard/salary/add"
             className={({isActive})=> `${isActive ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg transform scale-[1.02]" : "text-gray-300 hover:text-white hover:bg-white/10"} flex items-center space-x-4 py-3 px-4 rounded-xl transition-all duration-300`}>
            <FaMoneyBillWave />
                <span>Salary</span>
            </NavLink>
            <NavLink to="/admin-dashboard/attendance"
             className={({isActive})=> `${isActive ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg transform scale-[1.02]" : "text-gray-300 hover:text-white hover:bg-white/10"} flex items-center space-x-4 py-3 px-4 rounded-xl transition-all duration-300`}>
            <FaRegCalendarAlt />
                <span>Attendance</span>
            </NavLink>
            <NavLink to="/admin-dashboard/attendance-report"
             className={({isActive})=> `${isActive ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg transform scale-[1.02]" : "text-gray-300 hover:text-white hover:bg-white/10"} flex items-center space-x-4 py-3 px-4 rounded-xl transition-all duration-300`}>
            <AiOutlineFileText />
                <span>Attendance Report</span>
            </NavLink>
             <NavLink to="/admin-dashboard/setting"
             className={"text-gray-300 hover:text-white hover:bg-white/10 flex items-center space-x-4 py-3 px-4 rounded-xl transition-all duration-300"}>
            <FaCogs />
                <span>Settings</span>
            </NavLink>
        </div>
    </div>
  )
}

export default AdminSidebar