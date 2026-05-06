import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import Loader from "../components/Loader";

function ProtectedRoutes({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader text="Loading posts..." />;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoutes;
