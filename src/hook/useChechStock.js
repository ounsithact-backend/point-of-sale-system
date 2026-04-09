import toast from "react-hot-toast";
import { useState } from "react";
import { api } from "../config/api";

export const useCheckStock = () => {
  const [isLoading, setIsLoading] = useState(false);

  const checkStock = async (product, stock) => {
    try {
      setIsLoading(true);
      const res = await api.get(`/api/sale/checkStock?product=${product}&stock=${stock}`);
      
      if (res.data?.success) {
        return res.data;
      }
    } catch (error) {
      toast.error(error.message || "Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return { checkStock, isLoading };
};