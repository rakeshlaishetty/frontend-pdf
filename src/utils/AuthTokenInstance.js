import store from "../store/index"
import instance from './axiosConfig';


instance.interceptors.request.use(
    (config) => {
      console.log(store.getState().userData.token,"store.getState().userData.token")
      let Token = store.getState().userData.token
     
      if (Token) {
        config.headers.Authorization = `Bearer ${Token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default instance