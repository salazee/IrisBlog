// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import AuthorPosts from './pages/getbyauthor';
import CreatePost from './pages/Create';
import EditPost from './pages/EditPost';
import Homepage from "./pages/HomePage"
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login'; 
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';  
import Navbar from './pages/Nav';
import Profile from './pages/Profile';
import SinglePost from './pages/PostDetails';
import GetAllPosts from './pages/Getpost';
// import toggleLike from "./pages/Likes";



function App() {
  
  return (
    <div  >
        <Navbar />
    
    
      <Routes>
      <Route path='/' element = {<Homepage/>} />
        <Route path='/register' element={<Register/>} />
        

        <Route path='/auth/verifyemail' element={<VerifyEmail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/auth/forgetpassword' element={<ForgetPassword />} />
        <Route path='/auth/resetpassword/:token' element={<ResetPassword />} />
       
        <Route path="/create" element={<CreatePost />} />
        <Route path="/get" element={<GetAllPosts />} />
        {/* <Route path="/getById/:id" element={<SinglePost />} /> */}
        <Route path="/updatePost/:id" element={<EditPost />} />
        <Route path="/getByAuthor/:author" element={<AuthorPosts/>}/> 
        <Route path='/profile' element={<Profile/>} />
    <Route path="/post/:id" element={<SinglePost />} />
   
      </Routes>
  <ToastContainer position='top-right'/>

    </div>
  );
}

export default App;