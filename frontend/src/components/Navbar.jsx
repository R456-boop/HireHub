import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axios";
import { clearUser } from "../redux/authSlice";
import { useState } from "react";

import Toast from "@/components/Toast";
import { useToast } from "@/hooks/useToast";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ================= STATES =================

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // ================= TOAST =================

  const { toast, showToast, hideToast } = useToast();

  // ================= LOGOUT =================

  const logoutHandler = async () => {
    try {
      setLoggingOut(true);

      // Show loading toast
      showToast("Logging out...", "loading");

      // Logout API
      await axiosInstance.get("/api/v1/user/logout");

      // Clear user from Redux
      dispatch(clearUser());

      // Close popup
      setShowLogoutPopup(false);

      // Show success message
      showToast("Logged out successfully!", "success");

      // Navigate after short delay
      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (error) {
      console.log("Logout error:", error);

      showToast(
        error.response?.data?.message ||
          "Logout failed. Please try again.",
        "error"
      );
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <nav className="border-b bg-white">

        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4">

          {/* ================= LOGO ================= */}

          <Link
            to="/"
            className="text-2xl font-bold"
          >
            HireHub
          </Link>

          {/* ================= NAVIGATION ================= */}

          <div className="flex flex-wrap items-center justify-end gap-2 md:gap-4">

            {/* ================= HOME ================= */}

            <Link
              to="/"
              className="text-xs font-medium hover:text-blue-600 sm:text-sm"
            >
              Home
            </Link>

            {/* ================= JOBS ================= */}

            <Link
              to="/jobs"
              className="text-xs font-medium hover:text-blue-600 sm:text-sm"
            >
              Jobs
            </Link>

            {/* ================= JOB SEEKER ================= */}

            {user && user.role === "student" && (
              <Link
                to="/applications"
                className="text-xs font-medium hover:text-blue-600 sm:text-sm"
              >
                My Applications
              </Link>
            )}

            {/* ================= RECRUITER ================= */}

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

            {/* ================= PROFILE ================= */}

            {user && (
              <Link
                to="/profile"
                className="text-xs font-medium hover:text-blue-600 sm:text-sm"
              >
                Profile
              </Link>
            )}

            {/* ================= LOGOUT ================= */}

            {user && (
              <Button
                variant="outline"
                onClick={() => setShowLogoutPopup(true)}
                className="px-2 text-xs sm:px-4 sm:text-sm"
              >
                Logout
              </Button>
            )}

            {/* ================= NOT LOGGED IN ================= */}

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

      {/* ================================================= */}
      {/* LOGOUT CONFIRMATION POPUP */}
      {/* ================================================= */}

      {showLogoutPopup && (
        <div className="fixed bottom-6 right-6 z-[9999] w-[350px] rounded-2xl border border-gray-700 bg-[#111111] p-5 shadow-2xl">

          {/* ================= TOP SECTION ================= */}

          <div className="flex items-start justify-between">

            <div>

              <h3 className="text-lg font-semibold text-white">
                Logout?
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                Are you sure you want to logout?
              </p>

            </div>

            {/* ================= CLOSE BUTTON ================= */}

            <button
              type="button"
              onClick={() => setShowLogoutPopup(false)}
              disabled={loggingOut}
              className="rounded-lg px-2 py-1 text-xl text-gray-400 hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              ×
            </button>

          </div>

          {/* ================= BUTTONS ================= */}

          <div className="mt-5 flex justify-end gap-3">

            {/* ================= CANCEL ================= */}

            <button
              type="button"
              onClick={() => setShowLogoutPopup(false)}
              disabled={loggingOut}
              className="rounded-lg border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            {/* ================= CONFIRM LOGOUT ================= */}

            <button
              type="button"
              onClick={logoutHandler}
              disabled={loggingOut}
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loggingOut
                ? "Logging out..."
                : "Logout"}
            </button>

          </div>

        </div>
      )}

      {/* ================= TOAST ================= */}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

    </>
  );
}

export default Navbar;