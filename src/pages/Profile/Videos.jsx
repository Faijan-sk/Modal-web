// src/pages/post/Post.jsx

import React, { useState, useEffect, useRef } from "react";
import useJwt from "./../../endpoints/jwt/useJwt";

function Post() {
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(false);

  // YouTube URL state (local, static; no API calls)
  const [youtubeInput, setYoutubeInput] = useState(
    // "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ""
  );
  const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState(null);

  // File input ref
  const fileInputRef = useRef(null);

  // ==================== FETCH POSTS ====================
  const fetchPosts = async () => {
    try {
      const res = await useJwt.getMediaToProfile();
      const data = res?.data;
      const normalized = Array.isArray(data) ? data : data ? [data] : [];
      setPosts(normalized);
      console.log("Fetched posts:", normalized);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ==================== HANDLE FILE UPLOAD ====================
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Must be video
    if (!file.type.startsWith("video/")) {
      alert("Please select a video file.");
      return;
    }

    // Max 200MB frontend validation (backend will enforce 10MB)
    const MAX_BYTES = 200 * 1024 * 1024;
    if (file.size > MAX_BYTES) {
      alert("File too large. Maximum allowed size is 200MB.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      // IMPORTANT ⬇⬇ (backend expects "video")
      formData.append("video", file);

      const res = await useJwt.uploadVideo(formData);

      if (!res || (res.status !== 200 && res.status !== 201)) {
        throw new Error(res?.data?.detail || "Upload failed");
      }

      await fetchPosts();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed: " + (err?.message || ""));
    } finally {
      setLoading(false);
    }
  };

  // ==================== OPEN FILE PICKER ====================
  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // reset
      fileInputRef.current.click();
    }
  };

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 10, posts.length));
  };

  // ==================== YOUTUBE HELPERS ====================
  // Return embed URL or null
  const getYoutubeEmbedFromUrl = (url) => {
    if (!url || typeof url !== "string") return null;
    // standard watch?v=...
    const ytWatchMatch = url.match(/[?&]v=([^&]+)/);
    if (ytWatchMatch && ytWatchMatch[1]) {
      return `https://www.youtube.com/embed/${ytWatchMatch[1]}`;
    }
    // youtu.be/ID
    const shortMatch = url.match(/youtu\.be\/([^?&/]+)/);
    if (shortMatch && shortMatch[1]) {
      return `https://www.youtube.com/embed/${shortMatch[1]}`;
    }
    // embed url already
    const embedMatch = url.match(/youtube\.com\/embed\/([^?&/]+)/);
    if (embedMatch && embedMatch[1]) {
      return `https://www.youtube.com/embed/${embedMatch[1]}`;
    }
    return null;
  };

  const handlePlayYoutubeInput = () => {
    const embed = getYoutubeEmbedFromUrl(youtubeInput.trim());
    if (!embed) {
      alert("Please enter a valid YouTube URL.");
      return;
    }
    setYoutubeEmbedUrl(embed);
    // scroll to player (optional)
    setTimeout(() => {
      const el = document.getElementById("youtube-embed-player");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  // If a post.video is a YouTube URL, prefer embed for that post
  const isYoutubeUrl = (url) => !!getYoutubeEmbedFromUrl(url);

  return (
    <div className="p-3">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* YouTube input area (static/local; does not call API) */}
      <div className="mb-6 p-4 rounded-lg bg-white shadow-sm">
        <label className="block mb-2 font-medium">Play YouTube (static)</label>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 rounded-md border px-3 py-2"
            value={youtubeInput}
            onChange={(e) => setYoutubeInput(e.target.value)}
            placeholder="Paste YouTube URL (e.g. https://www.youtube.com/watch?v=...)"
          />
          <button
            onClick={handlePlayYoutubeInput}
            className="px-4 py-2 rounded-md bg-pink-500 text-white hover:bg-pink-600"
          >
            Play
          </button>
          <button
            onClick={() => {
              setYoutubeInput("");
              setYoutubeEmbedUrl(null);
            }}
            className="px-3 py-2 rounded-md border"
          >
            Clear
          </button>
        </div>
        {/* Embedded player for the input URL */}
        {youtubeEmbedUrl && (
          <div id="youtube-embed-player" className="mt-4 rounded overflow-hidden shadow">
            <div className="relative pb-[56.25%]">
              <iframe
                title="YouTube Player"
                src={youtubeEmbedUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Video List */}
      <div className="space-y-6">
        {posts.slice(0, visibleCount).map((post, i) => {
          // If post.video is falsy, skip
          if (!post || (!post.video && !post.youtubeLink)) return null;

          const candidateUrl = post.youtubeLink ?? post.video;
          const embed = isYoutubeUrl(candidateUrl);

          // If embed available, show iframe
          if (embed) {
            return (
              <div
                key={post.id ?? i}
                className="rounded-xl overflow-hidden shadow-xl hover:-rotate-1 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="relative pb-[56.25%]">
                  <iframe
                    title={`yt-${post.id ?? i}`}
                    src={getYoutubeEmbedFromUrl(candidateUrl)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full bg-black"
                  />
                </div>
              </div>
            );
          }
          // Otherwise show regular video tag (hosted video)
          return (
            <div
              key={post.id ?? i}
              className="rounded-xl overflow-hidden shadow-xl hover:-rotate-1 hover:scale-[1.02] transition-all duration-300"
            >
              <video
                src={post.video}
                controls
                className="w-full h-auto max-h-[500px] object-contain bg-black"
              />
            </div>
          );
        })}
      </div>

      {/* View More */}
      {visibleCount < posts.length && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleViewMore}
            className="
              px-6 py-2.5 rounded-full
              border border-pink-500
              text-pink-500 font-semibold text-sm
              hover:bg-pink-500 hover:text-white
              transition duration-300 active:scale-95
              shadow-sm
            "
          >
            View more
          </button>
        </div>
      )}

      {/* Plus Upload Button */}
      <div className="rounded-xl overflow-hidden shadow-xl my-4">
        <button
          type="button"
          onClick={openFilePicker}
          className="
            w-full h-full min-h-[100px]
            flex flex-col items-center justify-center
            bg-gray-100 hover:bg-gray-200
            transition-all duration-300
          ">
          {loading ? (
            <span className="text-gray-600 text-sm">Uploading...</span>
          ) : (
            <>
              <span className="text-5xl font-bold">+</span>
              <span className="mt-2 text-sm text-gray-600">Add new Video</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Post;
