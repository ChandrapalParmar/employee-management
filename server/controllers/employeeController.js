import Employee from "../models/Employee.js"
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import multer from "multer"
import path from "path" 

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "public/uploads")
    },
    filename: (req,file,cb)=>{
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

const upload= multer({storage: storage})

const addEmployee = async(req,res)=>{
    try{
    const {
        name,
        email,
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary,
        password,
        role,
    }= req.body

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({success:false,error:"user already registered in emp"})
        }

        const hashPassword = await bcrypt.hash(password,10)

        const newUser= new User({
            name,
            email,
            password:hashPassword,
            role,
            profileImage : req.file ? req.file.filename : ""
        })
        const savedUser= await newUser.save()

        const newEmployee =new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            adminId: req.user._id 
        })

        await newEmployee.save()
        return res.status(200).json({success: true, message:"employee created"})
    } catch(error){
        return res.status(500).json({success: false, error:"server error in adding employee "})
    }
}

const getEmployees = async(req,res) =>{
    try{
        const query = req.user.role === 'admin' ? { adminId: req.user._id } : {};
        const employees= await Employee.find(query).populate('userId',{password: 0}).populate("department")
        return res.status(200).json({success:true,employees})
    } catch(error){
         return res.status(500).json({success:false,error:"get employees server error"})
    }
}


const getEmployee = async(req,res) =>{
    const {id}=req.params
    try{
        let employee;

        const commonQuery = req.user.role === 'admin' ? { adminId: req.user._id } : {};

        employee= await Employee.findById({_id: id, ...commonQuery}).populate('userId',{password: 0}).populate("department")
        if(!employee){
           employee= await Employee.findOne({userId: id, ...commonQuery}).populate('userId',{password: 0}).populate("department")
        }
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found or not authorized" });
        }
        return res.status(200).json({success:true,employee})
    } catch(error){
         return res.status(500).json({success:false,error:"get employee server error"})
    }
}

const updateEmployee = async(req,res) =>{
    const {id}=req.params
    try{
        const {
        name,
        maritalStatus,
        designation,
        department,
        salary,
    }= req.body

    const commonQuery = req.user.role === 'admin' ? { adminId: req.user._id } : {};

    const employee = await Employee.findOne({_id: id, ...commonQuery})
    if(!employee){
        return res.status(404).json({success:false, error:"Employee Not Found or Not Authorized"})
    }
    const user = await User.findById({_id: employee.userId})
     if(!user){
        return res.status(404).json({success:false, error:"User Not Found"})
    }

    const updateUser = await User.findByIdAndUpdate({_id: employee.userId},{name})
    const updateEmployee = await Employee.findByIdAndUpdate({_id: id}, {
        maritalStatus,
        designation,salary,department
    })

    if(!updateEmployee || !updateUser) {
        return res.status(404).json({success:false, error:"Document Not Found"})
    }

    return res.status(200).json({success:true, message:"Employee Updated"})

    } catch(error){
         return res.status(500).json({success:false,error:"update employee server error"})
    }
}

const fetchEmployeesByDepId = async(req,res) =>{
    const {id}=req.params
    try{
        const commonQuery = req.user.role === 'admin' ? { adminId: req.user._id } : {};
        const employees= await Employee.find({department : id, ...commonQuery})
        return res.status(200).json({success:true,employees})
    } catch(error){
         return res.status(500).json({success:false,error:"get employeesByDepId server error"})
    }
}

export {addEmployee,upload,getEmployees,getEmployee,updateEmployee,fetchEmployeesByDepId}