// src/pages/EditPost.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/Api';
import { toast } from 'react-toastify';

export default function EditPost() {
 const [editPost, setEditPost]= useState({
  title:"",
content:"",
author: "" });
  // const [loading, setLoading] = useState(true);
  const { id} = useParams();
  const navigate = useNavigate();


 
  // ✅ Fetch the post data when component mounts
  useEffect(() => {
    const loadPost = async () => {
      // setLoading(true);
      try {
       
        const res = await API.get(`/post/getById/${id}`);
       setEditPost(res.data.post)

      } catch (error) {
        console.error('Failed to load post:', error);
        toast.error('Failed to load post.');
        navigate('/'); // Redirect to homepage on error
      }
      finally{
        // setLoading(false);
      }
    };
     loadPost();
  }, [id]);

   const handleChange = (e) => {
    setEditPost({
      ...editPost, [e.target.name]:e.target.value
   
   });
  
  }
  

  // ✅ Handle form submission for updating post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postUpdate =({
      author:editPost.author,
      title:editPost.title,
      content:editPost.content
    })


    try {
      await API.put(`/post/updatePost/${id}`, postUpdate);
      toast.success('Post updated successfully!');
      navigate(`/`); // Redirect to homepage or any route you want
    } catch  {
      // toast.error('Error updating post:', error);
      toast.info('Failed to update post, Please login.');
      
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow rounded-lg mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-midnightpurple">Edit Post</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter post title"
          className="w-full p-2 border border-gray-300 rounded"
          value={editPost.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Author</label>
        <input
          type="text"
          name="author"
          placeholder="Enter author name"
          className="w-full p-2 border border-gray-300 rounded"
          value={editPost.author}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Content</label>
        <textarea
          name="content"
          placeholder="Write your content here..."
          className="w-full p-2 border border-gray-300 rounded h-32"
          value={editPost.content}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="bg-midnightpurple text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-midnightpurple hover:text-purple-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
