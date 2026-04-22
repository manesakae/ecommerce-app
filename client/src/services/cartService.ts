import axios from "axios";
export const syncCart = async (items: any[]) => {
    const token = localStorage.getItem("token");

    return axios.post("http://localhost:5001/api/cart", { items }, {
        headers: { Authorization: `Bearer ${token}` }
    })
}


export const fetchCart = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:5001/api/cart", {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data;
}