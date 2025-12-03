// src/ProfilePage.jsx
import React, { useState } from "react";

import Post from "./Post";
import Videos from "./Videos";
import Acchivements from "./Acchivements";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("posts"); 

  return (
    <div className="mt-30 min-h-screen bg-gradient-to-b from-slate-50 to-white text-black">
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-14 ">
        {/* ===== TOP PROFILE CARD ===== */}
        <div className="bg-white border rounded-2xl shadow-sm p-5 md:p-7 p-[4px] bg-gradient-to-br from-pink-100 to-pink-300">
          {/* TOP SECTION: Avatar + Basic Info + Hire button */}
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Avatar + ring */}
            <div className="flex justify-center md:block">
              <div className="relative w-28 h-28 md:w-40 md:h-40 rounded-full bg-white ">
                {/* <div className="w-full h-full rounded-full bg-white p-[3px]">
                  <img
                    src="https://via.placeholder.com/300x300?text=Model"
                    alt="profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div> */}
              </div>
            </div>

            {/* Right side info */}
            <div className="flex-1 w-full space-y-4">
              {/* username + buttons */}
              <div className="flex flex-wrap items-center gap-3 justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl md:text-3xl font-semibold">
                      Aubrey Plaza
                    </h2>
                    <span className="text-blue-500 text-xl">✔</span>
                  </div>
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mt-1">
                    Actor • Model • Performer
                  </p>
                </div>

                {/* Primary actions */}
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 text-sm font-medium rounded-full bg-black text-white hover:bg-gray-900 transition">
                    Hire for a Project
                  </button>
                  <button className="px-4 py-2 text-sm font-medium rounded-full border border-gray-300 text-gray-800 hover:bg-gray-50 transition">
                    Contact Agent
                  </button>
                </div>
              </div>

              {/* Bio + short details */}
              <div className="grid md:grid-cols-[2fr,1.3fr] gap-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-900">About Talent</p>
                  <p className="mt-1 text-gray-700">
                    Versatile actor and model with experience in feature films,
                    OTT series and fashion campaigns. Comfortable with dramatic,
                    comedic and edgy roles.
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    Recently seen in <span className="font-semibold">“Emily the Criminal”</span> (Netflix).
                  </p>
                </div>

                {/* Quick meta info */}
                <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-gray-500">Location</p>
                    <p className="font-semibold text-gray-900">Los Angeles, USA</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-gray-500">Experience</p>
                    <p className="font-semibold text-gray-900">10+ years</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-gray-500">Languages</p>
                    <p className="font-semibold text-gray-900">English, Spanish</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-gray-500">Category</p>
                    <p className="font-semibold text-gray-900">Film • TV • Commercial</p>
                  </div>
                </div>
              </div>

              {/* Stats + tags */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-2 border-t border-gray-100">
                {/* Stats */}
                <div className="flex gap-6 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">214</p>
                    <p className="text-gray-500 text-xs">Projects done</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">4.9/5</p>
                    <p className="text-gray-500 text-xs">Casting rating</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">&lt; 24 hrs</p>
                    <p className="text-gray-500 text-xs">Avg. response</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <span className="px-3 py-1 rounded-full bg-black text-white">
                    Featured Talent
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-gray-700">
                    Available for shoots
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-gray-700">
                    Travel friendly
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== TABS + LINE (LINE IS NOW BELOW BUTTONS) ===== */}
        <div className="mt-6">
          {/* Tabs */}
          <div className="flex justify-center gap-10 text-[11px] md:text-xs font-semibold tracking-[0.18em] uppercase text-gray-500">
            {/* POSTS TAB */}
            <button
              className={`relative flex items-center gap-1 py-3 transition ${
                activeTab === "posts"
                  ? "text-black"
                  : "hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("posts")}
            >
              <span>Portfolio</span>
              {activeTab === "posts" && (
                <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-black rounded-full" />
              )}
            </button>

            {/* VIDEOS TAB */}
            <button
              className={`relative flex items-center gap-1 py-3 transition ${
                activeTab === "videos"
                  ? "text-black"
                  : "hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("videos")}
            >
              <span>Showreels</span>
              {activeTab === "videos" && (
                <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-black rounded-full" />
              )}
            </button>

            {/* ACCHIVEMENTS TAB */}
            <button
              className={`relative flex items-center gap-1 py-3 transition ${
                activeTab === "acchivements"
                  ? "text-black"
                  : "hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("acchivements")}
            >
              <span>Awards</span>
              {activeTab === "acchivements" && (
                <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-black rounded-full" />
              )}
            </button>
          </div>

          {/* LINE UNDER THE BUTTONS */}
          <div className="border-t mt-1 border-gray-200" />
        </div>

        {/* ===== TAB CONTENT AREA ===== */}
        <div className="mt-4">
          {activeTab === "posts" && <Post />}
          {activeTab === "videos" && <Videos />}
          {activeTab === "acchivements" && <Acchivements />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
