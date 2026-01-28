// SearchBar.jsx
import React, { useState } from "react";
import { Search, MapPin, Calendar, DollarSign, Crosshair } from "lucide-react";

export default function SearchBar(
 
) {


  return (
    <div className=" my-5 w-full flex items-center bg-white rounded-3xl px-8 py-5 px-20 gap-6 relative text-center justify-center">

      {/* SEARCH BOX */}
      <div className="flex items-center gap-3 w-[60%] bg-gray-100 px-4 py-3 rounded-xl">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full text-sm"
          onChange={(e) => setSearchText(e.target.value)}
        />
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
      <button
        className="
          btn-drake-outline bg-primary text-white px-8 py-3 rounded-xl
          font-semibold hover:bg-primary/80 duration-200 whitespace-nowrap text-sm
        "
      >
        Create Jobs 
      </button>

    </div>
  );
}
