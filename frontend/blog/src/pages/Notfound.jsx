// // src/pages/NotFound.jsx
// import { Link } from 'react-router-dom';
// import { Home, ArrowLeft } from 'lucide-react';

// export default function NotFound() {
//   return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <div className="text-center">
//         <h1 className="text-9xl font-bold text-purple-600">404</h1>
//         <h2 className="text-3xl font-semibold text-gray-800 mt-4 mb-2">
//           Page Not Found
//         </h2>
//         <p className="text-gray-600 mb-8">
//           The page you're looking for doesn't exist or has been moved.
//         </p>
//         <div className="flex gap-4 justify-center">
//           <Link
//             to="/"
//             className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white 
//                      rounded-lg hover:bg-purple-700 transition-colors font-semibold"
//           >
//             <Home className="w-5 h-5" />
//             Go Home
//           </Link>
//           <button
//             onClick={() => window.history.back()}
//             className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 
//                      rounded-lg hover:bg-gray-300 transition-colors font-semibold"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             Go Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // // src/pages/Profile.jsx
// // import { useEffect, useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { User, Mail, Calendar, Edit } from 'lucide-react';
// // import API from '../services/Api';
// // import PostCard from '../components/PostCard';
// // import { toast } from 'react-toastify';

// // export default function Profile() {
// //   const [userPosts, setUserPosts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();
  
// //   const user = JSON.parse(localStorage.getItem('user') || '{}');

// //   useEffect(() => {
// //     // Check if user is logged in
// //     if (!localStorage.getItem('token')) {
// //       toast.error('Please login to view profile');
// //       navigate('/login');
// //       return;
// //     }

// //     fetchUserPosts();
// //   }, [navigate]);

// //   const fetchUserPosts = async () => {
// //     setLoading(true);
// //     try {
// //       // Fetch posts by current user's name
// //       const response = await API.get(`/post/getByAuthor/${user.name}`);
// //       setUserPosts(response.data.authorpost || []);
// //     } catch (error) {
// //       console.error('Error fetching user posts:', error);
// //       if (error.response?.status === 404) {
// //         setUserPosts([]); // No posts yet
// //       } else {
// //         toast.error('Failed to load your posts');
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handlePostDeleted = (postId) => {
// //     setUserPosts(userPosts.filter(post => post._id !== postId));
// //     toast.success('Post deleted successfully');
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-6xl mx-auto px-4 py-8">
// //       {/* Profile Header */}
// //       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
// //         <div className="flex items-start justify-between">
// //           <div className="flex items-center gap-4">
// //             <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center">
// //               <User className="w-10 h-10 text-white" />
// //             </div>
// //             <div>
// //               <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
// //               <p className="text-gray-600 flex items-center gap-2 mt-1">
// //                 <Mail className="w-4 h-4" />
// //                 {user.email}
// //               </p>
// //               <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
// //                 <Calendar className="w-4 h-4" />
// //                 Member since {new Date().toLocaleDateString()}
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* User Posts Section */}
// //       <div className="mb-6 flex items-center justify-between">
// //         <h2 className="text-2xl font-bold text-gray-800">
// //           My Posts ({userPosts.length})
// //         </h2>
// //         <Link
// //           to="/create"
// //           className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white 
// //                    rounded-lg hover:bg-purple-700 transition-colors font-semibold"
// //         >
// //           <Edit className="w-5 h-5" />
// //           Create New Post
// //         </Link>
// //       </div>

// //       {/* Posts Grid */}
// //       {userPosts.length === 0 ? (
// //         <div className="text-center py-12 bg-white rounded-lg shadow-md">
// //           <p className="text-gray-500 text-lg mb-4">You haven't created any posts yet</p>
// //           <Link
// //             to="/create"
// //             className="text-purple-600 hover:text-purple-700 font-semibold"
// //           >
// //             Create your first post!
// //           </Link>
// //         </div>
// //       ) : (
// //         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
// //           {userPosts.map((post) => (
// //             <PostCard 
// //               key={post._id} 
// //               post={post} 
// //               onDelete={handlePostDeleted}
// //             />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }