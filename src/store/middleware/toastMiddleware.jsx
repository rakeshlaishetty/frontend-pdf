import { ShowToast } from '../slices/toastSlice';

const toastMiddleware = store => next => action => {
  console.log(store.getState(),"GETDATA")
  const { toastdata } = store.getState();
  
  // Check if the boolean is true and there's a message
  if (toastdata.boolean && toastdata.message) {
    setTimeout(() => {
      store.dispatch(ShowToast({ message: null, boolean: false }));
    }, 5000); // Set timeout for 5 seconds (adjust as needed)
  }

  return next(action);
};

export default toastMiddleware;
