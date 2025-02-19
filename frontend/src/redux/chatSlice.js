import { createSlice } from "@reduxjs/toolkit";

// const chattSlice = createSlice({
//   name:"chat",
//   initialState:{
//     onlineUsers:[],
//     messages:[],
//   },
//   reducers:{
//     setOnlineUsers:(state, action) => {
//       state.onlineUsers = action.payload;
//     },
//     setMessages:(state, action) => {
//       state.messages = action.payload;
//     }
//   }
// });

// export const { setOnlineUsers, setMessages } = chattSlice.actions;
// export default chattSlice.reducer;



// ================================= AI Code ==================================

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    onlineUsers: [],
    messages: [],
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setMessages: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.messages = action.payload;
      } else if (action.payload && typeof action.payload === "object") {
        state.messages = [...state.messages, action.payload]; // Append single message
      } else {
        console.error("Invalid messages payload:", action.payload);
        state.messages = []; // Fallback to an empty array
      }
    },
  },
});

export const { setOnlineUsers, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
