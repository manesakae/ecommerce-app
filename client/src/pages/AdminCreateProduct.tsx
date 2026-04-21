import { useState } from "react";
import axios from "axios";

const AdminCreateProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5001/api/products",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
      alert("Product created!");
    } catch (err: any) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input name="name" placeholder="Name" className="border p-2" onChange={handleChange} />
        <input name="price" placeholder="Price" className="border p-2" onChange={handleChange} />
        <input name="category" placeholder="Category" className="border p-2" onChange={handleChange} />
        <textarea name="description" placeholder="Description" className="border p-2" onChange={handleChange} />

        <button className="bg-black text-white p-2">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default AdminCreateProduct;