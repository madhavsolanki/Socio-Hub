// import React from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { Link } from "react-router-dom";
// import { Button } from "./ui/button";
// import { useSelector } from "react-redux";
// import store from "@/redux/store";
// import useGetAllMessage from "@/hooks/useGetAllMessage";
// import useGetRTM from "@/hooks/useGetRTMMessage";

// const Messages = ({ selectedUser }) => {
//   useGetRTM();
//   useGetAllMessage();
//   const {messages} = useSelector(store => store.chat);
//   const {user} = useSelector(store => store.auth);
//   return (
//     <div className="overflow-y-auto flex-1 p-4">
//       <div className="flex justify-center">
//         <div className="flex flex-col items-center justify-center">
//           <Avatar className="h-20 w-20">
//             <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//           <span>{selectedUser?.username}</span>
//           <Link to={`/profile/${selectedUser?._id}`}><Button className="h-8  my-2 hover:bg-gray-200 cursor-pointer" variant="secondary">View Profile</Button> </Link>
//         </div>
//       </div>
//       <div className="flex flex-col gap-3">
//       {
//           messages && messages.map((msg, index) => (
//             <div key={index} className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}>
//               <div className={`p-2 rounded-lg max-w-xs break-words ${msg.senderId === user?._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
//                 {msg.message}
//               </div>
//             </div>
//           ))
//       }
//       </div>
//     </div>
//   );
// };

// export default Messages;

// ============================= AI Code =============================
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import useGetAllMessage from "@/hooks/useGetAllMessage";
import useGetRTM from "@/hooks/useGetRTMMessage";

const Messages = ({ selectedUser }) => {
  useGetRTM();
  useGetAllMessage();

  const { messages } = useSelector((store) => store.chat) || { messages: [] };
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="overflow-y-auto flex-1 p-4">
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{selectedUser?.username}</span>
          <Link to={`/profile/${selectedUser?._id}`}>
            <Button
              className="h-8 my-2 hover:bg-gray-200 cursor-pointer"
              variant="secondary"
            >
              View Profile
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.senderId === user?._id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg max-w-xs break-words ${
                  msg.senderId === user?._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No messages yet.</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
