import axios from "axios"
import { FaCheck, FaTimes, FaUserMd, FaCalendarAlt } from "react-icons/fa"

export const columns= [
    {
        name: "$ No",
        selector: (row) => row.sno,
        width:"70px"
    },
    {
        name:"Name",
        selector: (row) => row.name,
        sortable: true,
        width:"100px"
    },
    {
        name:"Emp ID",
        selector: (row) => row.employeeId,
        sortable: true,
        width:"100px"
    },
    {
        name:"Department",
        selector: (row) => row.department,
        width:"120px"
    },
    {
        name:"Action",
        selector: (row)=> row.action,
        center: true
    },
]

export const AttendanceHelper = ({status ,employeeId,statusChange}) => {
   
    const markEmployee = async (newStatus, employeeId) => { 
        try { 
            const response = await axios.put(`https://employee-ms-server.onrender.com/api/attendance/update/${employeeId}`,{status: newStatus},{ // <-- Updated: 'status: newStatus' use kiya gaya
                headers: {
                    Authorization :  `Bearer ${localStorage.getItem("token")}`,
                },
            })
            if(response.data.success){ 
                statusChange()
            }
        } catch (error) { 
            console.error("Error marking attendance:", error);
            alert("Failed to update attendance. Please try again."); 
        }
    }

    // Get status badge styling
    const getStatusBadge = (status) => {
        switch(status?.toLowerCase()) {
            case 'present':
                return "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
            case 'absent':
                return "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
            case 'sick':
                return "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            case 'leave':
                return "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
            default:
                return "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
        }
    }

  return (
    <div className="flex items-center space-x-4">
        {status && (
            <div className={getStatusBadge(status)}>
                {status}
            </div>
        )}
    
        <div className="flex space-x-2"> 
            <button
                className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                onClick={() => markEmployee("Present", employeeId)}
                title="Mark as Present"
            >
                <FaCheck className="mr-1" />
                Present
            </button>
            <button
                className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                onClick={() => markEmployee("Absent", employeeId)}
                title="Mark as Absent"
            > 
                <FaTimes className="mr-1" />
                Absent
            </button>
            <button
                className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white text-sm font-medium rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                onClick={() => markEmployee("Sick", employeeId)}
                title="Mark as Sick"
            > 
                <FaUserMd className="mr-1" />
                Sick
            </button>
            <button
                className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-sm font-medium rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                onClick={() => markEmployee("Leave", employeeId)}
                title="Mark as On Leave"
            > 
                <FaCalendarAlt className="mr-1" />
                Leave
            </button>
        </div>
    </div>
  )
}