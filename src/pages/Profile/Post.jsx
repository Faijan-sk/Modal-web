import React, { useState, useEffect, useRef } from "react";
import useJwt from "./../../endpoints/jwt/useJwt";

function Post() {
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(false);

  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false); // ✅ NEW

  const fileInputRef = useRef(null);

  // ==================== FETCH POSTS ====================
  const fetchPosts = async () => {
    try {
      const res = await useJwt.getMediaToProfile();
      const data = res?.data;
      const normalized = Array.isArray(data) ? data : data ? [data] : [];
      setPosts(normalized);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ==================== FILE UPLOAD ====================
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("photos", file);

      const res = await useJwt.addMediaToProfile(formData);

      if (!res || (res.status !== 200 && res.status !== 201)) {
        throw new Error("Upload failed");
      }

      await fetchPosts();
    } catch (err) {
      console.error("Upload error:", err);

      // ✅ IMAGE LIMIT ERROR → OPEN MODAL
      if (err?.response?.data?.detail === "Only 5 images are allowed.") {
        setIsLimitModalOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  // ==================== OPEN FILE PICKER ====================
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
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
        {posts.slice(0, visibleCount).map((post, i) => {
          if (!Array.isArray(post.photos) || post.photos.length === 0)
            return null;

          return post.photos.map((imgUrl, idx) => (
            <div
              key={`${post.id ?? i}-${idx}`}
              className="break-inside-avoid rounded-xl overflow-hidden shadow-xl
                         hover:-rotate-1 hover:scale-[1.04] transition-all duration-300"
            >
              <img src={imgUrl} alt="" className="w-full" />
            </div>
          ));
        })}
      </div>

      {/* View More */}
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

      {/* ADD POST CARD */}
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
            <span className="text-gray-600">Uploading...</span>
          ) : (
            <>
              <span className="text-5xl font-bold">+</span>
              <span className="mt-2 text-sm text-gray-600">Add new post</span>
            </>
          )}
        </button>
      </div>

      {/* ==================== LIMIT MODAL ==================== */}
      {isLimitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-scaleIn">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Upload limit reached 🚫
            </h2>

            <p className="text-gray-600 text-sm mb-4">
              Your current subscription plan allows only{" "}
              <span className="font-semibold">5 image uploads</span>.
              <br />
              Upgrade your plan to upload more images and unlock premium
              features.
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsLimitModalOpen(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300
                           text-gray-700 hover:bg-gray-100"
              >
                Maybe later
              </button>

              <button
                onClick={() => {
                  setIsLimitModalOpen(false);
                  // 👉 future: navigate to /subscription
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-pink-500
                           text-white font-semibold hover:bg-pink-600"
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
