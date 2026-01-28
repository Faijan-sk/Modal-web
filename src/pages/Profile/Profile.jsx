// src/pages/model/ModelPortfolioPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useJwt from "./../../endpoints/jwt/useJwt";
import ModelDetailModal from "./ProfileDetailModal"
import {
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaSnapchat,
  FaPinterest,
  FaYoutube
} from "react-icons/fa";

import { ImFacebook2, ImLinkedin } from "react-icons/im";

const FALLBACK_IMAGE =
  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800";

// Social Icons Mapping
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

  const pageSize = 4;

  /* ================= FETCH MODEL ================= */
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

  const { basic_info, profile, professional, media_gallery, social_links } = modelData;

  const images = media_gallery?.images || [];
  const totalPages = Math.ceil(images.length / pageSize);
  const canGoPrev = pageIndex > 0;
  const canGoNext = pageIndex < totalPages - 1;

  const start = pageIndex * pageSize;
  const currentImages = images.slice(start, start + pageSize);

  const handlePrev = () => {
    if (!canGoPrev) return;
    setPageIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!canGoNext) return;
    setPageIndex((prev) => prev + 1);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white w-full">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10 lg:py-14">
        <div className="grid lg:grid-cols-[minmax(0,3fr)_minmax(260px,1.1fr)] gap-10 lg:gap-12">
          {/* ---------- INFO SECTION ---------- */}
          <div className="order-1 lg:order-2 lg:pl-0">
            <div className="bg-[#f4f5ee] px-8 py-10 lg:px-10 lg:py-12 h-full">
              <aside className="lg:sticky lg:top-4 flex flex-col justify-between">
                <div>
                  <h2 className="mt-25 text-2xl lg:text-3xl font-light italic tracking-wide mb-8">
                    {basic_info?.full_name}
                  </h2>

                  <dl className="space-y-3 text-[11px] tracking-[0.24em] uppercase">
                    <div className="flex justify-between">
                      <dt>Height</dt>
                      <dd className="tracking-normal ml-6">
                        {profile?.height}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Bust</dt>
                      <dd className="tracking-normal ml-6">
                        {profile?.chest_bust}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Waist</dt>
                      <dd className="tracking-normal ml-6">
                        {profile?.waist}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Hips</dt>
                      <dd className="tracking-normal ml-6">
                        {profile?.hips}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Shoe</dt>
                      <dd className="tracking-normal ml-6">
                        {profile?.shoe_size}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Hair</dt>
                      <dd className="tracking-normal ml-6">
                        {profile?.hair_color}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Eyes</dt>
                      <dd className="tracking-normal ml-6 text-gray-500">
                        {profile?.eye_color}
                      </dd>
                    </div>

                    <div className="flex justify-between pt-2">
                      <dt className="uppercase">More</dt>
                      <dd>
                        <button
                          type="button"
                          onClick={() => setIsProfileModalOpen(true)}
                          className="tracking-normal ml-6 text-gray-600 underline underline-offset-2 hover:text-black"
                        >
                          Profile Detail
                        </button>
                      </dd>
                    </div>
                    
                    {/* Social Media Icons Section */}
                    <div className="flex flex-wrap gap-4 mt-8 pt-4 border-t border-gray-200">
                      {social_links && Object.entries(social_links).map(([key, value]) => {
                        if (value && socialIconsMap[key]) {
                          return (
                            <a
                              key={key}
                              href={value}
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
                </div>
              </aside>
            </div>
          </div>

          {/* ---------- LEFT SIDE ---------- */}
          <div className="order-2 lg:order-1">
            <div className="w-full aspect-video bg-black overflow-hidden">
              <video
                src={media_gallery?.video}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls
              />
            </div>

            <div className="mt-10 space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                {currentImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img || FALLBACK_IMAGE}
                    alt="Model"
                    className="w-full h-full object-cover"
                  />
                ))}
              </div>
            </div>

            {/* ---------- BOTTOM NAV (UNCHANGED UI) ---------- */}
            <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between gap-6">
              <button
                onClick={handlePrev}
                disabled={!canGoPrev}
                className={`flex items-center gap-3 text-xs tracking-[0.18em] uppercase ${
                  !canGoPrev
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center border border-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M15 18l-6-6 6-6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-[11px]">Previous</span>
              </button>

              <span className="text-[11px] tracking-[0.18em] uppercase text-gray-500">
                {pageIndex + 1} / {totalPages}
              </span>

              <button
                onClick={handleNext}
                disabled={!canGoNext}
                className={`flex items-center gap-3 text-xs tracking-[0.18em] uppercase ${
                  !canGoNext
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <span className="text-[11px]">Next</span>
                <span className="inline-flex h-10 w-10 items-center justify-center border border-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M9 6l6 6-6 6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- PROFILE DETAIL MODAL (UI SAME) ---------- */}
      <div
        className={`fixed inset-0 z-[1100] flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isProfileModalOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsProfileModalOpen(false)}
      >
        <ModelDetailModal modaldata={modelData} />
      </div>

      {/* Scroll to top */}
      <button
        onClick={handleScrollTop}
        className="fixed bottom-6 right-6 h-10 w-10 flex items-center justify-center bg-black text-white hover:bg-gray-900 transition rounded-none"
      >
        ↑
      </button>
    </div>
  );
};

export default ModelPortfolioPage;