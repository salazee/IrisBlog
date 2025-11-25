// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import AuthorPosts from './pages/getbyauthor';
import CreatePost from './pages/create';
import EditPost from './pages/EditPost';
import Homepage from "./pages/HomePage"
import { ToastContainer } from 'react-toastify';
import Login from './pages/login'; 
import Register from './pages/register';
import Navbar from './pages/Nav';
import Profile from './pages/Profile';

// import SinglePost from './pages/PostDetails';
// import toggleLike from "./pages/Likes";



function App() {
  
  return (
    <div  >
        <Navbar />
    
    
      <Routes>
       
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element = {<Homepage/>} />
        <Route path="/create" element={<CreatePost />} />
        {/* <Route path="/getById/:id" element={<SinglePost />} /> */}
        <Route path="/updatePost/:id" element={<EditPost />} />
        <Route path="/getByAuthor/:author" element={<AuthorPosts/>}/> 
        <Route path='/profile' element={<Profile/>} />
    
   
      </Routes>
  <ToastContainer position='top-right'/>

    </div>
  );
}

export default App;