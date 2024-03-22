import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
    name: 'nav',
    initialState: { isOpen: true },
    reducers: {
        toggle(state, action) {
            state.isOpen = !state.isOpen;
        }
    }
});

export const { toggle } = navSlice.actions;
export default navSlice.reducer;
