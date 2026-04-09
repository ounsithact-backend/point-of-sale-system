import React from 'react'
import useCurrent from '../auth/useCurrent'
import { Navigate } from 'react-router-dom'

function Protected({ allowedRole, children }) {
    const { data, isLoading } = useCurrent()
    if (isLoading) {
        return (
           <div className=' min-h-screen flex h-full justify-center items-center'>
               <span className="loading loading-spinner loading-xl"></span>
           </div>
         
            
        )
    }
    if(allowedRole.includes(data?.role)){
        return children
    }else{
        return <Navigate to="/signin"/>
    }
}

export default Protected
