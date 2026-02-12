// // src/pages/Profile.jsx
// import { useState, useEffect } from 'react';
// import {  useNavigate } from 'react-router-dom';
// import { User, Mail, Calendar, Edit2, BookOpen } from 'lucide-react';
// import API from '../services/Api';
// import { toast } from 'react-toastify';


// export default function Profile() {
//   const [userPosts, setUserPosts] = useState([]);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // If no user, redirect to login
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
//     if (!userData || !token) {
//       toast.error('Please login to view profile');
//       navigate('/login', {replace:true});
//       return;
//     }
//     try {
//       const parsedUser = JSON.parse(userData);
//       setUser(parsedUser);
//       fetchUserPosts(parsedUser);
//   } catch (error) {
//     console.error("Error parsing user data:", error);
//       toast.error('Invalid session. Please login again.', {error});
//       localStorage.clear();
//       navigate('/login',{replace:true});
//   }
//   }, [navigate]);

//   const fetchUserPosts = async (userData) => {
//     if(!userData || !userData.name) {
//       console.error("No user data provided to fetchUserPosts");
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await API.get(`/post/getByAuthor/${userData.name}`);
//       setUserPosts(response.data.authorpost);
//     } catch (error) {
//       console.error('Error fetching user posts:', error);
//       if (error.response?.status !== 404) {
//         toast.error('Failed to fetch your posts');
//       }
//       setUserPosts([])
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePostDeleted = (deletedPostId) => {
//     setUserPosts(userPosts.filter(post => post._id !== deletedPostId));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//       </div>
//     );
//   }
// if(!user) {
//   return null; // No user data, so return null (no profile to show)
// }
//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       {/* Profile Header Card */}
//       <div className="bg-linear-to-r from-purple-600 to-midnightpurple rounded-lg shadow-lg p-8 mb-8 text-white  ">
//         <div className="flex items-start justify-between">
//           <div>
//             <div className="flex items-center gap-3 mb-4">
//               <div className="bg-white rounded-full p-4">
//                 <User size={32} className="text-purple-600" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold">{user.name}</h1>
//                 <p className="text-purple-100">Editor</p>
//               </div>
//             </div>

//             <div className="space-y-2 text-purple-100">
//               {user.email && (
//                 <div className="flex items-center gap-2">
//                   <Mail size={18} />
//                   <span>{user.email}</span>
//                 </div>
//               )}
//               <div className="flex items-center gap-2">
//                 <Calendar size={18} />
//                 <span>Member since {new Date().getFullYear()}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <BookOpen size={18} />
//                 <span>{userPosts.length} {userPosts.length === 1 ? 'post' : 'posts'} published</span>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={() => navigate('/create-post')}
//             className="bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors font-medium flex items-center gap-2"
//           >
//             <Edit2 size={18} />
//             New Post
//           </button>
//         </div>
//       </div>

//       {/* User's Posts Section */}
//       <div className="mb-4">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Posts</h2>
        
//         {userPosts.length === 0 ? (
//           <div className="bg-white rounded-lg shadow p-12 text-center">
//             <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">
//               No posts yet
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Start sharing your thoughts with the community!
//             </p>
//             <button
//               onClick={() => navigate('/create-post')}
//               className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
//             >
//               Create Your First Post
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {userPosts.map((post) => (
//               <div key={post._id} className="bg-white rounded-lg shadow p-6">
//               <h3 className='text-xl font-bold mb-2'>{post.title}</h3>
//               <p className="text-gray-700 mb-4">{post.content}</p>
//               <div className='flex justify-between items-center'>
//                 <span className="text-sm text-gray-500">
//                   {new Date(post.createdAt).toLocaleDateString()}
//                 </span>
//                 <div className="flex gap-2">
//                   <button
//                   onClick={()=> navigate(`/updatePost/${post._id}`)}
//                     className="text-purple-600 hover:text-purple-800 " 
//                     >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => navigate(`/post/${post._id}`)}
//                     className="text-purple-600 hover:text-purple-800 font-medium"
//                   >
//                     View Details
//                   </button>
//                    <button
//                       onClick={() => handlePostDeleted(post._id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       Delete
//                     </button>
//                 </div>
//                   </button>
//                 </div>
//                 {/* <button
//                   onClick={() => navigate(`/post/${post._id}`)}
//                   className="text-purple-600 hover:text-purple-800 font-medium"
//                 >
//                   View Details
//                 </button> */}
//               </div>
//               <PostCard
//                 key={post._id}
//                 post={post}
//                 onDelete={handlePostDeleted}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Statistics Card */}
//       {userPosts.length > 0 && (
//         <div className="bg-white rounded-lg shadow p-6 mt-8">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">
//             Statistics
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="bg-purple-50 rounded-lg p-4">
//               <p className="text-gray-600 text-sm">Total Posts</p>
//               <p className="text-3xl font-bold text-purple-600">
//                 {userPosts.length}
//               </p>
//             </div>
//             <div className="bg-indigo-50 rounded-lg p-4">
//               <p className="text-gray-600 text-sm">Latest Post</p>
//               <p className="text-sm font-medium text-gray-800 mt-1">
//                 {new Date(userPosts[0]?.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//             <div className="bg-blue-50 rounded-lg p-4">
//               <p className="text-gray-600 text-sm">Total Likes</p>
//               <p className="text-3xl font-bold text-blue-600">
//                 {userPosts.reduce((sum, post) => sum + (post.likesCount || 0), 0)}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Calendar, Edit2, BookOpen } from "lucide-react";
import API from "../services/Api";
import { toast } from "react-toastify";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      API.delete(`/post/deletePost/${id}`)
        .then(() => {  setUserPosts(userPosts.filter((post) => post._id !== id));
          toast.success("Post deleted successfully");
        })
        .catch((error) => {
          toast.error("Failed to delete post", error);
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      toast.error("Please login to view profile");
      navigate("/login", { replace: true });
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchUserPosts(parsedUser.name);
    } catch (err) {
      toast.error("Session expired. Please login again",err);
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const fetchUserPosts = async (authorName) => {
    try {
      const res = await API.get(`/post/getByAuthor/${authorName}`);
      setUserPosts(res.data.authorpost || []);
    } catch (err) {
      if (err.response?.status !== 404) {
        toast.error("Failed to load your posts");
      }
      setUserPosts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-linear-to-r from-purple-600 to-midnightpurple rounded-lg shadow-lg p-8 mb-8 text-white">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white rounded-full p-4">
                <User size={32} className="text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-purple-100">Editor</p>
              </div>
            </div>

            <div className="space-y-2 text-purple-100">
              {user.email && (
                <div className="flex items-center gap-2">
                  <Mail size={18} />
                  <span>{user.email}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>Member since {new Date().getFullYear()}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={18} />
                <span>{userPosts.length} posts published</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/create")}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 flex items-center gap-2"
          >
            <Edit2 size={18} />
            New Post
          </button>
        </div>
      </div>

      {/* Posts Section */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Posts</h2>

      {userPosts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No posts yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start sharing your thoughts with the community!
          </p>
          <button
            onClick={() => navigate("/create")}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Create Your First Post
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {userPosts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-4 line-clamp-3">
                {post.content}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/updatePost/${post._id}`)}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => navigate(`/post/${post._id}`)}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(post._id); 
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Statistics */}
      {userPosts.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h3 className="text-xl font-semibold mb-4">Statistics</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Posts</p>
              <p className="text-3xl font-bold text-purple-600">
                {userPosts.length}
              </p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Latest Post</p>
              <p className="text-sm font-medium mt-1">
                {new Date(userPosts[0].createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Likes</p>
              <p className="text-3xl font-bold text-blue-600">
                {userPosts.reduce(
                  (sum, post) => sum + (post.likesCount || 0),
                  0
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
