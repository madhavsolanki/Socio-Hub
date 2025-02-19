// import { setMessages } from "@/redux/chatSlice";
// import store from "@/redux/store";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const useGetRTM = () => {
//   const dispatch = useDispatch();
//   const { messages } = useSelector((store) => store.chat);
//   const { socket } = useSelector((store) => store.socketio);
//   useEffect(() => {
//     socket?.on("newMessage", (newMessage) => {
//       dispatch(setMessages([...messages, newMessage]));
//     });

//     return () => socket?.off("newMessage");
//   }, [messages, setMessages]);
// };

// export default useGetRTM;



// ========================== Ai Code =======================
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "@/redux/chatSlice";

const useGetRTM = () => {
  const dispatch = useDispatch();
  const messages = useSelector((store) => store.chat.messages);
  const { socket } = useSelector((store) => store.socketio);

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      dispatch(setMessages(newMessage)); // Append new message
    };

    socket?.on("newMessage", handleNewMessage);

    return () => socket?.off("newMessage", handleNewMessage);
  }, [socket, dispatch]); // Remove `messages` from dependency array to prevent re-renders
};

export default useGetRTM;

