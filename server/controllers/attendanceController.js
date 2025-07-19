import Attendance from "../models/Attendance.js"
import Employee from "../models/Employee.js"

const getAttendance = async(req,res) =>{
    try {
        const date = new Date().toISOString().split('T')[0]

        const employeeQuery = req.user.role === 'admin' ? { adminId: req.user._id } : {};
        const employeeIdsForAdmin = await Employee.find(employeeQuery).select('_id');
        const employeeIds = employeeIdsForAdmin.map(emp => emp._id);

        const attendance= await Attendance.find({date, employeeId: { $in: employeeIds }}).populate({
            path: "employeeId",
            populate: [
                "department",
                "userId"
            ]
        })
        res.status(200).json({success: true, attendance})
    } catch(error) {
        res.status(500).json({success: false, message:error.message})
    }
}

const updateAttendance = async (req,res) => {
    try{
        const {employeeId} =req.params
        const {status} = req.body
        const date = new Date().toISOString().split("T")[0]

        const employee = await Employee.findOne({ employeeId, adminId: req.user._id });
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found or not authorized" });
        }

        const attendance = await Attendance.findOneAndUpdate({employeeId: employee._id ,date}, {status}, {new :true})

        res.status(200).json({success:true ,attendance})
    } catch(err){
        res.status(500).json({success:false, message:err.message}) 
    }
}

const attendanceReport= async(req,res) =>{
    try{
        const {date,limit=5, skip= 0} = req.query
        let query = {}

        const employeeQuery = req.user.role === 'admin' ? { adminId: req.user._id } : {};
        const employeeIdsForAdmin = await Employee.find(employeeQuery).select('_id');
        const employeeIds = employeeIdsForAdmin.map(emp => emp._id);
        query.employeeId = { $in: employeeIds }; 

        if(date){
            query.date = date
        }

        const attendanceData = await Attendance.find(query).
        populate({
            path: "employeeId",
            populate: [
                "department",
                "userId"
            ]
        }).sort({date: -1}).limit(parseInt(limit)).skip(parseInt(skip))

        const groupData = attendanceData.reduce((result,record) => {
            if(!result[record.date]){
                result[record.date] = []
            }
            result[record.date].push({
                employeeId: record.employeeId.employeeId,
                employeeName: record.employeeId.userId.name,
                departmentName: record.employeeId.department.dep_name,
                status: record.status || "Not Marked"
            })
            return result
        },{})
        return res.status(201).json({success:true, groupData})
    } catch(error){
        res.status(500).json({success:false, message:error.message})
    }
}

export {getAttendance,updateAttendance,attendanceReport}