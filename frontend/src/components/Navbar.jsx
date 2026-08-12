import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axios";
import { clearUser } from "../redux/authSlice";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await axiosInstance.get("/api/v1/user/logout");

      dispatch(clearUser());

      window.location.href = "/login";
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold"
        >
          HireHub
        </Link>

        {/* Navigation */}
        <div className="flex flex-wrap items-center justify-end gap-2 md:gap-4">

          <Link
            to="/"
            className="text-xs font-medium hover:text-blue-600 sm:text-sm"
          >
            Home
          </Link>

          <Link
            to="/jobs"
            className="text-xs font-medium hover:text-blue-600 sm:text-sm"
          >
            Jobs
          </Link>

          {/* Job Seeker */}
          {user && user.role === "student" && (
            <Link
              to="/applications"
              className="text-xs font-medium hover:text-blue-600 sm:text-sm"
            >
              My Applications
            </Link>
          )}

          {/* Recruiter */}
          {user && user.role === "recruiter" && (
            <>
              <Link
                to="/recruiter/dashboard"
                className="text-xs font-medium hover:text-blue-600 sm:text-sm"
              >
                Dashboard
              </Link>

              <Link
                to="/recruiter/post-job"
                className="text-xs font-medium hover:text-blue-600 sm:text-sm"
              >
                Post Job
              </Link>

              <Link
                to="/company"
                className="text-xs font-medium hover:text-blue-600 sm:text-sm"
              >
                Company
              </Link>
            </>
          )}

          {/* Profile */}
          {user && (
            <Link
              to="/profile"
              className="text-xs font-medium hover:text-blue-600 sm:text-sm"
            >
              Profile
            </Link>
          )}

          {/* Logout */}
          {user && (
            <Button
              variant="outline"
              onClick={logoutHandler}
              className="px-2 text-xs sm:px-4 sm:text-sm"
            >
              Logout
            </Button>
          )}

          {/* Not logged in */}
          {!user && (
            <>
              <Link to="/login">
                <Button
                  variant="outline"
                  className="px-2 text-xs sm:px-4 sm:text-sm"
                >
                  Login
                </Button>
              </Link>

              <Link to="/register">
                <Button
                  className="px-2 text-xs sm:px-4 sm:text-sm"
                >
                  Register
                </Button>
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;