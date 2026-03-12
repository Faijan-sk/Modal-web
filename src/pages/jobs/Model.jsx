import React, { useEffect, useState } from "react";
import useJwt from "../../endpoints/jwt/useJwt";

const BlankModal = ({ isOpen, onClose ,job ,isApplied }) => {
  if (!isOpen) return null;

const [save, setSave] = useState("Save");
const [isApplying, setIsApplying] = useState(false);
const [applied, setApplied] = useState(false);
  
  
const handleApply = async () => {
  if (!job?.uuid) {
    console.error("Job UUID not found");
    return;
  }

  try {
    setIsApplying(true);

    const payload = {
      job_uuid: job.uuid, // 👈 EXACT backend requirement
    };

    console.log("Apply payload:", payload); // 🔍 debug once

    const response = await useJwt.applyjob(payload);

    console.log("Applied successfully:", response);

    setApplied(true); // ✅ success state
  } catch (error) {
    console.error("Apply failed:", error);
  } finally {
    setIsApplying(false);
  }
};



  return (
    <div className="mt-15 fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white w-[90%] md:w-1/2 h-[80vh] rounded-[16px] shadow-lg z-10 overflow-y-auto p-6">
        {/* Close Button */}
        <button
          className="absolute text-gray-500 hover:text-black text-xl leading-none top-3 right-3"
          onClick={onClose}
        >
          ×
        </button>

        <div className="flex justify-between items-start gap-4 mt-10">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {job.job_title}( {job.gender})
            </h1>

            <div className="flex items-center gap-2 mt-1 text-sm">
              <span className="text-primary font-medium">
                {job?.agency_profile?.company_name}
              </span>
              <svg
                className="w-4 h-4 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M14 3h7v7m0-7L10 14" />
                <path d="M5 5v14h14v-7" />
              </svg>
            </div>

            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <span>{job.city} , {job.country}· Onsite</span>
              <span>•</span>
              <span>Posted 2 days ago</span>
              <span>•</span>
              <span>120 Applicants</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
          </div>
        </div>

        {/* Info Cards */}
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
<InfoCard title="Experience" value={`${job.year_of_exp} years`} />
<InfoCard title="Employement Type" value={job.employment_type} />
<InfoCard title="Gender" value={job.gender} />
<InfoCard title="Payment" value={`$ ${job.compensation}`} />
</div>

        {/* Overview */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Description
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed">
            {job.job_description}
          </p>
         <p className="text-sm text-gray-600 leading-relaxed">
          Audition location : {job.street_add}
          </p> 
{job?.audition_start_date && (
<p className="text-sm text-gray-600 leading-relaxed">
Audition from {new Date(job.audition_start_date).toLocaleDateString()} { } 
 to {new Date(job.audition_end_date).toLocaleDateString()} { }
at {job?.audition_location}
</p>
)}
<p>

  
Number of Openeings : {job.num_of_vacancy} , Total working days {job.working_days}
</p>
       
       

        </section>

        <section className="mt-8">
        {job.qualification && <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Qualifications
          </h2> }

          <p className="text-sm text-gray-600 leading-relaxed">
            {job.qualification}
          </p>

          </section>


        <section className="mt-8">

<div className="flex justify-center">



{isApplied?(<>
<button

className="flex items-center justify-center gap-1 px-4 py-2 rounded-lg text-sm font-medium
  transition-all
 bg-primary text-white hover:text-white cursor-not-allowed"
      
>
Applied
</button>
</>) : (<button
onClick={handleApply}
disabled={isApplying || applied}
className={`flex items-center justify-center gap-1 px-4 py-2 rounded-lg text-sm font-medium
  transition-all
  ${
    applied
      ? "bg-primary text-white hover:text-white cursor-not-allowed"
      : "border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
  }`}
>
{applied ? "Applied" : isApplying ? "Applying..." : "Apply"}
</button>)}
  
{/* <button
onClick={handleApply}
disabled={isApplying || applied}
className={`flex items-center justify-center gap-1 px-4 py-2 rounded-lg text-sm font-medium
  transition-all
  ${
    applied
      ? "bg-primary text-white hover:text-white cursor-not-allowed"
      : "border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
  }`}
>
{applied ? "Applied" : isApplying ? "Applying..." : "Apply"}
</button> */}






</div>

<ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
  {job?.required_skills
    ?.split(",")
    .map((skill, index) => (
      <li key={index}>{skill.trim()}</li>
    ))}
</ul>
</section>
      </div>
    </div>
  );
};

const InfoCard = ({ title, value }) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <p className="text-xs text-gray-500">{title}</p>
      <p className="text-sm font-medium text-primary mt-1">
        {value}
      </p>
    </div>
  );
};

export default BlankModal;
