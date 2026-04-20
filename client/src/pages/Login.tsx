import { useState } from "react";
import axios from "axios";
const Login = () =>{
    const [form, setForm] = useState({
        email: "",
        password: "",
      });
    const handleChange = (e: any)=>{
        setForm({...form, [e.target.name]:e.target.value});
    } 
    const handleSubmit = async (e: any) =>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/auth/login", form)
            localStorage.setItem("token", res.data.token);
            console.log(res.data);
            
            alert("login Successfull!")
        } catch (err:any) {
            alert(err.response?.data?.message || "Error");
        }
    } 

return(
    <div className="flex justify-center mt-20">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input
          name="email"
          placeholder="Email"
          className="border p-2"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2"
          onChange={handleChange}
        />
        <button className="bg-blue-500 text-white p-2">
          Login
        </button>
      </form>
    </div>

);
}
export default Login;