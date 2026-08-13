import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axiosInstance from "../utils/axios";
import { setUser } from "../redux/authSlice";

import registerImage from "../assets/register.jpg";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const registerHandler = async (e) => {
    e.preventDefault();

    // Password validation
    const passwordRegex = /^(?=.*[@#&])(?=.*[0-9]).+$/;

    if (!passwordRegex.test(password)) {
      alert(
        "Password must contain at least one @, #, or & and one number"
      );
      return;
    }

    // Contact validation
    const contactRegex = /^[0-9]{10}$/;

    if (!contactRegex.test(contact)) {
      alert("Contact number must contain exactly 10 digits");
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/api/v1/user/register",
        {
          fullname,
          email,
          password,
          role,
          contact,
        }
      );

      console.log("Register response:", response.data);

      if (response.data.success) {
        dispatch(setUser(response.data.user));

        alert(response.data.message);

        // Go directly to home
        navigate("/");
      }
    } catch (error) {
      console.log("Register error:", error);

      alert(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <Layout>

      {/* OUTER PAGE */}

      <div className="min-h-[calc(100vh-70px)] bg-[#a4abb6] px-4 py-8 flex items-center justify-center">

        {/* MAIN CARD */}

        <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] bg-[#f3e9c5] shadow-[0_20px_60px_rgba(0,0,0,0.15)] lg:grid-cols-[0.9fr_1.1fr]">

          {/* ================================= */}
          {/* LEFT SIDE - REGISTER FORM */}
          {/* ================================= */}

          <div className="flex items-center justify-center bg-[#f3e9c5] px-8 py-12 sm:px-12 lg:px-14">

            <div className="w-full max-w-sm">

              {/* LOGO */}

              <div className="mb-8">

                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  HireHub
                </h1>

              </div>


              {/* HEADING */}

              <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                Create an account
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Join HireHub and start your career journey
              </p>


              {/* REGISTER FORM */}

              <form
                onSubmit={registerHandler}
                className="mt-7 space-y-4"
              >

                {/* FULL NAME */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullname}
                    onChange={(e) =>
                      setFullname(e.target.value)
                    }
                    className="h-12 rounded-full border-0 bg-white px-5 text-sm text-gray-700 shadow-none outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-400"
                    required
                  />

                </div>


                {/* EMAIL */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                  </label>

                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="h-12 rounded-full border-0 bg-white px-5 text-sm text-gray-700 shadow-none outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-400"
                    required
                  />

                </div>


                {/* CONTACT */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>

                  <Input
                    type="tel"
                    placeholder="Enter 10 digit phone number"
                    value={contact}
                    maxLength={10}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (/^\d*$/.test(value)) {
                        setContact(value);
                      }
                    }}
                    className="h-12 rounded-full border-0 bg-white px-5 text-sm text-gray-700 shadow-none outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-400"
                    required
                  />

                  <p className="mt-1 ml-3 text-xs text-gray-500">
                    Enter exactly 10 digits
                  </p>

                </div>


                {/* PASSWORD */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <Input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    className="h-12 rounded-full border-0 bg-white px-5 text-sm text-gray-700 shadow-none outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-400"
                    required
                  />

                  <p className="mt-1 ml-3 text-xs text-gray-500">
                    Must contain a number and @, #, or &
                  </p>

                </div>


                {/* ROLE */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Account Type
                  </label>

                  <select
                    value={role}
                    onChange={(e) =>
                      setRole(e.target.value)
                    }
                    className="h-12 w-full rounded-full border-0 bg-white px-5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-yellow-400"
                  >

                    <option value="student">
                      Job Seeker
                    </option>

                    <option value="recruiter">
                      Recruiter
                    </option>

                  </select>

                </div>


                {/* REGISTER BUTTON */}

                <Button
                  type="submit"
                  className="mt-3 h-12 w-full rounded-full bg-[#ffd45a] text-sm font-semibold text-gray-900 shadow-none transition hover:bg-[#f7c94b]"
                >
                  Create Account
                </Button>

              </form>


              {/* LOGIN */}

              <p className="mt-6 text-center text-sm text-gray-600">

                Already have an account?{" "}

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="font-semibold text-gray-900 hover:underline"
                >
                  Login
                </button>

              </p>

            </div>

          </div>

{/* ================================= */}
{/* RIGHT SIDE - IMAGE */}
{/* ================================= */}

<div className="relative hidden min-h-[720px] bg-[#f3e9c5] p-5 lg:block">

  {/* IMAGE CONTAINER */}

  <div className="relative h-full overflow-hidden rounded-[3rem]">

    <img
      src={registerImage}
      alt="Join HireHub"
      className="absolute inset-0 h-full w-full object-cover object-center"
    />

    {/* Slight overlay */}

    <div className="absolute inset-0 bg-black/5" />

    {/* ================================= */}
    {/* TOP RIGHT CURVED X BUTTON */}
    {/* ================================= */}

   {/* TOP RIGHT CURVED X BUTTON */}

<div className="absolute right-0 top-0 z-20">

  {/* Yellow corner */}
  <div className="absolute -right-1 -top-1 h-28 w-28 rounded-bl-[55px] bg-[#f3e9c5]" />

  {/* White circular X */}
  <button
    type="button"
    className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl font-light text-gray-800 shadow-sm transition hover:scale-105"
  >
    ×
  </button>

</div>

    </div>


    {/* ================================= */}
    {/* TOP LEFT BADGE */}
    {/* ================================= */}

    <div className="absolute left-8 top-8 rounded-full bg-white/90 px-5 py-2 text-sm font-medium text-gray-800 backdrop-blur-sm">
      Build your future
    </div>


    {/* ================================= */}
    {/* BOTTOM TEXT */}
    {/* ================================= */}

    <div className="absolute bottom-10 left-8 right-8">

      <h2 className="text-4xl font-bold leading-tight text-white">
        Your next opportunity
        <br />
        starts here.
      </h2>

      <p className="mt-4 max-w-md text-sm leading-6 text-white/90">
        Discover exciting opportunities, connect
        with companies and take the next step
        toward your career.
      </p>

      <div className="mt-6 w-fit rounded-2xl bg-white/90 px-5 py-4 shadow-lg backdrop-blur-sm">

        <p className="text-xs text-gray-500">
          Start your journey
        </p>

        <p className="mt-1 text-sm font-semibold text-gray-900">
          Find jobs. Build your career.
        </p>

      </div>

    </div>

  </div>

</div>
</div>
    </Layout>
  );
}

export default Register;