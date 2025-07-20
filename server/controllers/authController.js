import jwt from "jsonwebtoken";
import User from "../models/User.js"
import bcrypt from "bcrypt"

const login = async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({success: false, error:"User Not Found"})
        }

        const isMatch =await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(404).json({success:false,error:"Wrong Password"})
        }

        const token= jwt.sign(
            {_id: user._id, role: user.role},
            process.env.JWT_KEY,
            {expiresIn: "10d"}
        );
        res.status(200).json({
            success:true,
            token,user:{_id: user._id,name: user.name,role:user.role} 
        });
    } catch(error){
        res.status(500).json({success:false, error:error.message})
    }
}

const registerAdmin = async (req, res) => { 
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "User with this email already exists." });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newAdmin = new User({
            name,
            email,
            password: hashPassword,
            role: "admin", 
            profileImage: "" 
        });

        await newAdmin.save();
        return res.status(201).json({ success: true, message: "Admin registered successfully!" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}; 

const verifyToken=(req,res)=>{
    return res.status(200).json({success:true,user:req.user})
}

export {login,verifyToken, registerAdmin} 