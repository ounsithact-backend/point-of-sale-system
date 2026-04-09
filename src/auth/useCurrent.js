import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { api } from "../config/api"


const useCurrent = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [data,setData]=useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const res = await api.get("/api/auth/me")
                if(res.data?.success){
                    setData(res.data?.result)
                }

            } catch (error) {
                toast.error(error.response?.data.error)
                console.log(error.response?.data.error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    },[])

    return {
        isLoading,
        data
    }
}
export default useCurrent