import Attendance from "../models/Attendance.js"
import Employee from "../models/Employee.js"

const defaultAttendance = async(req, res,next) =>{
    try{
        const date = new Date().toISOString().split('T')[0]
        
        const employeeQuery = req.user.role === 'admin' ? { adminId: req.user._id } : {};

        const employees = await Employee.find(employeeQuery)

        for (const employee of employees) {
            const existingAttendance = await Attendance.findOne({ date, employeeId: employee._id });

            if (!existingAttendance) {
                const newAttendance = {
                    date,
                    employeeId: employee._id,
                    status: null
                };
                await Attendance.create(newAttendance);
            }
        }
        next()
    } catch(error){
        res.status(500).json({success: false, error:error.message})
    }
}

export default defaultAttendance