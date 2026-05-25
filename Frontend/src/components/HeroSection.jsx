import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-950 mb-10 sm:py-12 rounded-2xl">
      
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-112.5 w-112.5 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">

          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-gray-300 dark:border-gray-700 px-4 py-1 text-sm text-gray-600 dark:text-gray-300 mb-6">
            🚀 A platform for developers & creators
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            Share Ideas.
            <span className="block bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Build Skills.
            </span>
            Grow with DevNest
          </h1>

          {/* Subtext */}
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            DevNest is a modern community where developers and designers share
            tutorials, tools, and insights to learn, build, and grow together.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            
            {!isAuthenticated && (
              <Link
                to="/register"
                className="px-8 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-medium shadow-md hover:scale-105 transition duration-300"
              >
                Get Started
              </Link>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;