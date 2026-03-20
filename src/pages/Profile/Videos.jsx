// src/pages/post/Post.jsx

import React, { useState, useEffect, useRef } from "react";
import useJwt from "./../../endpoints/jwt/useJwt";

function Post() {
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(false);

  // ✅ Modals State
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteIndex, setSelectedDeleteIndex] = useState(null);

  const fileInputRef = useRef(null);

  // ==================== FETCH POSTS ====================
  const fetchPosts = async () => {
    try {
      const res = await useJwt.getVideoForProfile();
      const data = res?.data;

      if (data && Array.isArray(data.videos)) {
        setPosts(data.videos);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ==================== DELETE VIDEO LOGIC ====================
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
      await useJwt.deleteVideoFromProfile(selectedDeleteIndex);

      // UI refresh: Filter out deleted video
      setPosts((prev) =>
        prev.filter((vid) => vid.index !== selectedDeleteIndex),
      );
      closeDeleteModal();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete video.");
    } finally {
      setLoading(false);
    }
  };

  // ==================== FILE UPLOAD ====================
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      return;
    }

    const MAX_BYTES = 200 * 1024 * 1024;
    if (file.size > MAX_BYTES) {
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await useJwt.uploadVideo(formData);

      if (!res || (res.status !== 200 && res.status !== 201)) {
        throw new Error("Upload failed");
      }

      await fetchPosts();
    } catch (err) {
      console.error("Upload error:", err);

      const errorMsg = err?.response?.data?.detail;
      const statusCode = err?.response?.status;

      if (
        statusCode === 403 ||
        errorMsg ===
          "You already have a video. Take subscription for more videos." ||
        errorMsg === "Subscribe to add more videos"
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

  // ==================== YOUTUBE HELPERS ====================
  const getYoutubeEmbedFromUrl = (url) => {
    if (!url) return null;
    const watch = url.match(/[?&]v=([^&]+)/);
    if (watch) return `https://www.youtube.com/embed/${watch[1]}`;
    const short = url.match(/youtu\.be\/([^?&/]+)/);
    if (short) return `https://www.youtube.com/embed/${short[1]}`;
    const embed = url.match(/youtube\.com\/embed\/([^?&/]+)/);
    if (embed) return `https://www.youtube.com/embed/${embed[1]}`;
    return null;
  };

  const isYoutubeUrl = (url) => !!getYoutubeEmbedFromUrl(url);

  return (
    <div className="p-3 relative">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Video List */}
      <div className="space-y-6">
        {posts.slice(0, visibleCount).map((post, i) => {
          const videoSource = post.url;
          if (!videoSource) return null;

          const embed = isYoutubeUrl(videoSource);

          return (
            <div
              key={post.index ?? i}
              className="group relative rounded-xl overflow-hidden shadow-xl bg-black"
            >
              {/* DELETE BUTTON (Visible on Hover) */}
              <button
                onClick={() => openDeleteModal(post.index)}
                disabled={loading}
                className="absolute top-4 right-4 z-20 bg-white/90 text-white p-2.5 rounded-full 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300
                           hover:bg-white hover:text-white shadow-lg disabled:bg-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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

              {embed ? (
                <div className="relative pb-[56.25%]">
                  <iframe
                    src={getYoutubeEmbedFromUrl(videoSource)}
                    title={`yt-${i}`}
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              ) : (
                <video
                  src={videoSource}
                  controls
                  className="w-full aspect-video bg-black"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Upload Button */}
      <div className="rounded-xl overflow-hidden shadow-xl my-4">
        <button
          onClick={openFilePicker}
          disabled={loading}
          className="w-full min-h-[100px] flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          {loading ? (
            <span className="text-gray-600 animate-pulse">Processing...</span>
          ) : (
            <>
              <span className="text-5xl font-bold">+</span>
              <span className="mt-2 text-sm text-gray-600">Add new Video</span>
            </>
          )}
        </button>
      </div>

      {/* View More Button */}
      {posts.length > visibleCount && (
        <div className="text-center my-4">
          <button
            onClick={handleViewMore}
            className="px-6 py-2 border border-pink-500 text-pink-500 rounded-full hover:bg-white hover:text-white transition"
          >
            View More
          </button>
        </div>
      )}

      {/* ==================== DELETE CONFIRMATION MODAL ==================== */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 transform transition-all scale-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 text-white rounded-full flex items-center justify-center mb-4">
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
                Delete Video?
              </h2>
              <p className="text-gray-500 text-sm">
                This video will be permanently removed from your profile. Are
                you sure?
              </p>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={closeDeleteModal}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={loading}
                className="btn-drake-outline flex-1 px-4 py-2.5 rounded-xl bg-white text-white font-semibold hover:bg-red-600 disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SUBSCRIPTION MODAL ==================== */}
      {isLimitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-2">
              Video upload limit reached 🚫
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Your current subscription allows only{" "}
              <span className="font-semibold">1 video upload</span>.
              <br /> Upgrade your plan to upload more videos.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsLimitModalOpen(false)}
                className="flex-1 px-4 py-2 rounded-lg border"
              >
                Maybe later
              </button>
              <button
                onClick={() => setIsLimitModalOpen(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-pink-500 text-white font-semibold"
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
