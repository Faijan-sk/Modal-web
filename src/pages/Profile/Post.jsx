import React, { useState, useEffect, useRef } from "react";
import useJwt from "./../../endpoints/jwt/useJwt";

function Post() {
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(false);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);

  // States for Delete Confirmation Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteIndex, setSelectedDeleteIndex] = useState(null);

  const fileInputRef = useRef(null);

  // ==================== FETCH POSTS ====================
  const fetchPosts = async () => {
    try {
      const res = await useJwt.getMediaToProfile();
      const images = res?.data?.images ?? [];
      setPosts(Array.isArray(images) ? images : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ==================== DELETE IMAGE LOGIC ====================
  const openDeleteModal = (index) => {
    setSelectedDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedDeleteIndex(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    if (selectedDeleteIndex === null) return;

    try {
      setLoading(true);
      await useJwt.deleteImageFromProfile(selectedDeleteIndex);

      // UI refresh: Filter out the deleted image
      setPosts((prev) =>
        prev.filter((img) => img.index !== selectedDeleteIndex),
      );
      closeDeleteModal();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete image.");
    } finally {
      setLoading(false);
    }
  };

  // ==================== FILE UPLOAD (MULTIPLE) ====================
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setLoading(true);

    try {
      for (let file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await useJwt.addMediaToProfile(formData);

        if (!res || (res.status !== 200 && res.status !== 201)) {
          throw new Error("Upload failed");
        }
      }
      await fetchPosts();
    } catch (err) {
      console.error("Upload error:", err);
      const errorMsg = err?.response?.data?.detail;
      const statusCode = err?.response?.status;

      if (
        errorMsg === "Only 5 images are allowed." ||
        errorMsg === "Subscribe to add more images" ||
        statusCode === 403
      ) {
        setIsLimitModalOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 10, posts.length));
  };

  return (
    <div className="p-3 relative">
      {/* ==================== HIDDEN FILE INPUT ==================== */}
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* ==================== MASONRY GRID ==================== */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
        {posts.slice(0, visibleCount).map((img, i) => (
          <div
            key={img.index ?? i}
            className="group relative break-inside-avoid rounded-xl overflow-hidden shadow-xl
                       hover:-rotate-1 hover:scale-[1.04] transition-all duration-300"
          >
            {/* DELETE TRIGGER */}
            <button
              onClick={() => openDeleteModal(img.index)}
              disabled={loading}
              className="absolute top-3 right-3 z-10 bg-white/90 text-white p-2 rounded-full 
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300
                         hover:bg-white hover:text-white shadow-md disabled:bg-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>

            <img src={img.url} alt="" className="w-full" />
          </div>
        ))}
      </div>

      {/* ==================== VIEW MORE ==================== */}
      {visibleCount < posts.length && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleViewMore}
            className="px-6 py-2 rounded-full border border-pink-500
                       text-pink-500 font-semibold hover:bg-pink-500 hover:text-white"
          >
            View more
          </button>
        </div>
      )}

      {/* ==================== ADD POST CARD ==================== */}
      <div className="break-inside-avoid rounded-xl overflow-hidden shadow-xl my-5">
        <button
          type="button"
          onClick={openFilePicker}
          disabled={loading}
          className="w-full min-h-[120px] flex flex-col items-center justify-center
                     bg-gray-100 hover:bg-gray-200 transition-all
                     disabled:opacity-60"
        >
          {loading ? (
            <span className="text-gray-600 animate-pulse">Processing...</span>
          ) : (
            <>
              <span className="text-5xl font-bold">+</span>
              <span className="mt-2 text-sm text-gray-600">Add new post</span>
            </>
          )}
        </button>
      </div>

      {/* ==================== DELETE CONFIRMATION MODAL ==================== */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 transform transition-all scale-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Delete Image?
              </h2>
              <p className="text-gray-500 text-sm">
                This action cannot be undone. Are you sure you want to remove
                this image from your profile?
              </p>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={closeDeleteModal}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={loading}
                className="btn-drake-outline flex-1 px-4 py-2.5 rounded-xl bg-white text-white font-semibold hover:bg-white transition-colors disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== LIMIT MODAL ==================== */}
      {isLimitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Upload limit reached 🚫
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Your current subscription plan allows only{" "}
              <span className="font-semibold">5 image uploads</span>.
              <br /> Upgrade your plan for more.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsLimitModalOpen(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Maybe later
              </button>
              <button
                onClick={() => setIsLimitModalOpen(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600"
              >
                Upgrade plan 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
