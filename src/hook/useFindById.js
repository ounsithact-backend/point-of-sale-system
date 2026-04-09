import { useState, useEffect } from "react";
import { api } from "../config/api";


export const useFindByid = (collection ,id) => {
 
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
   
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
         if (!id) return  
        const res = await api.get(`/api/${collection}/${id}`);
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
  }, [collection,id]);

  return {
    data,
    isLoading,
  };
};