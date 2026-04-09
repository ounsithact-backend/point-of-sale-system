import toast from "react-hot-toast";
import { useState } from "react";
import { api } from "../config/api";


export const useStorage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const uploadFile = async (file) => {

        try {

            setIsLoading(true)
            const formData = new FormData();
            formData.append("image", file);

            const res = await api.post("/api/upload", formData);

            if (res.data?.success) {
                return res.data;
            }
        } catch (error) {
            toast.error(error?.response?.data?.error || "Upload failed");
        } finally {
            setIsLoading(false)
        }

    };

    const removeFile = async (imageUrl) => {
        
        try {
            setIsLoading(true)
            const res = await api.delete(`/api/upload${imageUrl}`);

            if (res.data?.success) {
                return res.data;
            }
        } catch (error) {
            toast.error(error?.response?.data?.error || "Faileds");
        } finally {
            setIsLoading(false)
        }
    };
    return {
        uploadFile,
        removeFile,
        isLoading
    }

};