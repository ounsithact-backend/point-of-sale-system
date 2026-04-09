import { useState } from "react"

import toast from "react-hot-toast"
import { api } from "../config/api"


const useSignout= ()=>{
    const [isLoading,setIsLoading]=useState(false)

        const signout= async()=>{
            try {
                setIsLoading(true)
                const res= await api.get("/api/auth/signout")
                return res.data

            } catch (error) {
                toast.error(error.response?.data.error)
                console.log(error.response?.data.error)
            }finally{
                setIsLoading(false)
            }
        }

        return{
            isLoading,
            signout
        }
}
export default useSignout 