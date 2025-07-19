import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Login = () => { 
  const [email,setEmail] =useState("");
  const [password,setPassword]=useState("");
  const [name, setName] = useState(""); 
  const [isRegisteringAdmin, setIsRegisteringAdmin] = useState(false); 
  const [error , setError] = useState(null);
  const { login }= useAuth()
  const navigate= useNavigate()

  const handleLoginSubmit= async (e)=>{
    e.preventDefault()
    try{
      const response= await axios.post(
        "http://localhost:3000/api/auth/login",
        {email,password}
      );
      if(response.data.success){
        login(response.data.user)
        localStorage.setItem("token",response.data.token)
        toast.success(`Logged in as ${response.data.user.role}!`); 
        if(response.data.user.role === "admin"){
          navigate('/admin-dashboard')
        } else {
          navigate('/employee-dashboard')
        }
      }
    } catch(error){
      if(error.response && error.response.data.error){
        setError(error.response.data.error)
        toast.error(error.response.data.error); 
      } else{
        setError("Server Error")
        toast.error("Server Error"); 
      }
    }
  }

  const handleAdminRegisterSubmit = async (e) => { 
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register-admin",
        { name, email, password }
      );
      if (response.data.success) {
        toast.success(response.data.message); 
        setIsRegisteringAdmin(false); 
        setError(null); 
        setEmail(""); 
        setPassword("");
        setName("");
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
        toast.error(error.response.data.error); 
      } else {
        setError("Server Error");
        toast.error("Server Error"); 
      }
    }
  };


  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
      <h2 className="font-pacifico text-3xl text-white">Employee Management System</h2>
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">
            {isRegisteringAdmin ? "Register Admin" : "Login"} 
        </h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>} 

         {isRegisteringAdmin ? ( 
            // Admin Registration Form
            <form onSubmit={handleAdminRegisterSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input type="text"
                    placeholder="Enter Name"
                    className="w-full px-3 py-2 border"
                    onChange={(e)=> setName(e.target.value)}
                    value={name}
                    required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input type="email"
                    placeholder="Enter Email"
                    className="w-full px-3 py-2 border"
                    onChange={(e)=> setEmail(e.target.value)}
                    value={email}
                    required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input type="password"
                    placeholder="******"
                    className="w-full px-3 py-2 border"
                    onChange={(e)=> setPassword(e.target.value)}
                    value={password}
                    required
                    />
                </div>
                <div className="mb-4">
                    <button type="submit" className="w-full bg-teal-600 text-white py-2">Register Admin</button>
                </div>
                <p className="text-center text-sm">
                    Already have an account?{" "}
                    <button type="button" onClick={() => setIsRegisteringAdmin(false)} className="text-teal-600 hover:underline">
                        Login here
                    </button>
                </p>
            </form>
         ) : (
            // Login Form
            <form onSubmit={handleLoginSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input type="email"
                    placeholder="Enter Email"
                    className="w-full px-3 py-2 border"
                    onChange={(e)=> setEmail(e.target.value)}
                    value={email}
                    required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input type="password"
                    placeholder="******"
                    className="w-full px-3 py-2 border"
                    onChange={(e)=> setPassword(e.target.value)}
                    value={password}
                    required
                    />
                </div>
                <div className="mb-4 flex items-center justify-between">
                    <label className="inline-flex items-center">
                        <input type="checkbox" className="form-chechbox"/>
                        <span className="ml-2 text-gray-700">Remember Me</span>
                    </label>
                    <a href="#" className="text-teal-600">Forgot password?</a>
                </div>
                <div className="mb-4">
                    <button type="submit" className="w-full bg-teal-600 text-white py-2">Login</button>
                </div>
                <p className="text-center text-sm">
                    New Admin?{" "} 
                    <button type="button" onClick={() => setIsRegisteringAdmin(true)} className="text-teal-600 hover:underline">
                        Register here
                    </button>
                </p>
            </form>
         )}
      </div> 
    </div>
  )
}

export default Login;