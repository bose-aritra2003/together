'use client';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const ToasterContext = () => {
  return (
    <ToastContainer limit={5} />
  );
}
export default ToasterContext;