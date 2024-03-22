import React, { useEffect, useRef } from 'react';
import Swal from 'sweetalert2';

const useToast = ({ title = null, icon = null, timer = null, position, autoClose = true, }) => {
  const toastRef = useRef(null);

  useEffect(() => {
    const Toast = Swal.mixin({
      toast: true,
      position: position || 'top-end',
      showConfirmButton: false,
      timer: timer || 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toastRef.current = toast;
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
      onClose: () => {
        if (toastRef.current) {
          toastRef.current.removeEventListener('mouseenter', Swal.stopTimer);
          toastRef.current.removeEventListener('mouseleave', Swal.resumeTimer);
        }
      }
    });

    Toast.fire({
      title: title || '',
      icon: icon || 'success',
      timer: timer || 3000,
      showConfirmButton: false,
      position: position || 'top-end',
      timerProgressBar: true
    });

    if (autoClose) {
      setTimeout(() => {
        Swal.close();
      }, timer || 3000);
    }
  }, [title, icon, timer, position, autoClose]);

  return null;
};

const CustomToast = (props) => {
  useToast(props);
  return null;
};

export default CustomToast;
