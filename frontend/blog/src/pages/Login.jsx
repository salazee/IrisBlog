import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/Api"

 export default function Login() {
    const navigate = useNavigate();
 
    const [formData, setFormData] = useState({
        email:"",
        password:"",
    }); 

    const handleChange =(e)=> {
        const{name,value} =e.target;
        setFormData((prev) => ({
            ...prev, [name]:value,
        }));
    };


const handleSubmit = async(e) =>{
    e.preventDefault();
  
    try {
        const res = await API.post(`/auth/login`, formData);

          localStorage.setItem("token", res.data.token)
       
        toast.success("Login successfully");
        navigate("/get");
    } catch (error) {
        console.error("Login Error:", error);
     toast.error(error.response?.data?.message || "Login failed");}
};
return(
    <>
<form onSubmit={handleSubmit} className="w-[50vw] h-[40vh]  mx-auto shadow-md my-3.5">
    <div  className="m-auto max-w-[70%] rounded-2xl p-5 items-center">
<div className="flex flex-col">
    <label htmlFor="email">Email:</label>
    <input
    type="email"
    id="email"
    name="email"
    onChange={handleChange} 
    required
    value={formData.email}
    className="mb-3 p-2 border-2 rounded-md cursor-pointer "
    />
</div>
<div className="flex flex-col">
    <label htmlFor="password">Password:</label>
    <input type="password"
    id="password"
    name="password"
    autoComplete="currentPassword"
    onChange={handleChange} 
    required
    value={formData.password}
    className=" p-2 border-2 rounded-md cursor-pointer mb-8"
    />
    
</div >
 <div className="text-center]">
    <button 
type="submit" 
className="bg-midnightpurple p-3 mt-3 w-52  text-white text-2xl rounded "
>Login</button>
 </div>
    </div>
   
</form>
    </>
)

 }
 