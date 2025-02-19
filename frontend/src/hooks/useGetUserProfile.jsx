import {setUserProfile } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetdUserProfile = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Fetching Suggested Users..."); // Check if the hook runs

    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5500/api/v1/users/${userId}/profile`, {
          withCredentials: true,
        });

        if (res.data.success) {
          
          dispatch(setUserProfile(res.data.user));
        } else {
          console.error("API call was successful, but 'success' is false.");
        }
      } catch (error) {
        console.error("Error fetching Suggested Users...:", error);
      }
    };

    fetchUserProfile();
    return () => {
      console.log("Cleanup running...");
    };
  }, [userId]); 

};

export default useGetdUserProfile;