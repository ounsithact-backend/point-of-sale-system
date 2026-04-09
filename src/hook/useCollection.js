import { useState } from "react"
import { api } from "../config/api"
import toast from "react-hot-toast"


export  const useCollection =(collection)=>{

    const [isLoading,setIsLoading]=useState(false)

    const create = async (data)=>{
        try {
           setIsLoading(true)

            const res= await api.post(`/api/${collection}`,data)
            if(res.data?.success){
                return res.data
            }
        } catch (error) {
            toast.error(error.response?.data.error || "server error")
        }finally{
            setIsLoading(false)
        }
    }
    const update= async (data,id)=>{
        try {
            setIsLoading(true)
            const res= await api.patch(`/api/${collection}/${id}`,data)
            if(res.data?.success){
                return res.data
            }
        } catch (error) {
            toast.error(error.response?.data.error || "server error")
        }finally{
            setIsLoading(false)
        }
    }
    
    const remove =async (id)=>{
        try {
            setIsLoading(true)

            const res= await api.delete(`/api/${collection}/${id}`)
            if(res.data?.success){
                return res.data
            }

        } catch (error) {
            toast.error(error.response?.data.error || "server error")
        }finally{
            setIsLoading(false)
        }
    }

    return{
        isLoading,
        create,
        update,
        remove
    }
}