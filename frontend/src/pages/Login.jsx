import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axiosInstance from "../utils/axios";
import { setUser } from "../redux/authSlice";
 import loginImage from "../assets/login.jpg";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/api/v1/user/login",
        {
          email,
          password,
        }
      );

      console.log("Login response:", response.data);

      if (response.data.success) {
        dispatch(setUser(response.data.user));

        navigate("/", {
          state: {
            message: response.data.message,
          },
        });
      }
    } catch (error) {
      console.log("Login error:", error);

      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <Layout>

      <div className="min-h-[calc(100vh-70px)] bg-[#f7f7f5] px-4 py-8 flex items-center justify-center">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] lg:grid-cols-[0.9fr_1.1fr]">

          {/* ================= LEFT SIDE ================= */}

          <div className="flex items-center justify-center px-8 py-12 sm:px-12 lg:px-14">

            <div className="w-full max-w-sm">

              {/* LOGO */}

            <div className="flex items-center gap-2">
  
  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-md">
    <span className="text-lg font-bold text-white">
      H
    </span>
  </div>

  <h1 className="text-3xl font-extrabold tracking-tight">
    <span className="text-gray-900">Hire</span>
    <span className="text-blue-600">Hub</span>
  </h1>

</div>


              {/* HEADING */}

              <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                Welcome Back
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Let's login to continue your journey
              </p>


              {/* LOGIN FORM */}

              <form
                onSubmit={loginHandler}
                className="mt-8 space-y-5"
              >

                {/* EMAIL */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email
                  </label>

                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="h-12 rounded-xl border-gray-200 bg-gray-50 px-4 text-sm shadow-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                {/* PASSWORD */}

                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label className="text-sm font-semibold text-gray-700">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-medium text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </button>

                  </div>

                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    className="h-12 rounded-xl border-gray-200 bg-gray-50 px-4 text-sm shadow-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                {/* REMEMBER ME */}

                <div className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                  />

                  <span className="text-sm text-gray-500">
                    Remember me
                  </span>

                </div>


                {/* LOGIN BUTTON */}

                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                >
                  Login
                </Button>

              </form>


              {/* SIGN UP */}

              <p className="mt-8 text-center text-sm text-gray-500">

                Don't have an account?{" "}

                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Sign Up
                </button>

              </p>

            </div>

          </div>


          {/* ================= RIGHT SIDE ================= */}

          <div className="relative hidden min-h-[650px] p-5 lg:block">

            <div className="relative h-full overflow-hidden rounded-[3rem]">

              <img
                src={loginImage}
                alt="Find your dream job"
                className="h-full w-full object-cover object-center"
              />

          

              <div className="absolute inset-0 bg-black/10" />


              {/* IMAGE TEXT */}

              <div className="absolute left-8 right-8 top-8">

                <h2 className="text-3xl font-bold leading-tight text-white">
                  Find your dream job
                  <br />
                  and build your future.
                </h2>

                <p className="mt-3 max-w-sm text-sm leading-6 text-white/90">
                  Discover exciting opportunities and connect
                  with companies looking for talented people.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Login;