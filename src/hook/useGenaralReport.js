import { useEffect, useState } from "react";
import { api } from "../config/api";

export const useGenaralReport=()=>{
    
      const [data, setData] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
       
      useEffect(() => {
        const fetchData = async () => {
          try {
            setIsLoading(true);
           
            const res = await api.get(`/api/report/genaral`);
            if(res.data?.success){
                setData(res.data?.result);
               
            }
            
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setIsLoading(false);
          }
        };
        fetchData();
      }, []);
    
      return {
        data,
        isLoading,
      };
}