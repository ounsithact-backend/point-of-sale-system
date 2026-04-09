import toast from "react-hot-toast"
import { useState } from "react"
import { api } from "../config/api"

export const useAddPaymentPurchase = () => {
    const [isLoading, setIsLoading] = useState(false)

    const addPayment = async (id, data) => {
        setIsLoading(true) 
        try {
            const res = await api.patch(`/api/purchase/addPayment/${id}`, data)
            
            if (res.data?.success) {
                toast.success("ការបង់ប្រាក់ទទួលបានជោគជ័យ!")
                return res.data?.result
            }
        } catch (error) {
         
            toast.error(error?.response?.data?.error || "Server Error")
        } finally {
            setIsLoading(false) 
        }
    }

    return { addPayment, isLoading }
}