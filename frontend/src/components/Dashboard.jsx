// import { FaTachometerAlt, FaUsers, FaBuilding, FaChartLine, FaArrowRight, FaRocket } from "react-icons/fa"
// import { useNavigate } from "react-router-dom"

// const Dashboard = () => {
//   const navigate = useNavigate()

//   const features = [
//     {
//       icon: FaUsers,
//       title: "Employee Management",
//       description: "Manage employee records, profiles, and information",
//       color: "from-blue-500 to-blue-600",
//       action: () => navigate("/admin-dashboard/employees")
//     },
//     {
//       icon: FaBuilding,
//       title: "Department Management", 
//       description: "Organize and manage company departments",
//       color: "from-green-500 to-green-600",
//       action: () => navigate("/admin-dashboard/departments")
//     },
//     {
//       icon: FaChartLine,
//       title: "Analytics & Reports",
//       description: "View insights and generate reports",
//       color: "from-purple-500 to-purple-600",
//       action: () => navigate("/admin-dashboard")
//     }
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 to-blue-600/10"></div>
//         <div className="relative max-w-7xl mx-auto px-6 py-20">
//           <div className="text-center">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl mb-8 shadow-lg">
//               <FaTachometerAlt className="text-white text-3xl" />
//             </div>
            
//             <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6">
//               Employee Management
//               <span className="block text-4xl md:text-5xl bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
//                 System
//               </span>
//             </h1>
            
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
//               Streamline your workforce management with our comprehensive platform. 
//               Manage employees, departments, attendance, and payroll all in one place.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button 
//                 onClick={() => navigate("/admin-dashboard")}
//                 className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
//               >
//                 <FaRocket className="mr-2" />
//                 Get Started
//                 <FaArrowRight className="ml-2" />
//               </button>
              
//               <button 
//                 onClick={() => navigate("/admin-dashboard/employees")}
//                 className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-teal-500 hover:text-teal-600 transition-all duration-200"
//               >
//                 View Employees
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="max-w-7xl mx-auto px-6 py-20">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             Powerful Features
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Everything you need to manage your workforce efficiently and effectively
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {features.map((feature, index) => {
//             const IconComponent = feature.icon
//             return (
//               <div 
//                 key={index}
//                 className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
//                 onClick={feature.action}
//               >
//                 <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
//                   <IconComponent className="text-white text-2xl" />
//                 </div>
                
//                 <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
//                   {feature.title}
//                 </h3>
                
//                 <p className="text-gray-600 mb-4 leading-relaxed">
//                   {feature.description}
//                 </p>
                
//                 <div className="flex items-center text-teal-600 font-semibold group-hover:text-teal-700">
//                   Learn More
//                   <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="bg-gradient-to-r from-teal-600 to-blue-600 py-16">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
//             <div>
//               <div className="text-4xl font-bold mb-2">500+</div>
//               <div className="text-teal-100">Employees Managed</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold mb-2">50+</div>
//               <div className="text-teal-100">Departments</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold mb-2">99%</div>
//               <div className="text-teal-100">Uptime</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold mb-2">24/7</div>
//               <div className="text-teal-100">Support</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Call to Action */}
//       <div className="max-w-7xl mx-auto px-6 py-20 text-center">
//         <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             Ready to Get Started?
//           </h2>
//           <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
//             Join thousands of companies using our platform to streamline their HR operations
//           </p>
//           <button 
//             onClick={() => navigate("/admin-dashboard")}
//             className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
//           >
//             <FaTachometerAlt className="mr-3" />
//             Access Dashboard
//             <FaArrowRight className="ml-3" />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard