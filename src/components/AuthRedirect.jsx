import React from 'react'
import useCurrent from '../auth/useCurrent'
import { Navigate } from 'react-router-dom'

function AuthRedirect({ children }) {
    const { data, isLoading } = useCurrent()
    if (isLoading) {
        return (
            <div className=' min-h-screen flex h-full justify-center items-center'>
                <span className="loading loading-spinner loading-xl"></span>
            </div>


        )
    }
    if (data && isLoading == false) {

        if (data?.role === "super" || data?.role === "admin") {
            return <Navigate to="/" />
        } else if (data.role === "cashier") {
            return <Navigate to="/cashier/pos"/>
        }else{
            return <Navigate to="/authrization"/>
        }

    } else {
        return children
    }
}

export default AuthRedirect
