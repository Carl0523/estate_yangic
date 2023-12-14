import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    error: null,
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInSuccess: (state, action) => {
            state.userData = action.payload;

            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const {signInStart, signInSuccess, signInFailure} = userSlice.actions;
export default userSlice.reducer;