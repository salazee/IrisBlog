import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/Api";
import { toast } from "react-toastify";
import LikeButton from "../pages/Likes";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await API.get("/post/get");
      // Normalize response: support both res.data.getpost and res.data
      const data = res.data.getpost || res.data;
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      toast.error("Failed to fetch posts. Please try again.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await API.delete(`/post/deletePost/${id}`);
      setPosts(posts.filter(post => post._id !== id));
      toast.success("Post deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      if (error.response?.status === 401) {
        toast.error("Please login to delete posts.");
        navigate("/login");
      } else {
        toast.error("Failed to delete post.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.info("Logged out successfully.");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Iris Blog
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Discover amazing stories and share your thoughts
          </p>

          {isLoggedIn && (
            <Link
              to="/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold shadow-md hover:shadow-lg"
            >
              <PencilSquareIcon className="w-5 h-5" />
              Create New Post
            </Link>
          )}
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="p-4 rounded-2xl mb-5 bg-purple-100 mx-auto"
            >
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="mt-2 text-gray-700">{post.content}</p>
              <p className="mt-2">
                <strong>Author:</strong> <i>{post.author}</i>
              </p>
              {/* <p className="mt-1">
                <strong>Likes: {post.toggleLike}</strong>
              </p> */}
              <div className="flex justify-end gap-3 mt-3">
                <LikeButton postId={post._id} likesCount={post.likesCount||0} />
                <TrashIcon
                  className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => handleDelete(post._id)}
                />
                <PencilSquareIcon
                  className="h-6 w-6 text--600 cursor-pointer hover:text-purple-800"
                  onClick={() => navigate(`/updatePost/${post._id}`)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={handleLogout}
          className="w-52 bg-purple-800 rounded-2xl p-2 text-white hover:bg-purple-900 transition"
        >
          Log out
        </button>
      </div>
    </>
  );
}