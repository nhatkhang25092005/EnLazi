import { handleTest } from "../../shared/services/handleResponse"
import { useState,useEffect } from "react"
import axiosClient from "../../api/axiosClient";
export default function Test(){
    useEffect(() => {
    const interval = setInterval(() => {
      axiosClient.get(import.meta.env.VITE_API_BASE_URL)
        .then(res => console.log("Online check:", res))
        .catch(err => console.error("Error:", err));
    }, 45000); // 45 seconds =)

    return () => clearInterval(interval); // Dọn dẹp khi unmount
  }, []);
    return(<>
    </>)
}