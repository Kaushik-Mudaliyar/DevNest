import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="bg-gray-50 dark:bg-gray-950 py-14 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          Share Ideas. Build Skills.
          <br className="hidden sm:block" />
          Grow with DevNest
        </h1>

        {/* Subtext */}
        <p className="mt-5 sm:mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          DevNest is a modern platform where developers and designers share
          tutorials, tools, and insights to help each other grow.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          {!isAuthenticated && (
            <Link
              to="/register"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition"
            >
              Get Started
            </Link>
          )}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              100+
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Articles
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              50+
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Developers
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              24/7
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Learning
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;