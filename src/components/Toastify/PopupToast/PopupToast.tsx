import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const PopupToast = () => {
  return (
    <>
      <ToastContainer
        className="custom-toast-container"
        position="top-center"
        autoClose={false}
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

export default PopupToast
