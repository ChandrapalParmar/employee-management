# Employee Management System

This is a full-stack Employee Management System built using the MERN (MongoDB, Express.js, React, Node.js) stack. This application allows an admin to easily manage employees, departments, salaries, attendance, and leaves. Employees can also log into their portal to view their details and apply for leave.

## ✨ Features

This project has different features for two types of users:

#### 👨‍💼 Admin Features:
* **Dashboard:** A summary view of total employees, departments, and total salary.
* **Department Management:** Add, edit, or delete new departments.
* **Employee Management:** Add new employees, and view and update their profiles.
* **Leave Management:** View and approve/reject leave requests from employees.
* **Salary Management:** Add salary records for employees.
* **Attendance Tracking:** Mark daily attendance (Present, Absent, etc.) and view reports.

#### 🧑‍🔧 Employee Features:
* **Dashboard:** View a summary on their dashboard.
* **Profile:** View their personal and professional details.
* **Leave Application:** Apply for leave and view their leave history.
* **Salary Details:** View their salary history.
* **Security:** Change their password.

## 🛠️ Tech Stack

**Frontend:**
* React.js
* React Router
* Tailwind CSS
* Axios
* Vite

**Backend:**
* Node.js
* Express.js
* MongoDB (Database)
* JSON Web Token (JWT) for Authentication
* Bcrypt for Password Hashing
* Multer for file uploads

## 🚀 Getting Started

Follow these steps to set up this project on your local machine:

**1. Clone the Repository:**
```bash
git clone <your-repository-url>
cd employee-management
```

**2. Backend Setup:**
```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create a .env file and add the variables below
touch .env
```
Your `server/.env` file should look like this:
```env
MONGODB_URL=your_mongodb_connection_string
JWT_KEY=your_secret_key_for_jwt
PORT=8000
```bash
# Start the backend server
npm start
```

**3. Frontend Setup:**
```bash
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

**4. Access the Application:**
You can now access the application by navigating to `http://localhost:5173` (or whichever port is shown in the terminal) in your browser.

---
### **Login Credentials**
To test the application, you can run the `server/UserSeed.js` file to create a default admin user.

**Default Admin:**
* **Email:** `admin@gmail.com`
* **Password:** `admin`
