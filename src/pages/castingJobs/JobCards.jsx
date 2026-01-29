import React, { useState } from "react";


const StaticJobCard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const staticJobs = [
  {
    uuid: "a1",
    agency: { company_name: "Yash Raj Films" },
    job_role: "Lead Actor (Web Series)",
    description:
      "Looking for male actor (25–35) for a crime thriller web series. Strong acting skills required.",
    posted: "2 days ago",
    project_type: "Paid Project",
    location: "Mumbai",
    pay: "$1.5k",
    pay_unit: "/project",
    logo: "",
    saved: false,
  },
  {
    uuid: "a2",
    agency: { company_name: "Casting Bay India" },
    job_role: "Female Model – Fashion Shoot",
    description:
      "Female models required for fashion brand photoshoot. Height 5'6+ preferred.",
    posted: "Today",
    project_type: "Contract",
    location: "Delhi",
    pay: "$100",
    pay_unit: "/day",
    logo: "",
    saved: false,
  },
  {
    uuid: "a3",
    agency: { company_name: "Netflix India" },
    job_role: "Supporting Actor – Series",
    description:
      "Casting supporting roles for upcoming Netflix original series.",
    posted: "1 day ago",
    project_type: "Paid Project",
    location: "Mumbai",
    pay: "$50k",
    pay_unit: "/episode",
    logo: "",
    saved: false,
  },
  {
    uuid: "a4",
    agency: { company_name: "Lakme Fashion Week" },
    job_role: "Ramp Model",
    description:
      "Male & female ramp models needed for Lakme Fashion Week.",
    posted: "3 days ago",
    project_type: "Event",
    location: "Mumbai",
    pay: "$40k",
    pay_unit: "/show",
    logo: "",
    saved: false,
  },
  {
    uuid: "a5",
    agency: { company_name: "Ad Films Studio" },
    job_role: "Child Actor (Age 6–10)",
    description:
      "Looking for expressive child actor for TV commercial.",
    posted: "Yesterday",
    project_type: "Paid Shoot",
    location: "Pune",
    pay: "$15k",
    pay_unit: "/day",
    logo: "",
    saved: false,
  },
  {
    uuid: "a6",
    agency: { company_name: "Music Video House" },
    job_role: "Female Actor – Music Video",
    description:
      "Casting female actor for romantic Hindi music video.",
    posted: "4 days ago",
    project_type: "Music Video",
    location: "Jaipur",
    pay: "$60k",
    pay_unit: "/project",
    logo: "",
    saved: false,
  },
];


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {staticJobs.map((job, index) => {
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
        const rateText = pay ? `${pay} ${pay_unit}` : "Not disclosed";
        const tags = [project_type, location].filter(Boolean);
        const color = "#7C3AED";

        return (
          <div
            key={job.uuid || index}
            className="bg-white rounded-[22px] shadow-[0px_12px_30px_rgba(0,0,0,0.08)]
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
                  <span className="text-[14px] font-semibold truncate">
                    {companyName}
                  </span>
                </div>

                <button
                  className={`px-[10px] py-[4px] rounded-[6px] text-[11px] border ${
                    saved
                      ? "bg-black text-white border-black"
                      : "border-[#ddd]"
                  }`}
                >
                  {saved ? "Saved" : "Save"}
                </button>
              </div>

              <p className="text-[11px] text-[#888] mt-[10px]">
                Posted {posted}
              </p>

              <h2 className="text-[20px] font-extrabold mt-[10px] mb-[6px] line-clamp-2">
                {job_role}
              </h2>

              <p className="text-[13px] text-[#555] line-clamp-3">
                {description}
              </p>

              <div className="flex flex-wrap gap-[8px] mt-[12px]">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-[#f1f1f1] px-[10px] py-[4px] rounded-full text-[11px]"
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
                  <div className="text-[11px] text-[#888]">
                    Free lunch <br /> Health Insurance
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setOpenModal(true);
                  }}
                  className="btn-drake-outline h-[34px] px-2 text-[9px]"
                >
                  Detail
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* <BlankModal
        isOpen={openModal}
        job={selectedJob}
        onClose={() => setOpenModal(false)}
      /> */}
    </div>
  );
};

export default StaticJobCard;
// import React from 'react';

// function JobCards() {
//   return (
//     <div className="d-flex justify-content-center align-items-center">
//       JobCard
//     </div>
//   );
// }

// export default JobCards;
