// src/pages/post/Post.jsx

import React, { useState, useEffect, useRef } from "react";
import useJwt from "./../../endpoints/jwt/useJwt";

function Post() {
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(false);

  // ✅ Subscription modal
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);

  // YouTube (static)
  const [youtubeInput, setYoutubeInput] = useState("");
  const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState(null);

  const fileInputRef = useRef(null);

  // ==================== FETCH POSTS ====================
  const fetchPosts = async () => {
    try {
      const res = await useJwt.getVideoForProfile();
      
      const data = res?.data;
      // console.log('get video', data.videos)
      
      // Update: Extract the 'videos' array specifically from the response
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
        errorMsg === "You already have a video. Take subscription for more videos." ||
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

  const handlePlayYoutubeInput = () => {
    const embed = getYoutubeEmbedFromUrl(youtubeInput.trim());
    if (!embed) return;
    setYoutubeEmbedUrl(embed);
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

      {/* YouTube input */}
      {/* <div className="mb-6 p-4 rounded-lg bg-white shadow-sm">
        <label className="block mb-2 font-medium">
          Play YouTube (static)
        </label>
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-md border px-3 py-2"
            value={youtubeInput}
            onChange={(e) => setYoutubeInput(e.target.value)}
            placeholder="Paste YouTube URL"
          />
          <button
            onClick={handlePlayYoutubeInput}
            className="px-4 py-2 rounded-md bg-pink-500 text-white hover:bg-pink-600"
          >
            Play
          </button>
        </div>

        {youtubeEmbedUrl && (
          <div className="mt-4 rounded overflow-hidden shadow">
            <div className="relative pb-[56.25%]">
              <iframe
                src={youtubeEmbedUrl}
                title="YouTube Player"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        )}
      </div> */}

      {/* Video List */}
      <div className="space-y-6">
        {posts.slice(0, visibleCount).map((post, i) => {
          // Update: The API uses post.url instead of post.video
          const videoSource = post.url;
          if (!videoSource) return null;

          const embed = isYoutubeUrl(videoSource);

          return embed ? (
            <div key={i} className="rounded-xl overflow-hidden shadow-xl">
              <div className="relative pb-[56.25%]">
                <iframe
                  src={getYoutubeEmbedFromUrl(videoSource)}
                  title={`yt-${i}`}
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          ) : (
            <div key={i} className="rounded-xl overflow-hidden shadow-xl">
              <video
                src={videoSource}
                controls
                className="w-full bg-black"
              />
            </div>
          );
        })}
      </div>

      {/* Upload Button */}
      <div className="rounded-xl overflow-hidden shadow-xl my-4">
        <button
          onClick={openFilePicker}
          className="w-full min-h-[100px] flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200"
        >
          {loading ? (
            <span className="text-gray-600">Uploading...</span>
          ) : (
            <>
              <span className="text-5xl font-bold">+</span>
              <span className="mt-2 text-sm text-gray-600">
                Add new Video
              </span>
            </>
          )}
        </button>
      </div>

      {/* View More Button */}
      {posts.length > visibleCount && (
        <div className="text-center my-4">
          <button 
            onClick={handleViewMore}
            className="px-6 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
          >
            View More
          </button>
        </div>
      )}

      {/* ==================== SUBSCRIPTION MODAL ==================== */}
      {isLimitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-2">
              Video upload limit reached 🚫
            </h2>

            <p className="text-gray-600 text-sm mb-4">
              Your current subscription allows only{" "}
              <span className="font-semibold">1 video upload</span>.
              <br />
              Upgrade your plan to upload more videos.
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