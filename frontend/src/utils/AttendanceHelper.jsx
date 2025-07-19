import axios from "axios"

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
            const response = await axios.put(`http://localhost:3000/api/attendance/update/${employeeId}`,{status: newStatus},{ // <-- Updated: 'status: newStatus' use kiya gaya
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
  return (
    <div className="flex items-center space-x-4">
        {status && <p className="bg-gray-100 w-20 text-center py-2 rounded">{status}</p>}
    
        <div className="flex space-x-2"> 
            <button
                className="px-4 py-2 bg-green-500 text-white"
                onClick={() => markEmployee("Present", employeeId)}>
                Present
            </button>
            <button
                className="px-4 py-2 bg-red-500 text-white"
                onClick={() => markEmployee("Absent", employeeId)}> 
                Absent
            </button>
            <button
                className="px-4 py-2 bg-gray-500 text-white"
                onClick={() => markEmployee("Sick", employeeId)}> 
                Sick
            </button>
            <button
                className="px-4 py-2 bg-yellow-500 text-white"
                onClick={() => markEmployee("Leave", employeeId)}> 
                Leave
            </button>
        </div>
    </div>
  )
}