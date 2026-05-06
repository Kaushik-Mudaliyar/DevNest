import { useEffect, useState } from "react";
import { getCurrentUserPosts } from "../api/userApi";
import useAuth from "../hooks/useAuth";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate()
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await getCurrentUserPosts();
        setPosts(res.data.data);
      } catch (error) {
        setError("Failed to fetch your posts");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  if (loading) return <Loader text="Loading posts..." />;

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Profile Header */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          ← Back
        </button>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                {user?.username}
              </h1>

              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {user?.email}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl px-6 py-4 text-center min-w-35">
              <p className="text-3xl font-bold text-blue-600">{posts.length}</p>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Posts Published
              </p>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Posts
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage and review all your published content.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-950/30 text-red-500 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
            {error}
          </div>
        )}

        {posts.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-10 text-center">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              No Posts Yet
            </h3>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Start sharing your ideas by creating your first post.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProfilePage;
