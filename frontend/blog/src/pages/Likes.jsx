
import API from "../services/Api";
import { useState } from "react";
import { toast } from "react-toastify";
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';

export default function LikeButton({
postId,
initialLiked= false ,
initialLikes = 0
}) 
{
const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [loading, setLoading] = useState(false);
  //   useEffect(() => {
  //   setLiked(initialLiked);
  //   setLikesCount(initialLikes);
  // }, [initialLiked, initialLikes]);
    
  // Function to toggle state
  const toggleLike = async() => {
    //prevent multiple clicks while processing
    if (loading) return;

    //optimistic UI update
   const previousLiked = liked;
   const previousCount = likesCount;

   setLiked(!liked);
   setLikesCount(liked? likesCount -1:likesCount +1);
   setLoading(true);

   try{
      // Fixed: Removed circular reference - don't pass function as data
      const response = await API.post(`/post/toggleLike/${postId}`);
      
      // Update with actual data from server
      if (response.data.likes !== undefined) {
        setLikesCount(response.data.likes);
   } toast.success(response.data.message || (previousLiked? 'Post unliked' : 'Post liked' ));
}
  catch (error) {
          // Revert optimistic update on error
      setLiked(previousLiked);
      setLikesCount(previousCount);
      
      console.error('Error toggling like:', error);
     
      if (error.isAuthError || error.response?.status === 401) {
        toast.error('Please login to like posts');
      } else {
        toast.error('Failed to update like');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleLike}
      disabled ={loading}
      className="flex items-center gap-1 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"

    >
      {liked ? (
        <HeartSolid className="h-6 w-6 text-red-500 transition-transform duration-200 scale-110" />
      ) : (
        <HeartOutline className="h-6 w-6 text-midnightpurple transition-transform duration-200" />
      )}
      
      {likesCount > 0 && (
        <span className="text-sm font-medium text-gray-700">
          {likesCount}
                  </span>
      )}

      {/* <span className="text-sm font-medium text-gray-700">
        {liked ? 'Liked' : 'Like'}
      </span> */}
    </button>
  );

}
  

