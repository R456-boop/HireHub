import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axiosInstance from "../utils/axios";
import { setUser } from "../redux/authSlice";

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
    
      <div className="mx-auto max-w-md px-4 py-10">

        <h1 className="text-3xl font-bold">
          Login
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Login to your HireHub account
        </p>

        <form
          onSubmit={loginHandler}
          className="mt-6 space-y-4"
        >

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
              Password
            </label>

            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
          >
            Login
          </Button>

        </form>

      </div>
    </Layout>
  );
}

export default Login;