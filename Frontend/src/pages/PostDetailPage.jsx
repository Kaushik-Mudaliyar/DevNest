import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPostById, deletePost } from "../api/postApi";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { Heart, Eye } from "lucide-react";
import { toggleLikePost } from "../api/postApi.js";

function PostDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPostById(postId);
        const fetchedPost = res.data.data;

        setPost(fetchedPost);

        setLikesCount(fetchedPost.likes.length);

        setLiked(fetchedPost.likes.includes(user?._id));
      } catch (error) {
        setError("Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmed) return;

    try {
      await deletePost(postId);
      navigate("/");
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleLike = async () => {
    try {
      const res = await toggleLikePost(postId);

      setLiked(res.data.data.liked);
      setLikesCount(res.data.data.likesCount);
    } catch (error) {
      toast.error("Failed to like post");
    }
  };

  if (loading) return <Loader text="Loading posts..." />;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Post not found</div>;

  const isOwner = user?._id === post.author?._id;

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow p-6 md:p-8 border border-gray-100 dark:border-gray-800">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          ← Back
        </button>

        <img
          src={post.image}
          alt={post.title}
          className="w-full h-96 object-cover rounded-xl mb-6"
        />

        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {post.title}
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mb-6">
          By {post.author?.username || "Unknown"}
        </p>

        <div className="flex items-center gap-6 mt-6 mb-6">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition"
          >
            <Heart
              className={`w-5 h-5 transition ${
                liked ? "fill-red-500 text-red-500" : ""
              }`}
            />

            <span>{likesCount}</span>
          </button>

          <div className="flex items-center gap-2 text-gray-600">
            <Eye className="w-5 h-5" />
            <span>{post.views}</span>
          </div>
        </div>

        <div className="prose max-w-none text-lg text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {post.content}
        </div>

        {isOwner && (
          <div className="flex gap-4 mt-8">
            <Link
              to={`/edit-post/${post._id}`}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg"
            >
              Edit Post
            </Link>

            <button
              onClick={handleDelete}
              className="px-5 py-2 bg-red-600 text-white rounded-lg"
            >
              Delete Post
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default PostDetailPage;
