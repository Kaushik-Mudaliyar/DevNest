import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
function PostCard({ post }) {
  return (
    <>
      <Helmet>
        <title>{post.title} | DevNest</title>

        <meta name="description" content={post.content.slice(0, 150)} />
      </Helmet>
      <Link to={`/post/${post._id}`} className="group block">
        <article className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition duration-300">
          <div className="overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
            />
          </div>

          <div className="p-5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 transition">
              {post.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
              {post.content}
            </p>

            <div className="mt-5 flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                By{" "}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {post.author?.username || "Unknown"}
                </span>
              </p>

              <span className="text-sm font-medium text-blue-600 group-hover:translate-x-1 transition">
                Read More →
              </span>
            </div>
          </div>
        </article>
      </Link>
    </>
  );
}

export default PostCard;
