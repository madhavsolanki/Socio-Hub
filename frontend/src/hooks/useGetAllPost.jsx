// import { setPosts } from "@/redux/postSlice";
// import axios from "axios"
// import { useEffect } from "react"
// import { useDispatch } from "react-redux"

// const useGetAllPost = () => {
  
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchAllPost = async () => {
//       try {
//         const res = await axios.get('http://localhost:5500/api/v1/post/all', {withCredentials: true});
//         if(res.data.sucess){
//           console.log(res.data);
          
//           // dispatch(setPosts(res.data.posts));
//         }
//       } catch (error) {
//         console.log(error);
        
//       }
//     }
//     fetchAllPost();
//   },[]);
// };

// export default useGetAllPost

import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllPost = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Fetching posts..."); // Check if the hook runs

    const fetchAllPost = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/v1/post/all", {
          withCredentials: true,
        });

        if (res.data.success) {
          
          dispatch(setPosts(res.data.posts));
        } else {
          console.error("API call was successful, but 'success' is false.");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAllPost();
    return () => {
      console.log("Cleanup running...");
    };
  }, [dispatch]); 

};

export default useGetAllPost;
