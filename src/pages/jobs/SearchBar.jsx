// SearchBar.jsx
import React, { useState } from "react";
import { Search, MapPin, Calendar, DollarSign, Crosshair } from "lucide-react";

export default function SearchBar({
  setSearchText,
  setLocation,
  setJobType,
  setSalaryRange,
}) {
  const [activeField, setActiveField] = useState(null);

  const [locationOpen, setLocationOpen] = useState(false);
  const [locationText, setLocationText] = useState("");

  const [jobTypeOpen, setJobTypeOpen] = useState(false);
  const [jobTypeText, setJobTypeText] = useState("");

  const [salaryOpen, setSalaryOpen] = useState(false);
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");

  return (
    <div className="w-full flex items-center bg-white shadow-md rounded-3xl px-8 py-5 gap-6 relative">

      {/* SEARCH BOX */}
      <div className="flex items-center gap-3 w-[40%] bg-gray-100 px-4 py-3 rounded-xl">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full text-sm"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* LOCATION */}
      <div className="relative">
        <div
          onClick={() => {
            setActiveField("location");
            setLocationOpen(true);
            setJobTypeOpen(false);
            setSalaryOpen(false);
          }}
          className={`
            flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl cursor-pointer
            hover:bg-primary/10 duration-300 transition-all ease-out
            ${activeField === "location" ? "w-[260px]" : "w-[200px]"}
          `}
        >
          <MapPin size={18} className="text-gray-500" />

          {!locationOpen && (
            <span className="text-gray-600 text-sm whitespace-nowrap">
              {locationText || "San Francisco, LA"}
            </span>
          )}

          {locationOpen && (
            <input
              autoFocus
              className="bg-transparent outline-none text-sm w-full"
              placeholder="Enter location..."
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setLocation(locationText);
                  setLocationOpen(false);
                }
              }}
            />
          )}
        </div>

        {locationOpen && (
          <div className="
            absolute left-0 top-full mt-2 w-[260px]
            bg-white shadow-lg rounded-xl py-2 z-50 border border-gray-100
          ">
            <button
              onClick={() => {
                // alert("Using current location...");
                setLocationOpen(false);
              }}
              className="
                flex items-center gap-2 px-3 py-2 w-full text-xs font-semibold
                text-primary hover:bg-primary/10 duration-200
              "
            >
              <Crosshair size={14} /> Use Current Location
            </button>
          </div>
        )}
      </div>

      {/* JOB TYPE */}
      <div className="relative">
        <div
          onClick={() => {
            setActiveField("job");
            setJobTypeOpen(true);
            setLocationOpen(false);
            setSalaryOpen(false);
          }}
          className={`
            flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl cursor-pointer
            hover:bg-primary/10 duration-300 transition-all ease-out
            ${activeField === "job" ? "w-[240px]" : "w-[170px]"}
          `}
        >
          <Calendar size={18} className="text-gray-500" />

          {!jobTypeOpen && (
            <span className="text-gray-600 text-sm whitespace-nowrap">
              {jobTypeText || "Job type"}
            </span>
          )}

          {jobTypeOpen && (
            <input
              autoFocus
              className="bg-transparent outline-none text-sm w-full"
              placeholder="Enter job type..."
              value={jobTypeText}
              onChange={(e) => setJobTypeText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setJobType(jobTypeText);
                  setJobTypeOpen(false);
                }
              }}
            />
          )}
        </div>
      </div>

      {/* SALARY */}
      <div className="relative">
        <div
          onClick={() => {
            setActiveField("salary");
            setSalaryOpen(true);
            setJobTypeOpen(false);
            setLocationOpen(false);
          }}
          className={`
            flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl cursor-pointer
            hover:bg-primary/10 duration-300 transition-all ease-out
            ${activeField === "salary" ? "w-[250px]" : "w-[180px]"}
          `}
        >
          <DollarSign size={18} className="text-gray-500" />

          {!salaryOpen && (
            <span className="text-gray-600 text-sm whitespace-nowrap">
              {salaryMin && salaryMax
                ? `${salaryMin} - ${salaryMax}`
                : "Salary Range"}
            </span>
          )}

          {salaryOpen && (
            <span className="flex items-center gap-2 w-full">
              <input
                autoFocus
                type="number"
                placeholder="Min"
                className="bg-transparent outline-none text-sm w-[45%]"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
              />
              <span className="text-gray-400 text-xs">-</span>
              <input
                type="number"
                placeholder="Max"
                className="bg-transparent outline-none text-sm w-[45%]"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSalaryRange({ min: salaryMin, max: salaryMax });
                    setSalaryOpen(false);
                  }
                }}
              />
            </span>
          )}
        </div>
      </div>

      {/* FIND JOB BUTTON */}
      <button
        className="
          btn-drake-outline bg-primary text-white px-8 py-3 rounded-xl
          font-semibold hover:bg-primary/80 duration-200 whitespace-nowrap text-sm
        "
      >
        Find Job
      </button>

    </div>
  );
}
