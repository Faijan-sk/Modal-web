// src/pages/model/ModelPortfolioPage.jsx
import React from "react";

const ModelPortfolioPage = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white mt-30">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10 lg:py-14">
        {/* MAIN GRID: LEFT (video+images) | RIGHT (details) */}
        <div className="grid lg:grid-cols-[minmax(0,3fr)_minmax(260px,1.1fr)] gap-10 lg:gap-12">
          {/* ------------------ LEFT SIDE ------------------ */}
          <div>
            {/* Video */}
            <div className="w-full aspect-video bg-black overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/5Z7jTz6vjps"
                title="How to take casting snaps"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Photos */}
            <div className="mt-10 space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <img
                  src="https://images.pexels.com/photos/1570236/pexels-photo-1570236.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Model 1"
                  className="w-full h-full object-cover"
                />
                <img
                  src="https://images.pexels.com/photos/1570237/pexels-photo-1570237.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Model 2"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <img
                  src="https://images.pexels.com/photos/1570238/pexels-photo-1570238.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Model 3"
                  className="w-full h-full object-cover"
                />
                <img
                  src="https://images.pexels.com/photos/1570239/pexels-photo-1570239.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Model 4"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bottom navigation (left section ke andar hi) */}
            <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between gap-6">
              {/* Prev */}
              <button className="flex items-center gap-3 text-xs tracking-[0.18em] uppercase">
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
                <span className="text-[11px]">LIAM CARTER</span>
              </button>

              {/* Next */}
              <button className="flex items-center gap-3 text-xs tracking-[0.18em] uppercase">
                <span className="text-[11px]">MILA VESPER</span>
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

          {/* ------------------ RIGHT SIDE (STICKY DETAILS) ------------------ */}
          <div className="lg:pl-0">
            <aside className="bg-[#f4f5ee] px-8 py-10 lg:px-10 lg:py-12 lg:sticky lg:top-4 flex flex-col justify-between h-[calc(100vh-8rem)]">
              <div>
                <h2 className="text-2xl lg:text-3xl font-light italic tracking-wide mb-8">
                  Noah Thomson
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
                </dl>
              </div>

              <button className="mt-10 flex items-center gap-3 text-[11px] tracking-[0.24em] uppercase">
                <span className="inline-flex h-7 w-7 items-center justify-center border border-black rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect x="4" y="4" width="16" height="16" rx="4" ry="4" strokeWidth="1.4" />
                    <circle cx="12" cy="12" r="3.2" strokeWidth="1.4" />
                    <circle cx="16.6" cy="7.4" r="0.9" strokeWidth="1.4" />
                  </svg>
                </span>
                <span>@ NOAH.T</span>
              </button>
            </aside>
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