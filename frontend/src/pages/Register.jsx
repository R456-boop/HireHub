import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

import Layout from "../components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axiosInstance from "../utils/axios";

function Register() {
  const navigate = useNavigate();
  const dispatch=useDispatch();


  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const registerHandler = async (e) => {
    e.preventDefault();


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
      dispatch(setUser(response.data.user));
      navigate("/");

      if (response.data.success) {
        alert(response.data.message);

        navigate("/login");
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
      <div className="mx-auto max-w-md px-4 py-10">

        <h1 className="text-3xl font-bold">
          Create an Account
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Join HireHub and find your dream job
        </p>

        <form
          onSubmit={registerHandler}
          className="mt-6 space-y-4"
        >

          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <Input
              type="text"
              placeholder="Enter your full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Phone Number
            </label>

            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <Input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Role
            </label>

            <select
              className="h-9 w-full rounded-md border px-3"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          <Button
            type="submit"
            className="w-full"
          >
            Register
          </Button>

        </form>

      </div>
    </Layout>
  );
}

export default Register;