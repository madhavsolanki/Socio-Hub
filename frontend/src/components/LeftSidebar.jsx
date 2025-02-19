import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { logout } from "@/redux/authSlice";
import { useState } from "react";
import CreatePost from "./CreatePost";
import { setPosts, setSelectedPost } from "@/redux/postSlice";


const LeftSidebar = () => {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);
  const[open ,setOpen] = useState();
  const dispatch = useDispatch();

  



  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/v1/users/logout",  {
        withCredentials: true
      });
      if (res.data.success) {
        // dispatch(logout()); 
        dispatch(setSelectedPost());
        dispatch(setPosts([]));
      
        navigate("/login", { replace: true });
        toast.success("Logged out successfully!");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandler();
    }
    else if(textType === "Create"){
      setOpen(true);
    }
    else if(textType === "Profile"){
      navigate(`/profile/${user?._id}`);
    }
    else if(textType === "Home"){
      navigate("/");
    }else if(textType === "Messages"){
      navigate('/chat')
    }
  };

  const sidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut />, text: "Logout" },
  ];
  

  return (
    <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen">
      <div className="flex flex-col">
        <h1 className="my-8 pl-3 font-bold text-xl">Socio Hub</h1>
        <div>
          {sidebarItems.map((item, index) => {
            return (  
              <div
                onClick={() => sidebarHandler(item.text)}
                key={index}
                className="flex items-center gap-3  relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3*:"
              >
                {item.icon}
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;






