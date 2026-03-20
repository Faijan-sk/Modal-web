// src/pages/model/ModelPortfolioPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useJwt from "./../../endpoints/jwt/useJwt";
import ModelDetailModal from "./ProfileDetailModal";
import {
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaSnapchat,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";

import { ImFacebook2, ImLinkedin } from "react-icons/im";

const FALLBACK_IMAGE =
  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800";

const socialIconsMap = {
  x: <FaTwitter />,
  instagram: <FaInstagram />,
  tiktok: <FaTiktok />,
  snapchat: <FaSnapchat />,
  pinterest: <FaPinterest />,
  youtube: <FaYoutube />,
  facebook: <ImFacebook2 />,
  linkedin: <ImLinkedin />,
};

const ModelPortfolioPage = () => {
  const { state } = useLocation();
  const uid = state?.uid;

  const [modelData, setModelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const pageSize = 4; // Ek page par 4 images

  useEffect(() => {
    if (!uid) return;
    const fetchModel = async () => {
      try {
        const res = await useJwt.getPublicModalByuid(uid);
        setModelData(res?.data ?? res);
      } catch (err) {
        console.error("Failed to fetch model", err);
      } finally {
        setLoading(false);
      }
    };
    fetchModel();
  }, [uid]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-sm text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!modelData) return null;

  const { basic_info, profile, media_gallery, social_links } = modelData;

  const images = media_gallery?.images || [];
  const videos = media_gallery?.video || [];

  // Pagination Logic
  const totalPages = Math.ceil(images.length / pageSize);
  const canGoPrev = pageIndex > 0;
  const canGoNext = pageIndex < totalPages - 1;

  const start = pageIndex * pageSize;
  const currentImages = images.slice(start, start + pageSize);

  // Har page ke liye alag video (agar videos list mein hain)
  const currentVideo = videos[pageIndex] || null;

  const handlePrev = () => {
    if (canGoPrev) {
      setPageIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setPageIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white w-full">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10 lg:py-14">
        <div className="grid lg:grid-cols-[minmax(0,3fr)_minmax(260px,1.1fr)] gap-10 lg:gap-12">
          {/* ---------- RIGHT SIDE (INFO) ---------- */}
          <div className="order-1 lg:order-2">
            <div className="bg-[#f4f5ee] px-8 py-10 lg:px-10 lg:py-12 h-full">
              <aside className="lg:sticky lg:top-4">
                <h2 className="text-2xl lg:text-3xl font-light italic tracking-wide mb-8">
                  {basic_info?.full_name}
                </h2>

                <dl className="space-y-3 text-[11px] tracking-[0.24em] uppercase">
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <dt>Height</dt>
                    <dd className="tracking-normal">{profile?.height}</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <dt>Bust</dt>
                    <dd className="tracking-normal">{profile?.chest_bust}</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <dt>Waist</dt>
                    <dd className="tracking-normal">{profile?.waist}</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <dt>Hips</dt>
                    <dd className="tracking-normal">{profile?.hips}</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <dt>Shoe</dt>
                    <dd className="tracking-normal">{profile?.shoe_size}</dd>
                  </div>

                  <div className="flex justify-between pt-4">
                    <dt>More</dt>
                    <dd>
                      <button
                        onClick={() => setIsProfileModalOpen(true)}
                        className="underline underline-offset-2 hover:text-black"
                      >
                        Profile Detail
                      </button>
                    </dd>
                  </div>

                  {/* Socials */}
                  <div className="flex flex-wrap gap-4 mt-8 pt-4 border-t border-gray-300">
                    {social_links &&
                      Object.entries(social_links).map(([key, value]) => {
                        if (value && socialIconsMap[key]) {
                          return (
                            <a
                              key={key}
                              href={
                                value.startsWith("http")
                                  ? value
                                  : `https://${value}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-lg text-gray-600 hover:text-black transition-colors"
                            >
                              {socialIconsMap[key]}
                            </a>
                          );
                        }
                        return null;
                      })}
                  </div>
                </dl>
              </aside>
            </div>
          </div>

          {/* ---------- LEFT SIDE (MEDIA) ---------- */}
          <div className="order-2 lg:order-1">
            {/* Display single video based on pageIndex */}
            {currentVideo ? (
              <div className="w-full aspect-video bg-black overflow-hidden mb-10">
                <video
                  key={currentVideo} // Key change hone par video reset hoga
                  src={currentVideo}
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                />
              </div>
            ) : (
              // Agar is page par video nahi hai toh placeholder ya spacing
              <div className="mb-10 text-xs text-gray-400 italic">
                {videos.length > 0
                  ? "Additional images for this profile"
                  : "No videos available"}
              </div>
            )}

            {/* Images Grid (Current Page) */}
            <div className="grid sm:grid-cols-2 gap-6">
              {currentImages.map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-[3/4] overflow-hidden bg-gray-100"
                >
                  <img
                    src={img || FALLBACK_IMAGE}
                    alt="Model"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={!canGoPrev}
                className={`flex items-center gap-3 text-xs tracking-[0.18em] uppercase ${
                  !canGoPrev
                    ? "opacity-30 cursor-not-allowed"
                    : "cursor-pointer hover:font-bold"
                }`}
              >
                <span className="h-10 w-10 flex items-center justify-center border border-black">
                  ←
                </span>
                <span>Prev</span>
              </button>

              <span className="text-[11px] tracking-[0.18em] uppercase text-gray-500">
                Page {pageIndex + 1} of {totalPages}
              </span>

              <button
                onClick={handleNext}
                disabled={!canGoNext}
                className={`flex items-center gap-3 text-xs tracking-[0.18em] uppercase ${
                  !canGoNext
                    ? "opacity-30 cursor-not-allowed"
                    : "cursor-pointer hover:font-bold"
                }`}
              >
                <span>Next</span>
                <span className="h-10 w-10 flex items-center justify-center border border-black">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setIsProfileModalOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ModelDetailModal modaldata={modelData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelPortfolioPage;
