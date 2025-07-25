import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => { 
  const [email,setEmail] =useState("");
  const [password,setPassword]=useState("");
  const [name, setName] = useState(""); 
  const [isRegisteringAdmin, setIsRegisteringAdmin] = useState(false); 
  const [error , setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login }= useAuth()
  const navigate= useNavigate()

  const handleLoginSubmit= async (e)=>{
    e.preventDefault()
    setIsLoading(true);
    try{
      const response= await axios.post(
        "https://employee-ms-server.onrender.com/api/auth/login",
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
    } finally {
      setIsLoading(false);
    }
  }

  const handleAdminRegisterSubmit = async (e) => { 
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://employee-ms-server.onrender.com/api/auth/register-admin",
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
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center gradient-primary p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white font-inter mb-2">
            Employee Management
          </h1>
          <p className="text-white/80 text-lg font-medium">
            System
          </p>
        </div>

        {/* Login/Register Card */}
        <div className="glass rounded-3xl p-8 shadow-2xl backdrop-blur-xl border border-white/20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 font-inter">
              {isRegisteringAdmin ? "Create Admin Account" : "Welcome Back"} 
            </h2>
            <p className="text-gray-600 mt-2">
              {isRegisteringAdmin ? "Register as an administrator" : "Sign in to your account"}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm font-medium text-center">{error}</p>
            </div>
          )} 

          {isRegisteringAdmin ? ( 
            // Admin Registration Form
            <form onSubmit={handleAdminRegisterSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input 
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  className="form-input"
                  onChange={(e)=> setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input 
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="form-input"
                  onChange={(e)=> setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input 
                  type="password"
                  id="password"
                  placeholder="Create a strong password"
                  className="form-input"
                  onChange={(e)=> setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed btn-animate"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="loading-spinner w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Admin Account"
                )}
              </button>
              
              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsRegisteringAdmin(false);
                      setError(null);
                    }} 
                    className="text-teal-600 hover:text-teal-700 font-semibold hover:underline transition-colors"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </form>
          ) : (
            // Login Form
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input 
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="form-input"
                  onChange={(e)=> setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              
              {/* Step 3: Update password input field */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // Dynamic type
            id="password"
            placeholder="Enter your password"
            className="form-input" // Ensure this class has w-full
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          {/* Step 4: Add the toggle button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-teal-600 hover:text-teal-700 font-semibold hover:underline transition-colors">
                  Forgot password?
                </a>
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed btn-animate"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="loading-spinner w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
              
              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  New Admin?{" "} 
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsRegisteringAdmin(true);
                      setError(null);
                    }} 
                    className="text-teal-600 hover:text-teal-700 font-semibold hover:underline transition-colors"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/70 text-sm">
            2025 Employee Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login;