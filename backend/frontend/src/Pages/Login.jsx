import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/user/login",
        // http://localhost:3000/user/home
        {
          email,
          password,
        },
        {
          withCredentials: true, // Include cookies
        }
      );
      console.log(response.data);
      if (response.data) {
        toast.success("Login Successful!");
        // console.log(response.data);
      }
      localStorage.setItem("ChatApp", JSON.stringify(response.data));
      setAuthUser(response.data);
      // navigate("/");
    } catch (error) {
      console.error("errror ", error);
      if (error.response) {
        // setIsError(error.response.data.message);
        toast.error(error.response.data.message);
        // console.log("errorrrrrr", error);
      }
    }
  };
  return (
    <div className="w-screen h-screen overflow-auto bg-slate-900">
      <form
        onSubmit={handleLogin}
        className="w-[75vw] lg:w-[30vw] border-2 rounded-xl border-gray-600 shadow-slate-200 bg-slate-800 text-white mx-auto mt-20 px-12 py-8 flex flex-col gap-4"
      >
        <h1 className="text-center font-semibold text-xl">
          Login to your <span className="text-blue-600">Account</span>
        </h1>

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
            placeholder="Email"
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
        <Button variant="contained" className="w-full" type="submit">
          LOGIN
        </Button>
        <p className="text-center">
          Don't have an Account?{" "}
          <Link
            className="text-blue-600 font-semibold underline cursor-pointer"
            to="/signup"
          >
            Signup here
          </Link>
        </p>
      </form>
      {/* error showing div */}
      {isError && (
        <>
          <div
            role="alert"
            className="alert alert-warning w-[30%] mx-auto mt-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div className="flex w-full justify-between items-center">
              <span>{isError}</span>
              <span onClick={() => setIsError(null)} className="cursor-pointer">
                <CloseIcon />
              </span>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default Login;
