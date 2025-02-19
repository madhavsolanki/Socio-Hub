import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        suggestedUsers:[],
        userProfile:null,
        selectedUser:null,
    },
    reducers:{
        // actions
        setAuthUser:(state,action) => {
            state.user = action.payload;
        },
        setSuggestedUsers:(state,action) => {
            state.suggestedUsers = action.payload;
        },
        setUserProfile:(state,action) => {
            state.userProfile = action.payload;
        },
        setSelectedUser:(state,action) => {
            state.selectedUser = action.payload;
        }
    }
});
export const {
    setAuthUser, 
    setSuggestedUsers, 
    setUserProfile,
    setSelectedUser,
} = authSlice.actions;
export default authSlice.reducer;




// ============================= AI Code  ==================================

// authSlice.js
// import { createSlice } from "@reduxjs/toolkit";


// const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem('authState');
//     if (serializedState === null) {
//       return {
//         user: null,
//         isAuthenticated: false,
//         token: null,

//         suggestedUsers: [],  // Added suggestedUsers to initial state
        
//         userProfile: null, // Added userProfile to initial state
      
//       };
//     }
//     return JSON.parse(serializedState);
//   } catch (err) {
//     console.error("Error loading state", err);
//     return {
//       user: null,
//       isAuthenticated: false,
//       token: null,

//       suggestedUsers: [], // Ensure default value on error
    
//       userProfile: null, // Added userProfile to initial state
//     };
//   }
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState: loadState(),
//   reducers: {
//     setAuthUser: (state, action) => {
//       state.user = action.payload.data;
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
//       // Save to localStorage
//       localStorage.setItem('authState', JSON.stringify(state));
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;

//       state.suggestedUsers = []; // Clear suggested users on logout

//       state.userProfile = null; // Clear userProfile on logout

//       // Clear localStorage
//       localStorage.removeItem('authState');
//     },
//     setSuggestedUsers: (state, action) => {
//       state.suggestedUsers = action.payload;
//       // Save updated state to localStorage
//       localStorage.setItem('authState', JSON.stringify(state));
//     },

//     setUserProfile: (state, action) => {
//       state.userProfile = action.payload;
//       // Save updated state to localStorage
//       localStorage.setItem('authState', JSON.stringify(state));
//     },
//   }
// });
// export const { setAuthUser, logout,  setSuggestedUsers , setUserProfile } = authSlice.actions;
// export default authSlice.reducer;