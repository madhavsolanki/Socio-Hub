import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector  } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import store from "@/redux/store";


const Login = () => {

   // Get Data from the input fields
   const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const {user} = useSelector(store => store.auth);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // =================== Redux Impl===============================
  const dispatch = useDispatch();
  

  // ==================================================

 
 

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5500/api/v1/users/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        
        // For debugging
        // console.log('Login Response:', res.data);
        

      
          navigate("/", { replace: true });
          toast.success(res.data.message);
          setInput({ email: "", password: "" });
      }
 
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

//   useEffect(()=>{
//     if(user){
//         navigate("/");
//     }
// },[])

  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form
        onSubmit={loginHandler}
        className="shadow-lg flex flex-col gap-5 p-8"
      >
        <div>
          <h1 className="text-center font-bold text-xl">Socio Hub</h1>
          <p className="text-sm text-center">
            Login to see photos and videos from your friends
          </p>
        </div>
        <div>
          <Label className="font-medium">Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div>
          <Label className="font-medium">Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        {loading ? (
          <Button>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait...
          </Button>
        ) : (
          <Button type="submit">Login</Button>
        )}

        <span className="text-center">
          Don&apos;t have an account?{" "}
          <Link to={"/signup"} className="text-blue-600">
            Signup
          </Link>{" "}
        </span>
      </form>
    </div>
  );
};

export default Login;




// ======================= Source Code ============================


// const Login = () => {
//   const [input, setInput] = useState({
//       email: "",
//       password: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const {user} = useSelector(store=>store.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const changeEventHandler = (e) => {
//       setInput({ ...input, [e.target.name]: e.target.value });
//   }

//   const signupHandler = async (e) => {
//       e.preventDefault();
//       try {
//           setLoading(true);
//           const res = await axios.post("http://localhost:5500/api/v1/users/login", input, {
//               headers: {
//                   'Content-Type': 'application/json'
//               },
//               withCredentials: true
//           });
//           if (res.data.success) {
//               dispatch(setAuthUser(res.data.user));
//               navigate("/");
//               toast.success(res.data.message);
//               setInput({
//                   email: "",
//                   password: ""
//               });
//           }
//       } catch (error) {
//           console.log(error);
//           toast.error(error.response.data.message);
//       } finally {
//           setLoading(false);
//       }
//   }

//   useEffect(()=>{
//       if(user){
//           navigate("/");
//       }
//   },[])
//   return (
//       <div className='flex items-center w-screen h-screen justify-center'>
//           <form onSubmit={signupHandler} className='shadow-lg flex flex-col gap-5 p-8'>
//               <div className='my-4'>
//                   <h1 className='text-center font-bold text-xl'>LOGO</h1>
//                   <p className='text-sm text-center'>Login to see photos & videos from your friends</p>
//               </div>
//               <div>
//                   <span className='font-medium'>Email</span>
//                   <Input
//                       type="email"
//                       name="email"
//                       value={input.email}
//                       onChange={changeEventHandler}
//                       className="focus-visible:ring-transparent my-2"
//                   />
//               </div>
//               <div>
//                   <span className='font-medium'>Password</span>
//                   <Input
//                       type="password"
//                       name="password"
//                       value={input.password}
//                       onChange={changeEventHandler}
//                       className="focus-visible:ring-transparent my-2"
//                   />
//               </div>
//               {
//                   loading ? (
//                       <Button>
//                           <Loader2 className='mr-2 h-4 w-4 animate-spin' />
//                           Please wait
//                       </Button>
//                   ) : (
//                       <Button type='submit'>Login</Button>
//                   )
//               }

//               <span className='text-center'>Dosent have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
//           </form>
//       </div>
//   )
// }

// export default Login