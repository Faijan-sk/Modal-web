import React, { useState } from "react";
import { Search } from "lucide-react";
import CreateJobsForm from "../forms/CreateJobsForm";

export default function SearchBar() {
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");

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
       className=" btn-drake-outline bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary/80 duration-200 whitespace-nowrap text-sm " >
         Create Jobs
          </button>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-1060">
          <div className="bg-white w-[60%] rounded-xl p-6 relative">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

          
            
            <CreateJobsForm />
          
          </div>
        </div>
      )}
    </div>
  );
}
