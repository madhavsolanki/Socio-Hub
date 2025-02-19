import { setSuggestedUsers } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSuggestedUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Fetching Suggested Users..."); // Check if the hook runs

    const fetchSuggestedUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/v1/users/suggested", {
          withCredentials: true,
        });

        if (res.data.success) {
          
          dispatch(setSuggestedUsers(res.data.users));
        } else {
          console.error("API call was successful, but 'success' is false.");
        }
      } catch (error) {
        console.error("Error fetching Suggested Users...:", error);
      }
    };

    fetchSuggestedUsers();
    return () => {
      console.log("Cleanup running...");
    };
  }, [dispatch]); 

};

export default useGetSuggestedUser;