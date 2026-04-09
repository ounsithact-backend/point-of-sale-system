import React from 'react'

function Modal({open,onClose,title,children}) {
  return (
    <>
        <div className={` fixed inset-0 justify-center flex items-center z-999 transition-all  backdrop-blur-sm duration-300  ${open ? "visible" :"invisible"}`}>
                <div className={` p-6 bg-white rounded-md transition-all  shadow-lg w-75 border border-gray-500 relative ${open ? "scale-125 opacity-100" :"scale-0 opacity-0"}`}>
                       <div className=' flex justify-between relative items-center'>
                            <h1 className=' font-semibold'>{title || ""}</h1>
                            <button onClick={onClose} className=' cursor-pointer text-red-400 font-semibold hover:text-gray-500 '>
                              x
                            </button>
                       </div>
                       <div className='my-2'>
                              {children}
                       </div>
                </div>
        </div>
    </>
  )
}

export default Modal
