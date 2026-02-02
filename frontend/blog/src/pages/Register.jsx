import { useState } from "react";
import { toast } from "react-toastify";
import API from "../services/Api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role:"reader",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        await API.post(`/auth/register`,
          formData
        );
        toast.success("register successfully")
      navigate("/auth/verifyemail");
    } catch (error) {
      console.error("Registration Error:", error);
        toast.error("Registration failed: " + error.message)
    }
    console.log("Form submitted successfully");
    // TODO: Send formData to your backend API
  };
 
  return (
    <form onSubmit={handleSubmit} className="m-auto  shadow-md rounded-2xl w-[50vw] h-[50vh] ">
      <div className="flex flex-col justify-center items-center mb-8 max-w-[400px] mx-auto ">
       <div className="flex flex-col">
      <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className=" border-2 p-2 w-[30vw] mb-3"
        />
        
      </div> 
<div className="flex flex-col
 rounded">
     
        
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className=" border-2 p-2 w-[30vw] mb-3"
        />
      </div>
<div className="flex flex-col ">
       <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border-2 p-2 w-[30vw] mb-3  "
        />
        
      </div>
<div className="flex flex-col ">
  
        <label htmlFor="password">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-[30vw] p-2 border-2 mb-3"
        />
</div>
<div className="flex flex-col">
  <label htmlFor="role">Role:</label>
  <select name="role"
  id="role"
  value={formData.role}
  onChange={handleChange}
   className="w-full p-2 mb-3 border-4">
    <option value="reader">Reader</option>
    <option value='editor'> Editor</option>  </select>
</div>
      </div>
  <div className="text-center ">
      <button type="submit"
      navigate="/login"
      disabled={false} className="bg-midnightpurple text-white p-3 rounded-md w-52 "> Register</button>
  </div>
    </form>
  );
}