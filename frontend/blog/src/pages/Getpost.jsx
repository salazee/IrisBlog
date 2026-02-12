import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid"; 
import API from "../services/Api";
import LikeButton from "./Likes";

export default function Getpost() {
    
         const [posts, setPosts] = useState([]);
         const [loading, setLoading] = useState(true);
         const navigate = useNavigate();

         const handleDelete = async (id) => {
          if (!window.confirm("Are you sure you want to delete this post?")) return;  
          try {
            await API.delete(`/post/deletePost/${id}`);
            setPosts(posts.filter(post => post._id !== id));
            toast.success("Post deleted successfully!");
          } catch (error) {
            console.error("Delete error:", error);  
            toast.error("Failed to delete post.");
          }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
          const res = await API.get("/post/get");   
            const data = res.data.getpost || res.data;
          return setPosts(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Failed to fetch posts:", error);
          toast.error("Failed to fetch posts. Please try again.");
          setPosts([]);
        } finally {
          setLoading(false);
        }
      };

      if(loading) {
        return(
          <div className="flex justify-center item center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-darkpurple"></div>
          </div>
        )
      }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
          {posts.length === 0 ? (
            <p className="  text-center text-gray-500">No posts yet</p>
          ) : (
            posts.map((post) => (
              <div key={post._id} className=" bg-purple-200 p-4 border border-gray-200 rounded-xl mb-4">
                <h2 className="text-xl text-shadow-darkpurple font-bold">{post.title}</h2>
                <p className="mt-2">{post.content}</p>
                <p className="mt-1"><strong>Author:</strong> {post.author}</p>
                <p className="mt-1"><strong>Created At:</strong> {new Date(post.createdAt).toLocaleString()}</p>
                <div className="flex justify-end gap-3">
                <LikeButton postId={post._id}  likesCount={post.likesCount ||0} />
               < TrashIcon  className="h-5 w-5 text-red-500 cursor-pointer" onClick={() => handleDelete(post._id)} />
               <PencilSquareIcon className="h-5 w-5 text-blue-500 cursor-pointer" onClick={() => navigate(`/edit/${post._id}`)} />  

                </div>
              </div>
             
            ))
          )}
          </div>
    )
  }