import { createSlice } from "@reduxjs/toolkit";

const userData = localStorage.getItem('user')
const userSlice = createSlice({
    name:'user',
    initialState: userData  ? JSON.parse(userData) :  {
        user: null,
        token: null
    },
    reducers: {
        adduserDetailsWithJwt(state, action) {
            const { user, token } = action.payload;
            return {
                ...state,
                user,
                token
            };
        },
        logoutUser(state, action) {
            localStorage.clear()
            return { user: null, token: null };
        }

    }
});

export const { adduserDetailsWithJwt,logoutUser } = userSlice.actions;
export default userSlice.reducer;
