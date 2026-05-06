import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
        404
      </h1>

      <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
        Page not found
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFoundPage;