import { ToastContainer } from 'react-toastify'

import './Toastify.css'

interface Props {
  mode: 'simple' | 'popup'
}

const Toastify = ({ mode }: Props) => {
  return (
    <>
      <ToastContainer
        className={mode === 'simple' ? 'simple' : ''}
        position={mode === 'popup' ? 'top-center' : 'bottom-center'}
        // autoClose={mode === 'popup' ? false : 4000}
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

export default Toastify
