import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './Toastify.css'

const Toastify = () => {
  return (
    <>
      <ToastContainer
        position={'bottom-center'}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default Toastify
