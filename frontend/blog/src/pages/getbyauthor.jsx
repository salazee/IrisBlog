// src/pages/AuthorPosts.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/Api';
import { toast } from 'react-toastify';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export default function AuthorPosts() {
  const { author } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorPosts = async () => {
      setLoading(true);
      try {
        const response = await API.get(`/post/getByAuthor/${author}`);
        setPosts(response.data.authorpost);
      } catch (error) {
        console.error('Error fetching author posts:', error);
        toast.error(error.response?.data?.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorPosts();
  }, [author]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"> <P>Please Login</P></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <User className="w-8 h-8 text-purple-600" />
          Posts by {author}
        </h1>
        <p className="text-gray-600 mt-2">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
        </p>
      </div>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts found by this author</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              to={`/post/${post._id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.content}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                {post.createdAt && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}



// // src/pages/Home.jsx
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import API from '../services/Api';
// import {toast,ToastContainer} from "react-toastify";
// import "react-toastify/ReactToastify.css";

// export default function GetByAuthor() {
//   const [posts, setPosts] = useState([]);
//   const [authorFilter, setAuthorFilter] = useState('');

//   useEffect(() => {
//     searchPosts();
//   }, []);
//   const searchPosts = async () => {
//     try {
//       const res = authorFilter
//         ? await API.get(`/post/getByAuthor/${authorFilter}`)
//         : await API.get('/post/get');

//           // Handle axios response correctly
//     const data = res.data.authorpost; // axios wraps in .data
// console.log(res.data.authorpost)
//      // Ensure data is an array
//     const postsArray = Array.isArray(data) 
//       ? data 
//       : (Array.isArray(data?.post) ? data.post : []);

//       setPosts(postsArray);
//     } 
    
//     catch (error) {
//       console.error("Failed to fetch post:", error);
//       toast.error("Author not available");
//       setPosts([]); //fallback to empty array
//     }
//   };
  

//   // const handleDelete = async (id) => {
//   //   if (window.confirm('Delete this post?')) {
//   //     try {
//   //       await API.delete(`/post/deletePost/${id}`);
//   //       setPosts(posts.filter(post => post._id !== id));
//   //     } catch (error) {
//   //       alert('Failed to delete post', error);
//   //     }
//   //   }
//   // };

//   return (
//     <div>
//       <div className="mb-4 flex gap-2">
//         <input
//           type="text"
//           placeholder="Filter by author"
//           className="border p-2 rounded"
//           value={authorFilter}
//           onChange={(e) => setAuthorFilter(e.target.value)}
//         />
//         <button onClick={searchPosts} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Search
//         </button>
//         {/* <button>
//            <Link to="/create" className="ml-auto bg-green-500 text-white px-4 py-2 rounded">
//           Create New Post
//         </Link>
//         </button> */}
       
//       </div>

//       <div className="space-y-4">
//         {posts.length === 0 ? (
//           <p>No posts found.</p>
//         ) : (
//           posts.map((post) => (
//             <div key={post._id} className="border p-4 rounded shadow">
//               <h2 className="text-xl font-bold">{post.title}</h2>
//               <p className="text-gray-600">By: {post.author}</p>
//               <p className="mt-2">{post.content.substring(0, 100)}...</p>
//               {/* <div className="mt-3 space-x-2">
//                <button>
//                  <Link to={`/post/${post._id}`} className="text-blue-500">View</Link>
//                </button>
//               <button>
//                   <Link to={`/post/${post._id}`} className="text-yellow-500">Edit</Link>
//               </button>
//                 <button onClick={() => handleDelete(post._id)} className="text-red-500">Delete</button>
//               </div> */}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }