import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

export const Toast: React.FC<{ message: string }> = ({ message }) => (
  <div style={{ fontSize: '16px', padding: '8px' }}>
    {message}
  </div>
);

export function ConfiguredToastContainer() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
