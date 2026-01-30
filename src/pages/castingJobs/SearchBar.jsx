import React, { useState } from "react";
import { Search } from "lucide-react";
import CreateJobsForm from "../forms/CreateJobsForm";

export default function SearchBar() {
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="my-5 w-full flex items-center bg-white rounded-3xl px-20 py-5 gap-6 relative justify-center">

      {/* SEARCH BOX */}
      <div className="flex items-center gap-3 w-[60%] bg-gray-100 px-4 py-3 rounded-xl">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full text-sm"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <button
        onClick={() => setOpenModal(true)}
        className="btn-drake-outline bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary/80 duration-200 whitespace-nowrap text-sm"
      >
        Create Jobs
      </button>

      {/* MODAL */}
      {openModal && (
        <div 
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1060]"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white w-[90%] max-w-3xl h-[85vh] rounded-xl flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE BUTTON */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 text-gray-500 hover:text-black text-2xl w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>

            {/* SCROLLABLE CONTENT - HIDDEN SCROLLBAR */}
            <div className="overflow-y-auto flex-1 p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <CreateJobsForm modalClose={handleCloseModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}