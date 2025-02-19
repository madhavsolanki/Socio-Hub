import useGetdUserProfile from "@/hooks/useGetUserProfile";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AtSign, Heart, MessageCircle } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetdUserProfile(userId);
  const [activeTab, setActiveTab] = useState("posts");
  const { userProfile , user} = useSelector((store) => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = false;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const displayedPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className="flex max-w-5xl justify-center mx-auto pl-10">
      <div className="flex flex-col gap-20 p-8">
        <div className="grid grid-cols-2">
          <section className="flex items-center justify-center">
            
            <Avatar className="h-32 w-32">
              <AvatarImage
                src={userProfile?.profilePicture}
                alt="profile_img"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>

          <section>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span>{userProfile?.username}</span>
                {isLoggedInUserProfile ? (
                  <>
                    <Link to={"/account/edit"}>
                      <Button
                        className="hover:bg-gray-200 h-8"
                        variant="secondary"
                      >
                        Edit profile
                      </Button>
                    </Link>

                    <Button
                      className="hover:bg-gray-200 h-8"
                      variant="secondary"
                    >
                      View archive
                    </Button>
                    <Button
                      className="hover:bg-gray-200 h-8"
                      variant="secondary"
                    >
                      Ad tools
                    </Button>
                  </>
                ) : isFollowing ? (
                  <>
                    <Button variant="secondary" className="h-8">
                      Unfollow
                    </Button>
                    <Button className="bg-[#0095F6] hover:bg-[#3192d2] text-white h-8">
                      Message
                    </Button>
                  </>
                ) : (
                  <Button className="bg-[#0095F6] hover:bg-[#3192d2] text-white h-8">
                    Follow
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-4">
                <p>
                  {" "}
                  <span className="font-semibold">
                    {userProfile?.posts.length}{" "}
                  </span>
                  posts
                </p>
                <p>
                  {" "}
                  <span className="font-semibold">
                    {userProfile?.followers.length}{" "}
                  </span>
                  followers
                </p>
                <p>
                  {" "}
                  <span className="font-semibold">
                    {userProfile?.following.length}{" "}
                  </span>
                  following
                </p>
              </div>
              <div className="flex flex-col gap-1 ">
                <span className="font-semibold mb-2">
                  {userProfile?.bio || "bio here...."}
                </span>
                <Badge
                  className="w-fit  hover:bg-gray-200 cursor-pointer"
                  variant="secondary"
                >
                  <AtSign className="h-4 w-4" />
                  <span className="pl-1"> {userProfile?.username}</span>{" "}
                </Badge>
              </div>
            </div>
          </section>
        </div>
        <div className="border-t border-t-gray-300">
          <div className="flex items-center justify-center gap-10 text-sm">
            <span
              className={`py-3 cursor-pointer ${
                activeTab === "posts" ? "font-bold" : ""
              }`}
              onClick={() => handleTabChange("posts")}
            >
              POSTS
            </span>
            <span
              className={`py-3 cursor-pointer ${
                activeTab === "saved" ? "font-bold" : ""
              }`}
              onClick={() => handleTabChange("saved")}
            >
              SAVED
            </span>
            <span
              className="py-3 cursor-pointer"
              onClick={() => handleTabChange("reels")}
            >
              REELS
            </span>
            <span
              className="py-3 cursor-pointer"
              onClick={() => handleTabChange("tags")}
            >
              TAGS
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {displayedPost?.map((post) => {
              return (
                <div key={post?._id} className="relative group cursor-pointer">
                  <img
                    src={post?.image}
                    alt="post_image"
                    className="rounded-sm my-2 w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center text-white space-x-4">
                      <button className="flex items-center gap-2 hover:text-gray-300">
                        <Heart />
                        <span>{post?.likes?.length}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-gray-300">
                        <MessageCircle />
                        <span>{post?.comments?.length}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};



export default Profile
