// Toast.js

import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToast = ({
  position = 'top-right',
  autoClose = 3000,
  hideProgressBar = false,
  newestOnTop = false,
  closeOnClick = true,
  rtl = false,
  pauseOnFocusLoss = true,
  draggable = true,
  pauseOnHover = true,
}) => {
  return (
    <ToastContainer
      position={position} 
      autoClose={autoClose}
      hideProgressBar={hideProgressBar}
      newestOnTop={newestOnTop}
      closeOnClick={closeOnClick}
      rtl={rtl}
      pauseOnFocusLoss={pauseOnFocusLoss}
      draggable={draggable}
      pauseOnHover={pauseOnHover}
      theme={"light"}
    />
  );
}; 

export const showToast = (message, type = 'success', onCloseCallback = null) => {
    const options = {
      onClose: onCloseCallback, // Callback to trigger after toast closes
      autoClose: 5000 // Auto close after 5 seconds
    };
  
    switch (type) {
      case 'success':
        toast.success(message, options);
        break;
      case 'error':
        toast.error(message, options);
        break;
      case 'warning':
        toast.warning(message, options);
        break;
      case 'info':
        toast.info(message, options);
        break;
      default:
        toast(message, options);
        break;
    }
  };

export default CustomToast;
