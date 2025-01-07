import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import "./index.css";
import { useAuth } from "./context/AuthProvider";
import Loading from "./Components/Loading";
const App = () => {
  const [authUser, setAuthUser] = useAuth();

  return (
    <>
      {/* <Loading /> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to={"/"} /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to={"/"} /> : <Signup />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
