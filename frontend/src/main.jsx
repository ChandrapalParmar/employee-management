import { createRoot } from 'react-dom/client' 
import './index.css'; 
import App from './App';
import AuthContext from './context/authContext.jsx';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

createRoot(document.getElementById('root')).render(
  <AuthContext>
     <App />
     <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> 
  </AuthContext>,
) 