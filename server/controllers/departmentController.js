import Department from "../models/Department.js";

const getDepartments = async (req,res)=>{
    try{
        const query = req.user.role === 'admin' ? { adminId: req.user._id } : {};
        const departments= await Department.find(query)
        return res.status(200).json({success:true,departments})
    } catch(error){
         return res.status(500).json({success:false,error:"get department server error"})
    }
}

const addDepartment= async(req,res) =>{
    try{
        const {dep_name,description} = req.body;
        const newDep =new Department({
            dep_name,
            description,
            adminId: req.user._id 
        })
        await newDep.save()
        return res.status(200).json({success:true,department:newDep})

    } catch(error){
        return res.status(500).json({success:false,error:"add department server error"})
    }
}

const updateDepartment = async(req,res)=>{
    try{
        const {id} =req.params
        const {dep_name,description} = req.body;
        const updateDep =await Department.findOneAndUpdate(
            {_id: id, adminId: req.user._id} , 
            {dep_name, description},
            {new :true}
        )
        if (!updateDep) {
            return res.status(404).json({ success: false, error: "Department not found or not authorized" });
        }
         return res.status(200).json({success:true,updateDep})
    } catch(error){
         return res.status(500).json({success:false,error:"Edit department server error"})
    }
}

const getDepartment = async (req,res)=>{
    try{
        const {id} =req.params
        const department =await Department.findOne({_id: id, adminId: req.user._id}) 
        if (!department) {
            return res.status(404).json({ success: false, error: "Department not found or not authorized" });
        }
         return res.status(200).json({success:true,department})
    } catch(error){
         return res.status(500).json({success:false,error:"get department server error"})
    }
}

const deleteDepartment = async(req,res)=>{
     try{
        const {id} =req.params
        const deleteDep =await Department.findOne({_id: id, adminId: req.user._id}) 
        if (!deleteDep) {
            return res.status(404).json({ success: false, error: "Department not found or not authorized" });
        }
        await deleteDep.deleteOne()
         return res.status(200).json({success:true,deleteDep})
    } catch(error){
         return res.status(500).json({success:false,error:"Delete Department Server Error"})
    }
}

export {addDepartment , getDepartments, getDepartment,updateDepartment,deleteDepartment}