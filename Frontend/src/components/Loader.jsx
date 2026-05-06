function Loader({ text = "Loading..." }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-gray-300 dark:border-gray-700 border-t-black dark:border-t-white rounded-full animate-spin" />
      <p className="text-gray-600 dark:text-gray-400 font-medium">
        {text}
      </p>
    </div>
  );
}

export default Loader;