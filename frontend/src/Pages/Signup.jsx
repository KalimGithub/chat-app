import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthProvider";

function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // API call to create user
      try {
        const response = await axios.post("/api/user/signup", {
          //localhost:3000/api/user/login
          name,
          email,
          password,
          confirmPassword,
        });
        if (response.data) {
          toast.success("Signup successfull!!!");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      } catch (error) {
        if (error.response) {
          toast.error("error: " + error.response.data.message);
          console.error("Error creating user", error);
        }
      }
    } else {
      toast.error("Passwords do not match!");
      console.log("*Passwords do not match!");
    }
  };

  return (
    <div className="w-screen h-screen overflow-auto bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="w-[75vw] lg:w-[30vw]  border-2 rounded-xl border-gray-600 shadow-slate-200 bg-slate-800 text-white mx-auto mt-20 px-12 py-8 flex flex-col gap-4"
      >
        <h1 className="text-center font-semibold text-xl">
          Create a new <span className="text-blue-600">Account</span>
        </h1>
        <label className="input input-bordered flex items-center px-4 py-2 gap-4 rounded-lg border-2 focus-within:border-gray-400 border-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-5 w-5 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow outline-none bg-transparent text-md"
            placeholder="Username"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-4 px-4 py-2 rounded-lg border-2 border-gray-700 focus-within:border-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-5 w-5 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow outline-none bg-transparent text-md"
            placeholder="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-4  px-4 py-2 rounded-lg border-2 border-gray-700 focus-within:border-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-5 w-5 opacity-70 "
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow outline-none bg-transparent text-md"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-4  px-4 py-2 rounded-lg border-2 border-gray-700 focus-within:border-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-5 w-5 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow outline-none bg-transparent text-md"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <Button variant="contained" className="w-full" type="submit">
          SIGNUP
        </Button>
        <p className="text-center">
          Already have an account?{" "}
          <Link
            className="text-blue-600 font-semibold underline cursor-pointer"
            to="/login"
          >
            Login here
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
