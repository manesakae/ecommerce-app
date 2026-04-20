import axios from "axios";

export const fetchProducts = async (params: any) => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5001/api/products", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: params
    });
    return res.data;
};