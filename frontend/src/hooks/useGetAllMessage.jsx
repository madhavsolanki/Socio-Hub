// import { setMessages } from "@/redux/chatSlice";
// import store from "@/redux/store";
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const useGetAllMessage = () => {
//     const dispatch = useDispatch();
//     const {selectedUser} = useSelector(store => store.auth)
//   useEffect(() => {
//     console.log("Fetching posts..."); // Check if the hook runs

//     const fetchAllMessage = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5500/api/v1/message/all/${selectedUser?._id}`, {
//           withCredentials: true,
//         });

//         if (res.data.success) {
          
//           dispatch(setMessages(res.data.messages));
//         } else {
//           console.error("API call was successful, but 'success' is false.");
//         }
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchAllMessage();
//     return () => {
//       console.log("Cleanup running...");
//     };
//   }, [selectedUser]); 

// };

// export default useGetAllMessage;



// ============================ AI Code ============================

import { setMessages } from "@/redux/chatSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.auth);

  useEffect(() => {
    if (!selectedUser?._id) return;

    const fetchAllMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5500/api/v1/message/all/${selectedUser?._id}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setMessages(res.data.messages || []));
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchAllMessages();
  }, [selectedUser, dispatch]); 
};

export default useGetAllMessage;
