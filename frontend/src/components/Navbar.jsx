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

      showToast("Logging out...", "loading");

      await axiosInstance.get("/api/v1/user/logout");

      dispatch(clearUser());

      setShowLogoutPopup(false);

      showToast("Logged out successfully!", "success");

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
      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <nav className="relative z-50 bg-[#050008] px-4 py-3 sm:px-6">

        <div className="mx-auto flex max-w-5xl items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 backdrop-blur-md">

          {/* ================================================= */}
          {/* LOGO */}
          {/* ================================================= */}

          <Link
            to="/"
            className="group flex items-center gap-2"
          >

            {/* PURPLE LOGO ICON */}

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#b78bea]/15">

              <span className="text-base text-[#c084fc]">
                ✦
              </span>

            </div>

            {/* LOGO TEXT */}

            <span className="text-lg font-medium tracking-tight text-white">
              Hire<span className="text-[#b78bea]">Hub</span>
            </span>

          </Link>

          {/* ================================================= */}
          {/* NAVIGATION */}
          {/* ================================================= */}

          <div className="flex items-center gap-1">

            {/* HOME */}

            <Link
              to="/"
              className="rounded-lg px-3 py-2 text-sm font-normal text-gray-500 transition hover:bg-white/[0.05] hover:text-white"
            >
              Home
            </Link>

            {/* JOBS */}

            <Link
              to="/jobs"
              className="rounded-lg px-3 py-2 text-sm font-normal text-gray-500 transition hover:bg-white/[0.05] hover:text-white"
            >
              Jobs
            </Link>

            {/* ================================================= */}
            {/* STUDENT LINKS */}
            {/* ================================================= */}

            {user && user.role === "student" && (
              <Link
                to="/applications"
                className="hidden rounded-lg px-3 py-2 text-sm font-normal text-gray-500 transition hover:bg-white/[0.05] hover:text-white sm:block"
              >
                My Applications
              </Link>
            )}

            {/* ================================================= */}
            {/* RECRUITER LINKS */}
            {/* ================================================= */}

            {user && user.role === "recruiter" && (
              <>
                <Link
                  to="/recruiter/dashboard"
                  className="hidden rounded-lg px-3 py-2 text-sm font-normal text-gray-500 transition hover:bg-white/[0.05] hover:text-white sm:block"
                >
                  Dashboard
                </Link>

                <Link
                  to="/recruiter/post-job"
                  className="hidden rounded-lg px-3 py-2 text-sm font-normal text-gray-500 transition hover:bg-white/[0.05] hover:text-white md:block"
                >
                  Post Job
                </Link>

                <Link
                  to="/company"
                  className="hidden rounded-lg px-3 py-2 text-sm font-normal text-gray-500 transition hover:bg-white/[0.05] hover:text-white md:block"
                >
                  Company
                </Link>
              </>
            )}

            {/* ================================================= */}
            {/* PROFILE */}
            {/* ================================================= */}

            {user && (
              <Link
                to="/profile"
                className="hidden rounded-lg px-3 py-2 text-sm font-normal text-gray-500 transition hover:bg-white/[0.05] hover:text-white sm:block"
              >
                Profile
              </Link>
            )}

            {/* ================================================= */}
            {/* COMMUNITY STYLE BUTTON */}
            {/* ================================================= */}

            {user ? (
              <Button
                type="button"
                onClick={() => setShowLogoutPopup(true)}
                className="ml-1 h-7 rounded-lg border border-white/[0.1] bg-white/[0.06] px-3 text-[10px] font-normal text-gray-300 shadow-none transition hover:bg-[#b78bea]/15 hover:text-white"
              >
                Logout
              </Button>
            ) : (
              <div className="ml-1 flex items-center gap-1">

                <Link to="/login">

                  <Button
                    type="button"
                    className="h-7 rounded-lg border border-white/[0.08] bg-transparent px-3 text-[10px] font-normal text-gray-400 shadow-none hover:bg-white/[0.05] hover:text-white"
                  >
                    Login
                  </Button>

                </Link>

                <Link to="/register">

                  <Button
                    type="button"
                    className="h-7 rounded-lg bg-[#b78bea] px-3 text-[10px] font-medium text-black shadow-none hover:bg-[#a970df]"
                  >
                    Register
                  </Button>

                </Link>

              </div>
            )}

          </div>

        </div>

      </nav>

      {/* ================================================= */}
      {/* LOGOUT CONFIRMATION POPUP */}
      {/* ================================================= */}

      {showLogoutPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">

          <div className="w-full max-w-sm rounded-[28px] border border-white/[0.1] bg-[#111111] p-7 shadow-2xl">

            {/* ================= ICON ================= */}

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#b78bea]/15">

              <span className="text-2xl text-[#b78bea]">
                ↗
              </span>

            </div>

            {/* ================= TEXT ================= */}

            <div className="mt-5 text-center">

              <h3 className="text-xl font-medium tracking-tight text-white">
                Logout?
              </h3>

              <p className="mt-2 text-sm font-normal leading-6 text-gray-500">
                Are you sure you want to logout from your HireHub account?
              </p>

            </div>

            {/* ================= BUTTONS ================= */}

            <div className="mt-7 flex gap-3">

              {/* CANCEL */}

              <button
                type="button"
                onClick={() => setShowLogoutPopup(false)}
                disabled={loggingOut}
                className="h-11 flex-1 rounded-xl border border-white/[0.1] bg-white/[0.03] text-sm font-normal text-gray-400 transition hover:bg-white/[0.07] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              {/* LOGOUT */}

              <button
                type="button"
                onClick={logoutHandler}
                disabled={loggingOut}
                className="h-11 flex-1 rounded-xl bg-[#b78bea] text-sm font-medium text-black transition hover:bg-[#a970df] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loggingOut
                  ? "Logging out..."
                  : "Logout"}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ================================================= */}
      {/* TOAST */}
      {/* ================================================= */}

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