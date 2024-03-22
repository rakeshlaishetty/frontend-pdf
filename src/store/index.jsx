import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import navSlice from "./slices/navSlice";
import userSlice from "./slices/userSlice";
import toastSlice from "./slices/toastSlice";
import toastMiddleware from './middleware/toastMiddleware'

const store = configureStore({
    reducer:{
        navbar:navSlice,
        userData:userSlice,
        toastdata:toastSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(toastMiddleware)
    // middleware: [...getDefaultMiddleware(), toastMiddleware],
})


export default store