import Salary from "../models/Salary.js"
import Employee from '../models/Employee.js'

const addSalary = async(req,res)=>{
    try{
        const {employeeId, basicSalary, allowances, deductions, payDate} = req.body

        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions)

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate
        })

        await newSalary.save()

        return res.status(200).json({success: true})

    } catch(error) {
        return res.status(500).json({success:false, error:"salary add server error"})
    }

}


const getSalary = async(req,res)=>{
    try{
        const {id,role}= req.params
        let salary
        if(role === "admin"){
            const employee = await Employee.findOne({_id: id, adminId: req.user._id});
            if (!employee) {
                return res.status(404).json({ success: false, error: "Employee not found or not authorized" });
            }
            salary = await Salary.find({employeeId: employee._id}).populate('employeeId','employeeId')
        }
        else{ 
            const employee = await Employee.findOne({userId: id})
            if (!employee) {
                return res.status(404).json({ success: false, error: "Employee not found" });
            }
            salary = await Salary.find({employeeId: employee._id}).populate('employeeId','employeeId')
        }
        return res.status(200).json({success: true, salary})
    } catch(error) {
        return res.status(500).json({success:false, error:"salary get server error"})
    }

}

export {addSalary,getSalary}