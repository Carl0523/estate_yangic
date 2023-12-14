// import { createSlice } from "@reduxjs/toolkit";

// // We need a name, initial state, and reducer functions (object) for slice creation

// /**
//  * Initial State for the auth slice: get state from the local storage
//  * If the value is valid, set initial state to the value
//  * Otherwise, set initial state to null
//  */
// const initialState = localStorage.getItem("userInfo")
//   ? {userInfo: JSON.parse(localStorage.getItem("userInfo"))}
//   : {userInfo: null};

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         setCredentials: (state, action) => {
//             state.userInfo = action.payload;
//             localStorage.setItem('userInfo', JSON.stringify(action.payload));
//         },
//         logout: (state, action) => {
//             state.userInfo = null;
//             localStorage.removeItem('userInfo');
//         }
//     }
// })

// export const {setCredentials, logout} = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("userInfo")
  ? { userInfo: JSON.parse(localStorage.getItem("userInfo")) }
  : { userInfo: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
        state.userInfo = null;
        localStorage.removeItem("userInfo");
    }
  },
});

export const { signInSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
