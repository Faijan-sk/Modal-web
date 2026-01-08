import React, { useState } from "react";
import BlankModal from "./Model";

const JobCard = ({ jobsData = [] }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedJobUuid, setSelectedJobUuid] = useState(null);

  console.log(jobsData)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {jobsData.map((job, index) => {
        const {
          agency,
          job_role,
          description,
          posted,
          project_type,
          location,
          pay,
          pay_unit,
          logo,
          saved,
        } = job;

        const companyName = agency?.company_name || "Unknown Agency";
        const postedText = posted ? posted : "Recently";
        const rateText = pay ? `${pay} ${pay_unit || ""}` : "Not disclosed";
        const tags = [project_type, location].filter(Boolean);
        const color = "#7C3AED";

        return (
          <div
            key={job.uuid || index}
            className="bg-white rounded-[22px] shadow-[0px_12px_30px_rgba(0,0,0,0.08)] font-inter
                       h-[460px] flex flex-col overflow-hidden"
          >
            <div className="p-[22px] flex-1 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[10px] min-w-0">
                  {logo ? (
                    <img
                      src={logo}
                      alt={companyName}
                      className="w-[36px] h-[36px] rounded-full object-cover"
                    />
                  ) : (
                    <span
                      className="w-[36px] h-[36px] rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  )}

                  <span className="text-[14px] font-semibold text-black truncate">
                    {companyName}
                  </span>
                </div>

                <button
                  className={`px-[10px] py-[4px] rounded-[6px] text-[11px] border ${
                    saved
                      ? "bg-black text-white border-black"
                      : "border-[#ddd] text-black"
                  }`}
                >
                  {saved ? "Saved" : "Save"}
                </button>
              </div>

              <p className="text-[11px] text-[#888] mt-[10px]">
                Posted {postedText}
              </p>

              <h2 className="text-[20px] font-extrabold leading-[1.2] mt-[10px] mb-[6px] line-clamp-2">
                {job_role}
              </h2>

              <p className="text-[13px] text-[#555] leading-[1.5] line-clamp-3">
                {description}
              </p>

              <div className="flex flex-wrap gap-[8px] mt-[12px]">
                {tags.slice(0, 2).map((tag, i) => (
                  <span
                    key={i}
                    className="bg-[#f1f1f1] px-[10px] py-[4px] rounded-full text-[11px] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex-1" />

              <div className="border-t border-[#eee] my-[3px]" />

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[16px] font-bold">{rateText}</div>
                  <div className="text-[11px] text-[#888] mt-[2px] leading-[1.4]">
                    Free lunch <br />
                    Health Insurance
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedJobUuid(job.uuid);
                    setOpenModal(true);
                  }}
                  className="btn-drake-outline h-[34px] px-2 text-[9px]
                             whitespace-nowrap no-underline
                             flex items-center justify-center"
                >
                  Detail
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <BlankModal
        isOpen={openModal}
        jobUuid={selectedJobUuid}
        onClose={() => {
          setOpenModal(false);
          setSelectedJobUuid(null);
        }}
      />
    </div>
  );
};

export default JobCard;
