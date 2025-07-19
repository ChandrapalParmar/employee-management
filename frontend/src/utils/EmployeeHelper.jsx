import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FaEye, FaEdit, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa"

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
        name:"Image",
        selector: (row) => row.profileImage,
        width:"90px"
    },
    {
        name:"Department",
        selector: (row) => row.dep_name,
        width:"120px"
    },
    {
        name:"DOB",
        selector: (row) => row.dob,
        sortable: true,
        width:"130px"
    },
    {
        name:"Action",
        selector: (row)=> row.action,
        $center: true
    },
]

 export const fetchDepartments =async()=>{

    let departments
      try{
        const response =await axios.get('http://localhost:3000/api/department',{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          departments= response.data.departments
        }
      } catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      } 
      return departments
    }

    // Employees for salary form
    export const getEmployees =async(id)=>{

    let employees
      try{
        const response =await axios.get(`http://localhost:3000/api/employee/department/${id}`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          employees= response.data.employees
        }
      } catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      } 
      return employees
    }


    export const EmployeeButtons =({Id})=>{
        const navigate=useNavigate()
    
        return(
            <div className="flex space-x-2">
                <button 
                    className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                    onClick={()=> navigate(`/admin-dashboard/employees/${Id}`)}
                    title="View Employee"
                >
                    <FaEye className="mr-1" />
                    View
                </button>
                <button 
                    className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                    onClick={()=> navigate(`/admin-dashboard/employees/edit/${Id}`)}
                    title="Edit Employee"
                >
                    <FaEdit className="mr-1" />
                    Edit
                </button>
                <button 
                    className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-sm font-medium rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                    onClick={()=> navigate(`/admin-dashboard/employees/salary/${Id}`)}
                    title="View Salary"
                >
                    <FaMoneyBillWave className="mr-1" />
                    Salary
                </button> 
                <button 
                    className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                    onClick={()=> navigate(`/admin-dashboard/employees/leaves/${Id}`)}
                    title="View Leaves"
                >
                    <FaCalendarAlt className="mr-1" />
                    Leave
                </button>
            </div> 
        )
    }