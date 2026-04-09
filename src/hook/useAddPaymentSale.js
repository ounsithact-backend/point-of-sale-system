import toast from "react-hot-toast"
import { useState } from "react"
import { api } from "../config/api"

export const useAddPaymentSale = () => {
    const [isLoading, setIsLoading] = useState(false)
    const addPayment = async (id, data) => {
        try {
            setIsLoading(true)
            const res = await api.patch(`/api/sale/addPayment/${id}`, data)
            if (res.data?.success) {
                return res.data?.result
            }
        } catch (error) {
            toast.error(error?.response?.data?.error || "Server Error!")
        } finally {
            setIsLoading(false)
        }
    }

    return {
        addPayment,
        isLoading
    }
}