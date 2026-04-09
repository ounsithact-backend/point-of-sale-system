
import { useState } from "react"
import { api } from "../config/api"
import toast from "react-hot-toast"


export const useSignin = () => {

    const [isLoading, setIsLoading] = useState(false)

    const signin = async (email, password) => {
        try {
            setIsLoading(true)
            const res = await api.post('/api/auth/signin', { email, password })
            return res.data
        } catch (error) {
           
            const message = error.response?.data?.error;
            toast.error(message);
            console.log( error.response?.data);

        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        signin
    }

}