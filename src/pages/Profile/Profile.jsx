// src/pages/model/ModelPortfolioPage.jsx
import React, { useState } from "react";
import ProfileVideo from "./../../assets/her-section-one/3917524-hd_2048_1080_25fps-2.mp4";

// modal images
import ModalOne from "./../../assets/modalImages/male-models-biedul2-720x504.jpg";
import ModalTwo from "./../../assets/modalImages/male-models-cheshire-720x1080.webp";
import ModalThree from "./../../assets/modalImages/male-models-david-gandy.webp";
import ModalFour from "./../../assets/modalImages/male-models-jonk-720x504.jpg";
import ModalFive from "./../../assets/modalImages/male-models-lucky.webp";
import ModalSix from "./../../assets/modalImages/male-models-luka-720x504.webp";
import ModalSeven from "./../../assets/modalImages/male-models-noah-720x504.webp";
import ModalEight from "./../../assets/modalImages/male-models-opry.webp";

const ModelPortfolioPage = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // All portfolio images
  const images = [
    { src: ModalOne, alt: "Model 1" },
    { src: ModalTwo, alt: "Model 2" },
    { src: ModalThree, alt: "Model 3" },
    { src: ModalFour, alt: "Model 4" },
    { src: ModalFive, alt: "Model 5" },
    { src: ModalSix, alt: "Model 6" },
    { src: ModalSeven, alt: "Model 7" },
    { src: ModalEight, alt: "Model 8" },
  ];

  const pageSize = 4;
  const [pageIndex, setPageIndex] = useState(0);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-white w-full">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10 lg:py-14">
        {/* MAIN GRID: INFO (right on lg, top on mobile) + LEFT CONTENT */}
        <div className="grid lg:grid-cols-[minmax(0,3fr)_minmax(260px,1.1fr)] gap-10 lg:gap-12">
          {/* ---------- INFO SECTION (TOP ON MOBILE, RIGHT ON LG) ---------- */}
          <div className="order-1 lg:order-2 lg:pl-0">
            <div className="bg-[#f4f5ee] px-8 py-10 lg:px-10 lg:py-12 h-full">
              {/* Sirf info sticky hai lg+ pe */}
              <aside className="lg:sticky lg:top-4 flex flex-col justify-between">
                <div>
                  <h2 className="mt-25 text-2xl lg:text-3xl font-light italic tracking-wide mb-8">
                    Noah Thomsonsa
                  </h2>

                  <dl className="space-y-3 text-[11px] tracking-[0.24em] uppercase">
                    <div className="flex justify-between">
                      <dt>Height</dt>
                      <dd className="tracking-normal ml-6">6&apos;0&quot;</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Bust</dt>
                      <dd className="tracking-normal ml-6">40&quot;</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Waist</dt>
                      <dd className="tracking-normal ml-6">32&quot;</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Hips</dt>
                      <dd className="tracking-normal ml-6">38&quot;</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Shoe</dt>
                      <dd className="tracking-normal ml-6">10.5 US</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Hair</dt>
                      <dd className="tracking-normal ml-6">Black</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Eyes</dt>
                      <dd className="tracking-normal ml-6 text-gray-500">
                        Dark Brown
                      </dd>
                    </div>

                    {/* Profile Detail -> opens modal */}
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
                  </dl>
                  <div className="mt-10 flex items-center justify-between max-w-[180px]">
  <button className="p-1 hover:scale-110 transition-transform">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M21 5.5c-.8.3-1.6.6-2.5.7.9-.6 1.6-1.4 1.9-2.5-.9.6-1.9 1-3 1.2a4.3 4.3 0 0 0-7.4 3c0 .3 0 .6.1.9C7.1 8.6 4.2 7 2.3 4.6c-.4.7-.6 1.4-.6 2.3 0 1.6.8 3 2.1 3.8-.7 0-1.4-.2-2-.5v.1c0 2.2 1.7 4.1 3.8 4.5-.4.1-.8.2-1.3.2-.3 0-.6 0-.9-.1.6 1.9 2.4 3.3 4.6 3.4A8.7 8.7 0 0 1 2 19.3a12 12 0 0 0 6.5 1.9c7.8 0 12-6.7 12-12v-.6c.8-.6 1.5-1.4 2-2.3Z" />
    </svg>
  </button>

  <button className="p-1 hover:scale-110 transition-transform">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M15 3c0 2 1.6 3.6 3.6 3.6h.4v3.2c-1.7 0-3.3-.6-4.6-1.7v6.9a5 5 0 1 1-5-5c.5 0 1 .1 1.4.2v3.3a1.7 1.7 0 1 0 1.7 1.7V3h2.5Z" />
    </svg>
  </button>

  <button className="p-1 hover:scale-110 transition-transform">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <rect x="3" y="6" width="18" height="12" rx="3" ry="3" />
      <polygon points="10,9 16,12 10,15" strokeLinejoin="round" />
    </svg>
  </button>

  <button className="p-1 hover:scale-110 transition-transform">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path
        d="M14 3h-3a4 4 0 0 0-4 4v3H5v3h2v7h3v-7h3l1-3h-4V7a1 1 0 0 1 1-1h3V3z"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  </button>

  <button className="p-1 hover:scale-110 transition-transform">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" ry="4" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="16.6" cy="7.4" r="0.9" />
    </svg>
  </button>
</div>
                </div>
               



                
              </aside>
            </div>
          </div>

          {/* ---------- LEFT SIDE (VIDEO + IMAGES) ---------- */}
          <div className="order-2 lg:order-1">
            {/* Profile Video with normal controls */}
            <div className="w-full aspect-video bg-black overflow-hidden">
              <video
                src={ProfileVideo}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls
              />
            </div>

            {/* Photos (4 at a time) */}
            <div className="mt-10 space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                {currentImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                ))}
              </div>
            </div>

            {/* Bottom navigation (left section ke andar hi) */}
            <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between gap-6">
              {/* Prev */}
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

              {/* Page indicator */}
              <span className="text-[11px] tracking-[0.18em] uppercase text-gray-500">
                {pageIndex + 1} / {totalPages}
              </span>

              {/* Next */}
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

      {/* PROFILE DETAIL MODAL (same style as Navbar modal) */}
      <div
        className={`fixed inset-0 z-[1100] flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isProfileModalOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsProfileModalOpen(false)}
      >
        {/* Modal box */}
        <div
          className={`bg-white rounded-xl shadow-lg px-8 py-6 w-full max-w-[720px] max-h-[90vh] overflow-y-auto transform transition-transform duration-300 ${
            isProfileModalOpen ? "scale-100 translate-y-0" : "scale-95 -translate-y-2"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <div className="flex justify-end">
            <button
              className="text-gray-500 hover:text-black text-xl leading-none"
              onClick={() => setIsProfileModalOpen(false)}
            >
              ×
            </button>
          </div>

          {/* Modal content */}
          <div className="mt-2">
            <h3 className="text-xl font-light italic mb-4">
              Public Profile – Noah Thomson
            </h3>

            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div className="space-y-2">
                <p>
                  <span className="font-semibold mr-1">Height:</span> 6&apos;0&quot;
                </p>
                <p>
                  <span className="font-semibold mr-1">Bust:</span> 40&quot;
                </p>
                <p>
                  <span className="font-semibold mr-1">Waist:</span> 32&quot;
                </p>
                <p>
                  <span className="font-semibold mr-1">Hips:</span> 38&quot;
                </p>
                <p>
                  <span className="font-semibold mr-1">Shoe:</span> 10.5 US
                </p>
              </div>

              <div className="space-y-2">
                <p>
                  <span className="font-semibold mr-1">Hair:</span> Black
                </p>
                <p>
                  <span className="font-semibold mr-1">Eyes:</span> Dark Brown
                </p>
                <p>
                  <span className="font-semibold mr-1">Location:</span> Mumbai,
                  India
                </p>
                <p>
                  <span className="font-semibold mr-1">Experience:</span> 5+ years
                  in fashion & editorial
                </p>
                <p>
                  <span className="font-semibold mr-1">Categories:</span> Runway,
                  Editorial, Commercial
                </p>
              </div>
            </div>

            <div className="mt-6 text-sm leading-relaxed text-gray-700">
              <p>
                Noah has worked with multiple international brands and high-end
                editorials. Available for runway, campaigns, and commercial
                shoots. For bookings and collaborations, please contact the
                Drake Online agency.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={handleScrollTop}
        className="fixed bottom-6 right-6 h-10 w-10 flex items-center justify-center bg-black text-white hover:bg-gray-900 transition rounded-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M5 15l7-7 7 7"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default ModelPortfolioPage;
  