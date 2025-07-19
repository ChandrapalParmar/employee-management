import Department from '../models/Department.js'
import Employee from '../models/Employee.js'
import Leave from '../models/Leave.js'

const getSummary = async(req,res) =>{
    try{
        const adminQuery = req.user.role === 'admin' ? { adminId: req.user._id } : {};

        const totalEmployees = await Employee.countDocuments(adminQuery)
        const totalDepartments = await Department.countDocuments(adminQuery)

        const totalSalaries = await Employee.aggregate([
            { $match: adminQuery }, 
            { $group: { _id: null, totalSalary: { $sum: "$salary" } } }
        ])

        const employeeIdsForAdmin = await Employee.find(adminQuery).select('_id');
        const employeeIds = employeeIdsForAdmin.map(emp => emp._id);

        const employeeAppliedForLeave = await Leave.distinct('employeeId', { employeeId: { $in: employeeIds } });

        const leaveStatus = await Leave.aggregate([
            { $match: { employeeId: { $in: employeeIds } } }, 
            { $group: {
                _id:"$status",
                count: {$sum: 1}
            }}
        ])

        const leaveSummary = {
            appliedFor: employeeAppliedForLeave.length,
            approved: leaveStatus.find(item => item._id === "Approved")?.count || 0,
            rejected: leaveStatus.find(item => item._id === "Rejected")?.count || 0,
            pending: leaveStatus.find(item => item._id === "Pending")?.count || 0,
        }

        return res.status(200).json({
            success:true,
            totalEmployees,
            totalDepartments,
            totalSalary: totalSalaries[0]?.totalSalary || 0,
            leaveSummary
        })
    } catch(error){
        return res.status(500).json({success:false, error: "dashboard summary error"})
    }
}
export {getSummary}