import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import {
  HomePage,
  LoginPage,
  CreatePostPage,
  EditPostPage,
  PostDetailPage,
  ProfilePage,
  RegisterPage,
  NotFoundPage,
} from "./pages/index.js";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";

const App = () => {
  const [themeMode, setThemeMode] = useState("light");

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setThemeMode(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(themeMode);
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  return (
    <ThemeContextProvider value={{ themeMode, toggleTheme }}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/post/:postId" element={<PostDetailPage />} />
            <Route
              path="/create-post"
              element={
                <ProtectedRoutes>
                  <CreatePostPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/edit-post/:postId"
              element={
                <ProtectedRoutes>
                  <EditPostPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoutes>
                  <ProfilePage />
                </ProtectedRoutes>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  );
};

export default App;
