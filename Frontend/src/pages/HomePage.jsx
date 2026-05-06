import { useEffect, useState } from "react";
import { getAllPosts } from "../api/postApi.js";
import PostCard from "../components/PostCard.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth.js";
import HeroSection from "../components/HeroSection.jsx";
function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getAllPosts(search);
        setPosts(res.data.data);
      } catch (error) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [search]);

  if (loading) return <Loader text="Loading posts..." />;

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!isAuthenticated && <HeroSection />}
        <div className="mb-10">
          <div className="mb-6">
            {search && (
              <button
                onClick={() => navigate("/")}
                className="mt-4 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                ← Back to All Posts
              </button>
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {search ? `Results for "${search}"` : "Latest Posts"}
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Explore ideas, tutorials, and stories from the DevNest community.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-10 text-center border border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              No posts yet
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Be the first to publish something on DevNest.
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

export default HomePage;
