import { useNavigate } from "react-router-dom"
import { FaEye } from "react-icons/fa"

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px",
    },
    {
        name: "Emp ID",
        selector: (row) => row.employeeId,
        width: "120px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: "120px",
    },
    {
        name: "Leave Type",
        selector: (row) => row.leaveType,
        width: "140px",
    },
    {
        name: "Department",
        selector: (row) => row.department,
        width: "170px",
    },
    {
        name: "Days",
        selector: (row) => row.days,
        width: "80px",
    },
    {
        name: "Status",
        selector: (row) => row.status,
        width: "120px",
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: true,
    },
]

export const LeaveButtons = ({Id }) =>{
    const navigate =useNavigate()

    const handleView = (id) =>{
        navigate(`/admin-dashboard/leaves/${id}`)
    }

    return (
        <button 
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
            onClick={()=> handleView(Id)}
            title="View Leave Details"
        >
            <FaEye className="mr-2" />
            View
        </button>
    )
}