import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const token = Cookies.get("jwt");
        const response = await axios.get("/api/user/getallusers", {
          withCredentials: true,
          // credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response);
        setAllUsers(response.data);
      } catch (error) {
        console.log("error in useGetAllUsers", error);
      }
    };
    fetchAllUsers();
  }, []);

  return [allUsers];
}

export default useGetAllUsers;
