Backend Assignment - MERN Stack Authentication System

Project Overview

This project is a Backend Assignment built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

The application implements a complete authentication system where users can:

Register an account
Login securely
Access a protected dashboard
Add and delete tasks
Logout securely

Only authenticated users can access the dashboard.

Tech Stack

Backend

Node.js
Express.js
MongoDB
Mongoose
JWT (JSON Web Token)
bcrypt (Password Hashing)

Frontend

React.js (JSX)
React Router DOM
Axios
CSS

Features Implemented

User Registration
User Login
JWT Authentication
Protected Dashboard Route
Add Task
Delete Task
Logout Functionality
Secure Password Hashing

Installation & Setup

Install Backend Dependencies

cd backend
npm install

Install Frontend Dependencies

cd frontend
npm install

Run the Project

Start Backend Server

cd backend
npm start

Start Frontend

cd frontend
npm run dev

Authentication Flow

1. User opens the application.
2. If not registered, user must register.
3. After successful login, a JWT token is generated.
4. Token is stored in localStorage.
5. User is redirected to Dashboard.
6. Without token, dashboard cannot be accessed.

Developer

Mustakeem
MERN Stack Developer
Sikar, Rajasthan

---
