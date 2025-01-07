import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Fade, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function LeftLogout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/user/logout", {
        withCredentials: true, // Ensure cookies are included in the request
      });
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      toast.success("Logout Successful");
      window.location.reload();
    } catch (error) {
      console.log("error in logout", error);
      toast.error("Logout Failed");
    }
  };

  return (
    <div className="w-[10%] bg-slate-700 flex justify-end items-end py-12 px-2">
      <Tooltip
        title="Logout"
        placement="top"
        arrow
        slots={{
          transition: Fade,
        }}
        slotProps={{
          transition: { timeout: 200 },
        }}
      >
        <button onClick={() => handleLogout()}>
          <LogoutIcon className="rotate-180 cursor-pointer" />
        </button>
      </Tooltip>
    </div>
  );
}

export default LeftLogout;
