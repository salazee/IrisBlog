// src/pages/Profile.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, Edit2, BookOpen } from 'lucide-react';
import API from '../services/Api';
import { toast } from 'react-toastify';


export default function Profile() {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // If no user, redirect to login
  useEffect(() => {
    if (!user.name) {
      toast.error('Please login to view profile');
      navigate('/login');
      return;
    }
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    setLoading(true);
    try {
      const response = await API.get(`/post/getByAuthor/${user.name}`);
      setUserPosts(response.data.authorpost);
    } catch (error) {
      console.error('Error fetching user posts:', error);
      // If no posts found, that's okay - just show empty state
      if (error.response?.status !== 404) {
        toast.error('Failed to fetch your posts');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePostDeleted = (deletedPostId) => {
    setUserPosts(userPosts.filter(post => post._id !== deletedPostId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header Card */}
      <div className="bg-linear-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg p-8 mb-8 text-white  ">
        <div className="flex items-start justify-between">
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
                <span>{userPosts.length} {userPosts.length === 1 ? 'post' : 'posts'} published</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/create-post')}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors font-medium flex items-center gap-2"
          >
            <Edit2 size={18} />
            New Post
          </button>
        </div>
      </div>

      {/* User's Posts Section */}
      <div className="mb-4">
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
              onClick={() => navigate('/create-post')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Create Your First Post
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {userPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onDelete={handlePostDeleted}
              />
            ))}
          </div>
        )}
      </div>

      {/* Statistics Card */}
      {userPosts.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm">Total Posts</p>
              <p className="text-3xl font-bold text-purple-600">
                {userPosts.length}
              </p>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm">Latest Post</p>
              <p className="text-sm font-medium text-gray-800 mt-1">
                {new Date(userPosts[0]?.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm">Total Likes</p>
              <p className="text-3xl font-bold text-blue-600">
                {userPosts.reduce((sum, post) => sum + (post.likesCount || 0), 0)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}