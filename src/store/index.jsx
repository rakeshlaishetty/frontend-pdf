import { configureStore } from "@reduxjs/toolkit";
import navSlice from "./slices/navSlice";

const store = configureStore({
    reducer:{
        navbar:navSlice
    }
})


export default store