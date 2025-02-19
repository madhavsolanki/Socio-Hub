import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import SuggestedUsers from "./SuggestedUsers";
import store from "@/redux/store";

const RightSidebar = () => {
  const { user } = useSelector(store => store.auth);

  return (
    <div className="w-fit my-10 pr-32">
      <div className="flex items-center gap-2">
        <Link to={`/profile/${user?._id}`}>
          <Avatar className="w-6 h-6">
            <AvatarImage src={user?.profilePicture} alt="post_img" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>

        <div>
          <h1 className="font-semibold text-sm"><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
          <span className="text-gray-600 text-sm">{user?.bio || "Bio here..."}</span>
        </div>
      </div>

      <SuggestedUsers/>
    </div>
  );
};

export default RightSidebar;
