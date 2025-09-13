DeepSea - Hotel Management Web Application
Description

DeepSea is a full-stack hotel management web application built with React (frontend) and Node.js + Express + MongoDB (backend).

Motivation: To create a modern hotel booking and management system where users can explore rooms, make bookings, and handle payments, while admins can manage rooms, users, and transactions.

Why this project: Managing hotel operations manually is inefficient. This project provides a digital solution that is user-friendly and scalable.

Problem it solves: It allows users to easily browse and book hotel rooms online, while admins can oversee all bookings, users, and payments in one centralized dashboard.

What I learned: Building this project improved my skills in full-stack development, authentication, routing, REST APIs, and integration between frontend and backend services.

Table of Contents

Installation

Usage

Features

Screenshots

Credits

License

Installation
Backend

Clone the repository and navigate to the backend folder:

cd backend


Install dependencies:

npm install


Create a .env file with the following variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Start the backend server:

npm start


The backend will run on http://localhost:8000
.

Frontend

Navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Start the development server:

npm run dev


The frontend will run on http://localhost:5173 or http://localhost:5174
.

Usage

Users can sign up, log in, browse rooms, make bookings, and payments.

Admins can manage rooms, view all bookings, users, and payments via the admin dashboard.

👉 Add screenshots in assets/images and link them here:

![Landing Page](assets/images/landing.png)
![Booking Flow](assets/images/booking.png)
![Admin Dashboard](assets/images/admin.png)

Features

User authentication (JWT-based)

Room browsing and booking system

Online payment integration

Admin dashboard for hotel management

Responsive UI with TailwindCSS

Credits

Frontend: React, React Router, TailwindCSS

Backend: Node.js, Express, MongoDB, Mongoose

Other Tools: Axios, JWT, Multer

License

This project is licensed under the ISC License.
