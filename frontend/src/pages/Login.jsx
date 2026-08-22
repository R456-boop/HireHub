import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import axiosInstance from "../utils/axios";
import { setUser } from "../redux/authSlice";

import Toast from "@/components/Toast";
import { useToast } from "@/hooks/useToast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { toast, showToast, hideToast } = useToast();

  // ================= LOGIN =================

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToast("Please enter email and password.", "error");
      return;
    }

    try {
      setLoading(true);

      showToast("User is signing in...", "loading");

      const response = await axiosInstance.post(
        "/api/v1/user/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));

        showToast("Login successful!", "success");

        setTimeout(() => {
          navigate("/");
        }, 800);
      } else {
        showToast(
          response.data.message || "Login failed.",
          "error"
        );
      }
    } catch (error) {
      console.log("Login error:", error);

      showToast(
        error.response?.data?.message ||
          "Login failed. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#11021f] px-4 py-10">

      {/* ================= BACKGROUND GLOW ================= */}

      <div className="absolute inset-0 overflow-hidden">

        {/* Top purple glow */}
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-purple-500/30 blur-[120px]" />

        {/* Left middle glow */}
        <div className="absolute -left-48 top-1/3 h-[500px] w-[500px] rounded-full bg-purple-700/30 blur-[130px]" />

        {/* Bottom glow */}
        <div className="absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-violet-600/30 blur-[150px]" />


        {/* Abstract purple curved shapes */}

        <div className="absolute -right-32 top-10 h-[500px] w-[500px] rotate-[25deg] rounded-[100px] border border-purple-300/40 bg-gradient-to-br from-purple-400/30 via-purple-900/10 to-transparent shadow-[0_0_80px_rgba(168,85,247,0.5)] blur-[1px]" />

        <div className="absolute -left-52 top-[280px] h-[700px] w-[500px] rotate-[28deg] rounded-[120px] border border-purple-400/30 bg-gradient-to-r from-purple-600/30 via-transparent to-purple-300/20 shadow-[0_0_100px_rgba(139,92,246,0.4)]" />

        <div className="absolute bottom-[-250px] left-[15%] h-[550px] w-[750px] rotate-[20deg] rounded-[150px] border border-purple-300/20 bg-gradient-to-tr from-purple-700/40 via-purple-500/10 to-transparent blur-[1px]" />

      </div>


      {/* ================= LOGIN CARD ================= */}

      <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center">

        <div
          className="
            relative
            w-full
            max-w-[620px]
            overflow-hidden
            rounded-[38px]
            border
            border-white/20
            bg-[#160526]/55
            px-8
            py-12
            shadow-[0_0_80px_rgba(124,58,237,0.25)]
            backdrop-blur-2xl
            sm:px-12
            sm:py-14
          "
        >

          {/* Card glow */}

          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-purple-500/[0.08]" />

          <div className="relative mx-auto w-full max-w-[470px]">


            {/* ================= LOGO ================= */}

            <div className="flex flex-col items-center">

              <div className="relative mb-4 h-14 w-14">

                <div className="absolute left-1 top-0 h-8 w-4 rotate-45 rounded-full bg-gradient-to-b from-[#d8b4fe] to-[#7c3aed] shadow-[0_0_20px_rgba(192,132,252,0.7)]" />

                <div className="absolute bottom-0 right-1 h-8 w-4 rotate-45 rounded-full bg-gradient-to-b from-[#a78bfa] to-[#6d28d9] shadow-[0_0_20px_rgba(139,92,246,0.7)]" />

              </div>


              <h1 className="text-xl font-medium tracking-wide text-white/85">
                HireHub
              </h1>

              <h2 className="mt-10 text-center text-3xl font-semibold tracking-wide text-white sm:text-4xl">
                Welcome Back
              </h2>

            </div>


            {/* ================= FORM ================= */}

            <form
              onSubmit={loginHandler}
              className="mt-12 space-y-6"
            >


              {/* EMAIL */}

              <div>

                <label className="mb-2 block text-sm font-medium text-white/75">
                  Email address
                </label>

                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    h-14
                    rounded-xl
                    border
                    border-white/50
                    bg-white/[0.03]
                    px-4
                    text-white
                    placeholder:text-white/30
                    shadow-none
                    transition
                    focus:border-purple-300
                    focus:ring-2
                    focus:ring-purple-400/30
                  "
                />

              </div>


              {/* PASSWORD */}

              <div>

                <label className="mb-2 block text-sm font-medium text-white/75">
                  Password
                </label>

                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    h-14
                    rounded-xl
                    border
                    border-white/50
                    bg-white/[0.03]
                    px-4
                    text-white
                    placeholder:text-white/30
                    shadow-none
                    transition
                    focus:border-purple-300
                    focus:ring-2
                    focus:ring-purple-400/30
                  "
                />

              </div>


              {/* FORGOT PASSWORD */}

              <div className="-mt-1">

                <button
                  type="button"
                  className="
                    text-sm
                    text-white/70
                    transition
                    hover:text-purple-300
                  "
                >
                  Forgot Password ?
                </button>

              </div>


              {/* LOGIN BUTTON */}

              <Button
                type="submit"
                disabled={loading}
                className="
                  mt-3
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-purple-200/70
                  bg-gradient-to-r
                  from-[#8156d1]
                  via-[#a579e3]
                  to-[#7d55c9]
                  text-lg
                  font-medium
                  tracking-[0.15em]
                  text-white
                  shadow-[0_0_30px_rgba(168,85,247,0.35)]
                  transition-all
                  duration-300
                  hover:scale-[1.01]
                  hover:from-[#9267e0]
                  hover:via-[#b98bf0]
                  hover:to-[#8f63dc]
                  hover:shadow-[0_0_45px_rgba(192,132,252,0.55)]
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                "
              >
                {loading ? "LOGGING IN..." : "Login"}
              </Button>

            </form>


            {/* ================= SIGN UP ================= */}

            <p className="mt-16 text-center text-sm text-white/60">

              Are You New Member ?

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="
                  ml-1
                  font-semibold
                  text-white
                  transition
                  hover:text-purple-300
                "
              >
                Sign UP
              </button>

            </p>

          </div>

        </div>

      </div>


      {/* ================= TOAST ================= */}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

    </div>
  );
}

export default Login;