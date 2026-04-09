import { useState } from "react"
import { api } from "../config/api"
import toast from "react-hot-toast"

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false)


    const signup = async (data) => {
        setIsLoading(true)
        try {
            const res= await api.post("/api/auth/signup",data)
            if(res.data.success){
                return res.data
            }
        } catch (error) {
            toast.error(error?.response?.data?.error)
        }finally{
            setIsLoading(false)
        }
    }
    return{
        signup,
        isLoading
    }

}