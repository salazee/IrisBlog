// src/pages/CreatePost.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/Api';
import {toast} from "react-toastify"

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/post/create', { title, content, author });
      alert('Post created!');
      navigate('/');
    } catch  {
      toast.info("please Login!");
      navigate('/login')
      // toast.error("Error creating Post. Check the Parameters and try again",error)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto md:max-w-[90%]">
      <h2 className="text-2xl mb-4">Create New Post</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
        <div className="mb-3">
        <textarea
          placeholder="Content"
          className="w-full p-2 border rounded h-32"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Author"
          className="w-full p-2 border rounded"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
    
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Publish
      </button>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="ml-2 text-gray-600"
      >
        Cancel
      </button>
    </form>
  );
}