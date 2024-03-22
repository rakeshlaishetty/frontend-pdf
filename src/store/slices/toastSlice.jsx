import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name:'toast',
    initialState:  {
        message: null,
        boolean: false,
        icon:null,
    },
    reducers: {
        ShowToast(state, action) {
            const { message, boolean,icon="info" } = action.payload;
            return {
                ...state,
                message,
                boolean,
                icon
            };
        },
        

    }
});

export const { ShowToast } = toastSlice.actions;
export default toastSlice.reducer;
