import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../api/postApi";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

function EditPostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPostById(postId);

        setFormData({
          title: res.data.data.title,
          content: res.data.data.content,
          image: null,
        });

        setPreview(res.data.data.image);
      } catch (error) {
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];

      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSubmitLoading(true);

    try {
      const postData = new FormData();

      postData.append("title", formData.title);
      postData.append("content", formData.content);

      if (formData.image) {
        postData.append("image", formData.image);
      }

      await updatePost(postId, postData);

      navigate(`/post/${postId}`);
      toast.success("Post updated successfully");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update post");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <Loader text="Loading posts..." />;

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10">
      
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow p-8 border border-gray-100 dark:border-gray-800">
         <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Edit Post
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-3"
            required
          />

          <textarea
            name="content"
            rows="8"
            value={formData.content}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-3"
            required
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-gray-700 dark:text-gray-300"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-xl"
            />
          )}

          <button
            type="submit"
            disabled={submitLoading}
            className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            {submitLoading ? "Updating..." : "Update Post"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditPostPage;