import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FaEdit, FaTrash } from "react-icons/fa"

export const columns= [
    {
        name: "$ No",
        selector: (row) => row.sno
    },
    {
        name:"Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name:"Action",
        selector: (row)=> row.action
    },
]

export const DepartmentButtons =({Id,onDepartmentDelete})=>{
    const navigate=useNavigate()

    const handleDelete = async (id)=>{
        const confirm = window.confirm("Do you want to Delete?")
    if(confirm) {
     try {
        const response =await axios.delete(`http://localhost:3000/api/department/${id}`,{
          headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
        })
        if(response.data.success){
            onDepartmentDelete()             
        }
      } catch(error) {
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      }
    }
}
    return(
        <div className="flex space-x-2">
            <button 
                className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                onClick={()=> navigate(`/admin-dashboard/department/${Id}`)}
                title="Edit Department"
            >
                <FaEdit className="mr-1" />
                Edit
            </button>
            <button 
                className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                onClick={() => handleDelete(Id)}
                title="Delete Department"
            >
                <FaTrash className="mr-1" />
                Delete
            </button>
        </div> 
    )
}
