import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setAuthUser } from "@/redux/authSlice";

// 9:59:20

// const EditProfile = () => {
//   const imageRef = useRef();
//   const [loading, setLoading] = useState(false);

//   const { user } = useSelector((store) => store.auth);

//   const [input, setInput] = useState({
//     profilePhoto: user?.profilePicture,
//     bio: user?.bio,
//     gender: user?.gender,
//   });

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const fileChangeHandler = (e) => {
//     const file = e.target.files?.[0];
//     if (file) setInput({ ...input, profilePhoto: file });
//   };

//   const selectChangeHandler = (value) => {
//     setInput({ ...input, gender: value });
//   };

//   const editProfileHandler = async () => {
//     const formData = new FormData();
//     formData.append("bio", input.bio);
//     formData.append("gender", input.gender);

//     if (input.profilePhoto) formData.append("profilePicture", input.profilePhoto);

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         "http://localhost:5500/api/v1/users/profile/edit",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         });
//         if(res?.data?.success){
//           const updatedUserData = {
//             ...user, 
//             bio:res?.data?.user?.bio,
//             profilePicture:res?.data?.user?.profilePicture,
//             gender:res?.data?.user?.gender,
//           };
//           dispatch(setAuthUser(updatedUserData));
//           navigate(`/profile/${user?._id}`);
//           toast.success(res.data.message);
//         }

//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     }finally{
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex max-w-2xl mx-auto pl-10">
//       <section className="flex flex-col gap-6 w-full my-8">
//         <h1 className="font-bold text-xl">Edit Profile</h1>

//         <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
//           <div className="flex items-center gap-3">
//             <Avatar className="w-15 h-15">
//               <AvatarImage src={user?.profilePic} alt="post_img" />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>

//             <div>
//               <h1 className="font-bold text-sm">{user?.username}</h1>
//               <span className="text-gray-600 ">
//                 {user?.bio || "Bio here..."}
//               </span>
//             </div>
//           </div>

//           <input
//             ref={imageRef}
//             onChange={fileChangeHandler}
//             type="file"
//             className="hidden"
//           />
//           <Button
//             onClick={() => imageRef?.current.click()}
//             className="bg-[#0095F6] hover:bg-[#318bc7]"
//           >
//             Change Photo
//           </Button>
//         </div>
//         <div>
//           <h1 className="font-bold text-xl mb-2">Bio</h1>
//           <Textarea
//             value={input.bio}
//             onChange={(e) => setInput({ ...input, bio: e.target.value })}
//             name="bio"
//             className="focus-visible:ring-transparent"
//           />
//         </div>
//         <div>
//           <h1 className="font-bold mb-2">Gender</h1>
//           <Select
//             defaultValue={input.gender}
//             onValueChange={selectChangeHandler}
//           >
//             <SelectTrigger className="w-full">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectItem value="male">Male</SelectItem>
//                 <SelectItem value="female">Female</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="flex justify-end">
//           {loading ? (
//             <Button className="w-fit bg-[#0095F6] hover:bg-[#2a8ccd]">
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Please wait...
//             </Button>
//           ) : (
//             <Button
//               onClick={editProfileHandler}
//               className="w-fit bg-[#0095F6] hover:bg-[#2a8ccd]"
//             >
//               Submit
//             </Button>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default EditProfile






// ======================= Source Code =============================
// const EditProfile = () => {
//   const imageRef = useRef();
//   const { user } = useSelector(store => store.auth);
//   const [loading, setLoading] = useState(false);
//   const [input, setInput] = useState({
//       profilePhoto: user?.profilePicture,
//       bio: user?.bio,
//       gender: user?.gender
//   });
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const fileChangeHandler = (e) => {
//       const file = e.target.files?.[0];
//       if (file) setInput({ ...input, profilePhoto: file });
//   }

//   const selectChangeHandler = (value) => {
//       setInput({ ...input, gender: value });
//   }


//   const editProfileHandler = async () => {
//       console.log(input);
//       const formData = new FormData();
//       formData.append("bio", input.bio);
//       formData.append("gender", input.gender);
//       if(input.profilePhoto){
//           formData.append("profilePicture", input.profilePhoto);
//       }
//       try {
//           setLoading(true);
//           const res = await axios.post("http://localhost:5500/api/v1/users/profile/edit", formData,{
//               headers:{
//                   'Content-Type':'multipart/form-data'
//               },
//               withCredentials:true
//           });
//           if(res.data.success){
//               const updatedUserData = {
//                   ...user,
//                   bio:res.data.user?.bio,
//                   profilePicture:res.data.user?.profilePicture,
//                   gender:res.data.user.gender
//               };
//               dispatch(setAuthUser(updatedUserData));
//               navigate(`/profile/${user?._id}`);
//               toast.success(res.data.message);
//           }

//       } catch (error) {
//           console.log(error);
//           toast.error(error.response.data.messasge);
//       } finally{
//           setLoading(false);
//       }
//   }
//   return (
//       <div className='flex max-w-2xl mx-auto pl-10'>
//           <section className='flex flex-col gap-6 w-full my-8'>
//               <h1 className='font-bold text-xl'>Edit Profile</h1>
//               <div className='flex items-center justify-between bg-gray-100 rounded-xl p-4'>
//                   <div className='flex items-center gap-3'>
//                       <Avatar>
//                           <AvatarImage src={user?.profilePicture} alt="post_image" />
//                           <AvatarFallback>CN</AvatarFallback>
//                       </Avatar>
//                       <div>
//                           <h1 className='font-bold text-sm'>{user?.username}</h1>
//                           <span className='text-gray-600'>{user?.bio || 'Bio here...'}</span>
//                       </div>
//                   </div>
//                   <input ref={imageRef} onChange={fileChangeHandler} type='file' className='hidden' />
//                   <Button onClick={() => imageRef?.current.click()} className='bg-[#0095F6] h-8 hover:bg-[#318bc7]'>Change photo</Button>
//               </div>
//               <div>
//                   <h1 className='font-bold text-xl mb-2'>Bio</h1>
//                   <Textarea value={input.bio} onChange={(e) => setInput({ ...input, bio: e.target.value })} name='bio' className="focus-visible:ring-transparent" />
//               </div>
//               <div>
//                   <h1 className='font-bold mb-2'>Gender</h1>
//                   <Select defaultValue={input.gender} onValueChange={selectChangeHandler}>
//                       <SelectTrigger className="w-full">
//                           <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                           <SelectGroup>
//                               <SelectItem value="male">Male</SelectItem>
//                               <SelectItem value="female">Female</SelectItem>
//                           </SelectGroup>
//                       </SelectContent>
//                   </Select>
//               </div>
//               <div className='flex justify-end'>
//                   {
//                       loading ? (
//                           <Button className='w-fit bg-[#0095F6] hover:bg-[#2a8ccd]'>
//                               <Loader2 className='mr-2 h-4 w-4 animate-spin' />
//                               Please wait
//                           </Button>
//                       ) : (
//                           <Button onClick={editProfileHandler} className='w-fit bg-[#0095F6] hover:bg-[#2a8ccd]'>Submit</Button>
//                       )
//                   }
//               </div>
//           </section>
//       </div>
//   )
// }

// export default EditProfile




//==============================================================================
//====================    AI GENERTED CODE    =============================

const EditProfile = () => {
  const imageRef = useRef();
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    profilePhoto: null,
    bio: user?.bio || "",
    gender: user?.gender || "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setInput((prev) => ({ ...prev, profilePhoto: file }));
    }
  };

  const selectChangeHandler = (value) => {
    setInput((prev) => ({ ...prev, gender: value }));
  };

  const editProfileHandler = async () => {
    console.log("Sending data:", input);

    const formData = new FormData();
    formData.append("bio", input.bio);
    formData.append("gender", input.gender);
    if (input.profilePhoto) {
      formData.append("profilePicture", input.profilePhoto);
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5500/api/v1/users/profile/edit", formData, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate(`/profile/${user?._id}`);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-w-2xl mx-auto pl-10">
      <section className="flex flex-col gap-6 w-full my-8">
        <h1 className="font-bold text-xl">Edit Profile</h1>
        <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="profile" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-sm">{user?.username}</h1>
              <span className="text-gray-600">{user?.bio || "Bio here..."}</span>
            </div>
          </div>
          <input ref={imageRef} onChange={fileChangeHandler} type="file" className="hidden" />
          <Button onClick={() => imageRef?.current.click()} className="bg-[#0095F6] h-8 hover:bg-[#318bc7]">
            Change photo
          </Button>
        </div>
        <div>
          <h1 className="font-bold text-xl mb-2">Bio</h1>
          <Textarea value={input.bio} onChange={(e) => setInput({ ...input, bio: e.target.value })} className="focus-visible:ring-transparent" />
        </div>
        <div>
          <h1 className="font-bold mb-2">Gender</h1>
          <Select defaultValue={input.gender} onValueChange={selectChangeHandler}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={editProfileHandler} disabled={loading} className="w-fit bg-[#0095F6] hover:bg-[#2a8ccd]">
          {loading ? "Updating..." : "Submit"}
        </Button>
      </section>
    </div>
  );
};

export default EditProfile;
