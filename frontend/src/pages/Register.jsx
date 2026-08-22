import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Layout from "../components/Layout";
import axiosInstance from "../utils/axios";
import { setUser } from "../redux/authSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ================= STATES =================

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contact: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ================= WELCOME SCREEN STATE =================

  const [showWelcome, setShowWelcome] = useState(false);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // ================= REGISTER =================

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await axiosInstance.post(
        "/api/v1/user/register",
        formData
      );

      console.log("Register response:", response.data);

      // ================= SAVE USER IN REDUX =================

      dispatch(setUser(response.data.user));

      // ================= SHOW WELCOME SCREEN =================

      setShowWelcome(true);

      // ================= GO TO HOME AFTER 3 SECONDS =================

      setTimeout(() => {
        navigate("/");
      }, 3000);

    } catch (error) {
      console.log("Register error:", error);

      setError(
        error.response?.data?.message ||
          "Something went wrong while registering"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>

      {/* ========================================================= */}
      {/* SUCCESSFUL REGISTRATION - WELCOME SCREEN */}
      {/* ========================================================= */}

      {showWelcome ? (

        <div className="min-h-[calc(100vh-70px)] bg-[#090014] text-white">

          <div className="mx-auto flex min-h-[calc(100vh-70px)] max-w-7xl">

            {/* ================================================= */}
            {/* LEFT SIDE */}
            {/* ================================================= */}

            <div className="relative hidden w-[46%] overflow-hidden bg-[#110025] lg:block">

              {/* ================= PURPLE GLOWS ================= */}

              <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-purple-700/30 blur-3xl" />

              <div className="absolute -right-32 top-48 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl" />

              <div className="absolute -left-20 bottom-[-120px] h-96 w-96 rounded-full bg-violet-600/30 blur-3xl" />

              {/* ================= DECORATIVE SHAPES ================= */}

              <div className="absolute right-16 top-16 h-28 w-28 rounded-[40%] bg-gradient-to-br from-purple-500/30 to-transparent blur-sm" />

              <div className="absolute left-20 top-24 h-16 w-16 rounded-full border border-purple-400/20 bg-purple-500/10" />

              <div className="absolute right-[-80px] top-[260px] h-72 w-72 rotate-[-25deg] rounded-[45%] bg-gradient-to-br from-indigo-500/20 via-purple-600/30 to-fuchsia-500/10 blur-sm" />

              <div className="absolute left-[-100px] bottom-[-70px] h-72 w-72 rounded-[45%] bg-gradient-to-br from-purple-700/30 to-indigo-900/20 blur-sm" />

              {/* ================= CONTENT ================= */}

              <div className="relative z-10 flex h-full flex-col justify-between px-10 py-10">

                {/* ================= LOGO ================= */}

                <Link
                  to="/"
                  className="flex items-center gap-2"
                >

                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-purple-500 to-fuchsia-500 text-xs font-bold">
                    ✦
                  </div>

                  <span className="text-sm font-semibold tracking-wide text-white">
                    HireHub
                  </span>

                </Link>

                {/* ================= MAIN TEXT ================= */}

                <div className="max-w-md">

                  <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-purple-300">
                    Welcome to HireHub
                  </p>

                  <h2 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white xl:text-6xl">

                    Your career.
                    <br />

                    <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-300 bg-clip-text text-transparent">
                      Your future.
                    </span>

                  </h2>

                  <p className="mt-6 max-w-sm text-sm leading-6 text-gray-400">
                    Discover exciting opportunities, connect with
                    ambitious companies, and take the next step in
                    your career.
                  </p>

                </div>

                {/* ================= BOTTOM ================= */}

                <div>

                  <div className="flex items-center">

                    <div className="flex -space-x-2">

                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#110025] bg-purple-400 text-[10px] font-bold">
                        A
                      </div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#110025] bg-indigo-400 text-[10px] font-bold">
                        R
                      </div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#110025] bg-fuchsia-400 text-[10px] font-bold">
                        S
                      </div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#110025] bg-cyan-300 text-[10px] font-bold text-black">
                        K
                      </div>

                    </div>

                    <p className="ml-4 text-xs text-gray-400">
                      Join thousands of job seekers
                    </p>

                  </div>

                  <div className="mt-5 h-px w-full bg-white/[0.08]" />

                  <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-gray-600">
                    Find opportunities. Build your career.
                  </p>

                </div>

              </div>

            </div>

            {/* ================================================= */}
            {/* RIGHT SIDE - WELCOME */}
            {/* ================================================= */}

            <div className="flex w-full items-center justify-center bg-[#0d0018] px-6 py-10 lg:w-[54%] lg:px-14">

              <div className="w-full max-w-lg text-center">

                {/* ================= SUCCESS ICON ================= */}

                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-purple-500/10 ring-1 ring-purple-400/30">

                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-3xl font-bold text-white shadow-lg shadow-purple-900/40">
                    ✓
                  </div>

                </div>

                {/* ================= SMALL LABEL ================= */}

                <p className="mt-8 text-xs font-medium uppercase tracking-[0.3em] text-purple-400">
                  Account Created
                </p>

                {/* ================= WELCOME HEADING ================= */}

                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">

                  Welcome,

                  <br />

                  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-300 bg-clip-text text-transparent">
                    {formData.fullname}
                  </span>

                </h1>

                {/* ================= DESCRIPTION ================= */}

                <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-gray-400">

                  Your HireHub account has been created successfully.
                  You're now ready to discover new opportunities and
                  take the next step in your career.

                </p>

                {/* ================= SUCCESS CARD ================= */}

                <div className="mx-auto mt-8 max-w-md rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 text-left">

                  <div className="flex items-center gap-4">

                    {/* CHECK */}

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-lg font-bold text-purple-400">
                      ✓
                    </div>

                    {/* TEXT */}

                    <div>

                      <h3 className="text-sm font-medium text-white">
                        Registration successful
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Your account is ready to use.
                      </p>

                    </div>

                  </div>

                </div>

                {/* ================= USER INFORMATION ================= */}

                <div className="mx-auto mt-4 max-w-md rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-left">

                  <div className="flex items-center justify-between">

                    <span className="text-xs text-gray-500">
                      Account type
                    </span>

                    <span className="text-xs font-medium capitalize text-purple-400">
                      {formData.role === "student"
                        ? "Job Seeker"
                        : "Recruiter"}
                    </span>

                  </div>

                </div>

                {/* ================= LOADING BAR ================= */}

                <div className="mt-8">

                  <div className="mx-auto h-1.5 w-48 overflow-hidden rounded-full bg-white/[0.06]">

                    <div className="h-full w-full origin-left animate-[welcomeProgress_3s_linear] rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-400" />

                  </div>

                  <p className="mt-3 text-xs text-gray-600">
                    Taking you to HireHub...
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      ) : (

        /* ========================================================= */
        /* NORMAL REGISTER PAGE */
        /* ========================================================= */

        <div className="min-h-[calc(100vh-70px)] bg-[#090014] text-white">

          <div className="mx-auto flex min-h-[calc(100vh-70px)] max-w-7xl">

            {/* ================================================= */}
            {/* LEFT SIDE - PROMOTIONAL SECTION */}
            {/* ================================================= */}

            <div className="relative hidden w-[46%] overflow-hidden bg-[#110025] lg:block">

              {/* ================= PURPLE GLOW ================= */}

              <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-purple-700/30 blur-3xl" />

              <div className="absolute -right-32 top-48 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl" />

              <div className="absolute -left-20 bottom-[-120px] h-96 w-96 rounded-full bg-violet-600/30 blur-3xl" />

              {/* ================= DECORATIVE SHAPES ================= */}

              <div className="absolute right-16 top-16 h-28 w-28 rounded-[40%] bg-gradient-to-br from-purple-500/30 to-transparent blur-sm" />

              <div className="absolute left-20 top-24 h-16 w-16 rounded-full border border-purple-400/20 bg-purple-500/10" />

              <div className="absolute right-[-80px] top-[260px] h-72 w-72 rotate-[-25deg] rounded-[45%] bg-gradient-to-br from-indigo-500/20 via-purple-600/30 to-fuchsia-500/10 blur-sm" />

              <div className="absolute left-[-100px] bottom-[-70px] h-72 w-72 rounded-[45%] bg-gradient-to-br from-purple-700/30 to-indigo-900/20 blur-sm" />

              {/* ================= CONTENT ================= */}

              <div className="relative z-10 flex h-full flex-col justify-between px-10 py-10">

                {/* ================= LOGO ================= */}

                <Link
                  to="/"
                  className="flex items-center gap-2"
                >

                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-purple-500 to-fuchsia-500 text-xs font-bold">
                    ✦
                  </div>

                  <span className="text-sm font-semibold tracking-wide text-white">
                    HireHub
                  </span>

                </Link>

                {/* ================= MAIN TEXT ================= */}

                <div className="max-w-md">

                  <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-purple-300">
                    Career Opportunities
                  </p>

                  <h2 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white xl:text-6xl">

                    Build your
                    <br />

                    <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-300 bg-clip-text text-transparent">
                      career.
                    </span>

                    <br />

                    Find your future.

                  </h2>

                  <p className="mt-6 max-w-sm text-sm leading-6 text-gray-400">
                    Join thousands of job seekers discovering new
                    opportunities and connecting with ambitious
                    companies.
                  </p>

                </div>

                {/* ================= BOTTOM ================= */}

                <div>

                  <div className="flex items-center">

                    <div className="flex -space-x-2">

                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#110025] bg-purple-400 text-[10px] font-bold">
                        A
                      </div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#110025] bg-indigo-400 text-[10px] font-bold">
                        R
                      </div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#110025] bg-fuchsia-400 text-[10px] font-bold">
                        S
                      </div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#110025] bg-cyan-300 text-[10px] font-bold text-black">
                        K
                      </div>

                    </div>

                    <p className="ml-4 text-xs text-gray-400">
                      Join thousands of job seekers
                    </p>

                  </div>

                  <div className="mt-5 h-px w-full bg-white/[0.08]" />

                  <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-gray-600">
                    Find opportunities. Build your career.
                  </p>

                </div>

              </div>

            </div>

            {/* ================================================= */}
            {/* RIGHT SIDE - REGISTER FORM */}
            {/* ================================================= */}

            <div className="flex w-full items-center justify-center bg-[#0d0018] px-6 py-10 lg:w-[54%] lg:px-14">

              <div className="w-full max-w-lg">

                {/* ================= MOBILE LOGO ================= */}

                <Link
                  to="/"
                  className="mb-8 flex items-center gap-2 lg:hidden"
                >

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-500 text-sm font-bold">
                    ✦
                  </div>

                  <span className="text-xl font-semibold">

                    Hire

                    <span className="text-purple-400">
                      Hub
                    </span>

                  </span>

                </Link>

                {/* ================= HEADING ================= */}

                <div>

                  <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    Create Your Account
                  </h1>

                  <p className="mt-2 text-sm text-gray-500">
                    Join HireHub and start your career journey
                  </p>

                </div>

                {/* ================= ERROR ================= */}

                {error && (
                  <div className="mt-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {/* ================= FORM ================= */}

                <form
                  onSubmit={handleRegister}
                  className="mt-8 space-y-5"
                >

                  {/* ================= FULL NAME + CONTACT ================= */}

                  <div className="grid gap-4 sm:grid-cols-2">

                    {/* FULL NAME */}

                    <div>

                      <label className="mb-2 block text-[11px] font-medium text-gray-400">
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        className="h-11 w-full rounded-md border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500/60 focus:bg-white/[0.06] focus:ring-1 focus:ring-purple-500/30"
                      />

                    </div>

                    {/* CONTACT */}

                    <div>

                      <label className="mb-2 block text-[11px] font-medium text-gray-400">
                        Phone Number
                      </label>

                      <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="10 digit number"
                        maxLength="10"
                        required
                        className="h-11 w-full rounded-md border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500/60 focus:bg-white/[0.06] focus:ring-1 focus:ring-purple-500/30"
                      />

                    </div>

                  </div>

                  {/* ================= EMAIL ================= */}

                  <div>

                    <label className="mb-2 block text-[11px] font-medium text-gray-400">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="h-11 w-full rounded-md border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500/60 focus:bg-white/[0.06] focus:ring-1 focus:ring-purple-500/30"
                    />

                  </div>

                  {/* ================= PASSWORD ================= */}

                  <div>

                    <label className="mb-2 block text-[11px] font-medium text-gray-400">
                      Password
                    </label>

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                      className="h-11 w-full rounded-md border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500/60 focus:bg-white/[0.06] focus:ring-1 focus:ring-purple-500/30"
                    />

                    <p className="mt-2 text-[10px] text-gray-600">
                      Use at least one number and one of @, #, or &.
                    </p>

                  </div>

                  {/* ================= ACCOUNT TYPE ================= */}

                  <div>

                    <label className="mb-2 block text-[11px] font-medium text-gray-400">
                      Account Type
                    </label>

                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="h-11 w-full rounded-md border border-white/[0.08] bg-[#160525] px-4 text-sm text-gray-300 outline-none transition focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
                    >

                      <option value="student">
                        Job Seeker
                      </option>

                      <option value="recruiter">
                        Recruiter
                      </option>

                    </select>

                  </div>

                  {/* ================= TERMS ================= */}

                  <div className="flex items-center gap-2">

                    <div className="h-3.5 w-3.5 rounded border border-gray-600 bg-white/[0.03]" />

                    <p className="text-[10px] text-gray-500">
                      I agree to the{" "}
                      <span className="text-purple-400">
                        Terms & Conditions
                      </span>
                    </p>

                  </div>

                  {/* ================= REGISTER BUTTON ================= */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative h-11 w-full overflow-hidden rounded-md bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-500 text-sm font-semibold text-white shadow-lg shadow-purple-900/20 transition hover:scale-[1.01] hover:shadow-purple-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    <span className="relative z-10">

                      {loading
                        ? "Creating Account..."
                        : "Create Account"}

                    </span>

                  </button>

                </form>

                {/* ================= LOGIN ================= */}

                <p className="mt-7 text-center text-xs text-gray-500">

                  Already have an account?{" "}

                  <Link
                    to="/login"
                    className="font-medium text-purple-400 transition hover:text-purple-300"
                  >
                    Log in
                  </Link>

                </p>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* ========================================================= */}
      {/* PROGRESS BAR ANIMATION */}
      {/* ========================================================= */}

      <style>
        {`
          @keyframes welcomeProgress {
            from {
              transform: translateX(-100%);
            }

            to {
              transform: translateX(0%);
            }
          }
        `}
      </style>

    </Layout>
  );
}

export default Register;