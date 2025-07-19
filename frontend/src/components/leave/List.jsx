import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../../context/authContext"

const List = () => {
  const [leaves,setLeaves] = useState(null)
  const [filteredLeaves, setFilteredLeaves] = useState(null) 
  let sno =1
  const {id} = useParams()
  const {user} = useAuth()


  const fetchLeaves = async ()=>{
        try {
            const response= await axios.get(`http://localhost:3000/api/leave/${id}/${user.role}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            if(response.data.success){
                setLeaves(response.data.leaves)
                setFilteredLeaves(response.data.leaves) 
            }
        } catch(error){
            if(error.response && !error.response.data.success){
                alert(error.message)
            }
        }
    }

    useEffect(()=>{
        fetchLeaves()
    },[])

    const handleFilter = (e) => {
        const query = e.target.value.toLowerCase();
        if (leaves) {
            const filtered = leaves.filter(leave =>
                leave.leaveType.toLowerCase().includes(query) ||
                leave.reason.toLowerCase().includes(query)
            );
            setFilteredLeaves(filtered);
        }
    }

    if(!filteredLeaves) { 
        return <div>Loading</div>
    }

  return (
   <div className='p-6'>
     <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Leave Type or Reason" 
          className="px-4 py-0.5 border"
          onChange={handleFilter}
        />
        {user.role === "employee" &&
         <Link to="/employee-dashboard/add-leave"
        className="px-4 py-1 bg-teal-600 rounded text-white"
        >Add New Leave</Link>
        }
      </div>

      <table className="w-full text-sm text-left text-gray-500 mt-6">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                        <tr>
                            <th className="px-6 py-3">SNO</th>
                            <th className="px-6 py-3">Leave Type</th>
                            <th className="px-6 py-3">From</th>
                            <th className="px-6 py-3">To</th>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {filteredLeaves.length > 0 ? (
                            filteredLeaves.map((leave) => (
                                <tr
                                    key={leave._id}
                                    className="bg-gray-50 border-b dark:border-gray-700">
                                        <td className="px-6 py-3">{sno++}</td>
                                        <td className="px-6 py-3">{leave.leaveType}</td>
                                        <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-3">{leave.reason}</td>
                                        <td className="px-6 py-3">{leave.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-3 text-center">No leaves found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
    </div>
  )
}

export default List