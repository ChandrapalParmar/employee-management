import Leave from '../models/Leave.js'
import Employee from '../models/Employee.js'


const addLeave = async(req,res)=>{
    try{
        const {userId, leaveType, startDate, endDate, reason} = req.body
        const employee = await Employee.findOne({userId})

        const newLeave = new Leave ({
            employeeId: employee._id, leaveType, startDate, endDate, reason
        })

        await newLeave.save()

        return res.status(200).json({success: true})

    } catch(error) {
        return res.status(500).json({success:false, error:"Leave add server error"})
    }

}

const getLeave = async(req,res)=>{
    try{
        const {id,role} = req.params
        let leaves
        if(role ==="admin"){
 
            const employee = await Employee.findOne({_id: id, adminId: req.user._id});
            if (!employee) {
                return res.status(404).json({ success: false, error: "Employee not found or not authorized" });
            }
            leaves = await Leave.find({employeeId: employee._id})
        } else{ 
            const employee = await Employee.findOne({userId: id})
            if (!employee) {
                return res.status(404).json({ success: false, error: "Employee not found" });
            }
            leaves = await Leave.find({ employeeId: employee._id})
        }
        return res.status(200).json({success:true, leaves})
    } catch(error) {
        return res.status(500).json({success:false, error:"Leave add server error"})
    }

}

const getLeaves =async(req,res) =>{
     try{
        let query = {};
        if (req.user.role === 'admin') {

            const employeeIdsForAdmin = await Employee.find({ adminId: req.user._id }).select('_id');
            const employeeIds = employeeIdsForAdmin.map(emp => emp._id);
            query = { employeeId: { $in: employeeIds } };
        }

        const leaves= await Leave.find(query).populate({
            path: "employeeId",
            populate: [
                {
                    path: 'department',
                    select: 'dep_name'
                },
                {
                    path: 'userId',
                    select: 'name'
                }
            ]
        })

        return res.status(200).json({success:true, leaves})
    } catch(error) {
        return res.status(500).json({success:false, error:"Leave add server error"})
    }
}

const getLeaveDetail = async (req,res)=>{
    try{
        const {id} = req.params
 
        let leaveQuery = {_id: id};
        if (req.user.role === 'admin') {
            const leave = await Leave.findById(id);
            if (!leave) {
                return res.status(404).json({ success: false, error: "Leave not found" });
            }
            const employee = await Employee.findById(leave.employeeId);
            if (!employee || employee.adminId.toString() !== req.user._id.toString()) {
                return res.status(404).json({ success: false, error: "Leave not found or not authorized" });
            }
        }

        const leave= await Leave.findById(leaveQuery).populate({
            path: "employeeId",
            populate: [
                {
                    path: 'department',
                    select: 'dep_name'
                },
                {
                    path: 'userId',
                    select: 'name profileImage'
                }
            ]
        })

        return res.status(200).json({success:true, leave})
    } catch(error) {
        return res.status(500).json({success:false, error:"Leave add server error"})
    }
}

const updateLeave = async(req,res) =>{
    try{
        const {id} =req.params
      
        let updateQuery = {_id: id};
        if (req.user.role === 'admin') {
            const leave = await Leave.findById(id);
            if (!leave) {
                return res.status(404).json({ success: false, error: "Leave not found" });
            }
            const employee = await Employee.findById(leave.employeeId);
            if (!employee || employee.adminId.toString() !== req.user._id.toString()) {
                return res.status(404).json({ success: false, error: "Leave not found or not authorized" });
            }
        }

        const leave= await Leave.findByIdAndUpdate(updateQuery, {status: req.body.status}, {new: true})
        if(!leave){
            return res.status(404).json({success:false, error:"leave not founded"})
        }
        return res.status(200).json({success: true})
    } catch(error){
        console.log(error.message)
        return res.status(500).json({success:false, error:"Leave add server error"})
    }
}

export {addLeave,getLeave,getLeaves,getLeaveDetail,updateLeave}