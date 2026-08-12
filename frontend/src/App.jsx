import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import PostJob from "./pages/PostJob";
import Applications from "./pages/Application";
import Applicants from "./pages/Applicants";
import Company from "./pages/Company";
import JobDetails from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "./utils/axios";
import { setUser } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();

useEffect(() => {
  const getUser = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/user/profile"
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));
      }

    } catch (error) {
      console.log("User not logged in");
    }
  };

  getUser();
}, [dispatch]);
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/jobs" element={<Jobs />} />
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
        <Route
          path="/recruiter/dashboard"
          element={<RecruiterDashboard />}
        />

        <Route
          path="/recruiter/post-job"
          element={<PostJob />}
        />

        <Route
  path="/applications"
  element={
    <ProtectedRoute>
      <Applications />
    </ProtectedRoute>
  }
/>

       <Route
  path="/company"
  element={
    <ProtectedRoute role="recruiter">
      <Company />
    </ProtectedRoute>
  }
/>

        <Route
          path="/jobs/:id"
          element={<JobDetails />}
        />

        <Route
  path="/jobs/:id/apply"
  element={
    <ProtectedRoute>
      <ApplyJob />
    </ProtectedRoute>
  }
/>
        <Route
  path="/recruiter/applicants/:id"
  element={<Applicants />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;