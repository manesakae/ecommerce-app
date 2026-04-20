import {useState} from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";

const Register = ()=>{
    const [form, setForm] = useState({
        name:"", email: "", password:""
    });
    const navigate = useNavigate();

    const handleChange = (e:any) =>{
        setForm({...form, [e.target.name]: e.target.value});
    };
    const handleSubmit = async (e:any) =>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/auth/register", form);
            console.log("User created:"+ res.data);
            alert("Registration successful!");
            navigate("/login");
        } catch (err:any) {
            console.log(err.response.data);
            alert(err.response.data.message);
            
        }
    };
    return (
        
        <div className="flex justify-center mt-20">
            <form onSubmit={handleSubmit}  className="flex flex-col gap-4 w-80">
            <h1 className="text-3xl font-bold text-blue-500"> E-Commerce App 🚀</h1>
                <input name="name"
                placeholder="Name"
                className="border p-2"
                onChange={handleChange}
                />
                <input name="email"
                 placeholder="Email"
                 className="border p-2"
                 onChange={handleChange}
                 />
                <input name="password"
                 placeholder="Password"
                 className="border p-2"
                 onChange={handleChange}
                 />
                 <button className="bg-green-500 text-white p-2">Register</button>
            </form>
        </div>
    )

}

export default Register;