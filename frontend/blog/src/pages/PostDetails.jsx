// // src/pages/PostDetail.jsx
// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import API from '../services/Api';

//  function SinglePost() {
//   const [post, setPost] = useState(null);
//   const { id } = useParams();
//   const navigate = useNavigate();


//   useEffect(() => {
//     loadPost();
//   }, []);
//   const loadPost = async () => {
//     try {
//       const res = await API.get(`/post/getById/${id}`);
//       setPost(res.data.post);
//       console.log(res.data.post)
//     } catch (error) {
//       alert('Post not found',error);
//       navigate('/');
//     }
//     //This is to get post by id. 
//     alert("Post gotten successfully")
  
//   };

//   if (!post) return <p>Loading...</p>;

//   return (
//     <div className="max-w-2xl mx-auto">
//       <h1 className="text-3xl font-bold">{post.title}</h1>
//       <p className="text-gray-600 mt-2">By: {post.author}</p>
//       <p className="mt-4 whitespace-pre-line">{post.content}</p>
//       <div className="mt-6 space-x-3">
//         <button
//           onClick={() => navigate(`/updatePost/${post._id}`)}
//           className="text-yellow-500 underline"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => {
//             if (window.confirm('Delete this post?')) {
//               API.delete(`/post/deletePost/${post._id}`)
//                 .then(() => navigate('/'))
//                 .catch(() => alert('Delete failed'));
               
//             }
//           }}
//           className="text-red-500 underline"
//         >
//           Delete
//         </button>
//         <button onClick={() => navigate(-1)} className="text-blue-500 underline">
//           ← Back
//         </button>
//       </div>
//     </div>
//   );
// }
// export default SinglePost