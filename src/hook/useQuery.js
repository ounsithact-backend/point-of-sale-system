import { useState, useEffect } from "react";
import { api } from "../config/api";


export const useQuery = (collection, search = "", page = 1, limit = 5, refetch = false, condition = "") => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0)


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

      

        const url = `/api/${collection}?search=${search}&page=${page}&limit=${limit}${condition ? `&${condition}` : ""}`;
        const res = await api.get(url);
       


        if (res.data?.success) {
          setData(res.data?.result);
          setTotalPage(res.data?.totalPage)
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search, page, limit, collection, refetch, condition]);

  return {
    data,
    isLoading,
    totalPage
  };
};