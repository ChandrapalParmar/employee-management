import {NavLink} from 'react-router-dom'
import {FaTachometerAlt, FaUser, FaCalendarAlt, FaMoneyBillWave, FaCogs} from 'react-icons/fa'
import { useAuth } from '../../context/authContext'

const Sidebar = () => {
  const {user} = useAuth()
  return (
    <div className='bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white h-screen fixed left-0 bottom-0 top-0 space-y-2 w-64 shadow-2xl custom-scrollbar'>
        <div className='bg-gradient-to-r from-teal-600 to-teal-700 h-16 flex items-center justify-center shadow-lg'>
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <div>
                    <h3 className='text-xl font-bold font-inter'>Employee MS</h3>
                    <p className="text-teal-100 text-sm">Employee Panel</p>
                </div>
            </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600"></div>
        
        <div className='px-4 space-y-2'>
            <NavLink to="/employee-dashboard"
            className={({isActive})=> `${isActive ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg transform scale-[1.02]" : "text-gray-300 hover:text-white hover:bg-white/10"} flex items-center space-x-4 py-3 px-4 rounded-xl transition-all duration-300`}
            end>
            <FaTachometerAlt />
                <span>Dashboard</span>
            </NavLink>
             <NavLink to={`/employee-dashboard/profile/${user._id}`}
             className={({isActive})=> `${isActive ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg transform scale-[1.02]" : "text-gray-300 hover:text-white hover:bg-white/10"} flex items-center space-x-4 py-3 px-4 rounded-xl transition-all duration-300`}>
            <FaUser />
                <span>My Profile</span>
            </NavLink>
             <NavLink to={`/employee-dashboard/leaves/${user._id}`}
             className={({isActive})=> `${isActive ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg transform scale-[1.02]" : "text-gray-300 hover:text-white hover:bg-white/10"} flex items-center space-x-4 py-3 px-4 rounded-xl transition-all duration-300`}>
            <FaCalendarAlt />
                <span>Leaves</span>
            </NavLink>
             <NavLink to={`/employee-dashboard/salary/${user._id}`}
             className={({isActive})=> `${isActive ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg transform scale-[1.02]" : "text-gray-300 hover:text-white hover:bg-white/10"} flex items-center space-x-4 py-3 px-4 rounded-xl transition-all duration-300`}>
            <FaMoneyBillWave />
                <span>Salary</span>
            </NavLink>
             <NavLink to="/employee-dashboard/setting"
             className={"text-gray-300 hover:text-white hover:bg-white/10 flex items-center space-x-4 py-3 px-4 rounded-xl transition-all duration-300"}>
            <FaCogs />
                <span>Settings</span>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar