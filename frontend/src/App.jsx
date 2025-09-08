import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Landingpage from './Components/Landingpage/LandingPage';
import About from './Components/About/About';
import RoomTypes from './Components/Rooms/RoomTypes';
import Rooms from './Admin/Rooms';
import Payments from './Components/Payments/Payments';
import IndividualRooms from './Components/Rooms/IndividualRooms';
import { useAuthContext } from './hooks/useAuthContext';
import Profile from './Components/Profile/Profile';
import Allpayments from './Admin/Allpayments';
import AdminDashboard from './Admin/Homepage';

function App() {
  const { user } = useAuthContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        {/* redirect to home if already logged in */}
        <Route path="/login" element={!user ? <Login /> : (user?.role === "admin" ? <Navigate to="/admin" /> : <Navigate to="/" />)} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path="/about" element={<About />} />
        <Route path="/rooms" element={<RoomTypes />} />
        <Route path="/rooms/:id" element={<IndividualRooms />} />
        <Route path="/payments/:bookingid" element={<Payments />} />
        <Route path="/profile/:userid" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route
          path="/admin/rooms"
          element={user?.role === "admin" ? <Rooms /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/payments"
          element={user?.role === "admin" ? <Allpayments /> : <Navigate to="/" />}
        />
         <Route
          path="/admin"
          element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="*"
          element={
            <h1 className="flex items-center justify-center min-h-screen">
              404 Not Found
            </h1>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
