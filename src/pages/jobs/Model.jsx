  import React, { useEffect, useState } from "react";
  import useJwt from "../../endpoints/jwt/useJwt";

  const BlankModal = ({ isOpen, onClose ,job }) => {
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
    alert("Failed to apply. Please try again.");
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
                {job.job_role}( {job.gender})
              </h1>

              <div className="flex items-center gap-2 mt-1 text-sm">
                <span className="text-primary font-medium">
                  {job.agency.company_name}
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
                <span>{job.location}· Onsite</span>
                <span>•</span>
                <span>Posted 2 days ago</span>
                <span>•</span>
                <span>120 Applicants</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
  onClick={() => setSave("Saved")}
  className="flex items-center gap-1 px-3 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100"
>
  ♡ {save}
</button>

              <button className="flex items-center gap-1 px-3 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100">
                ↗ Share
              </button>
<button
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
  {isApplying ? "Applying..." : applied ? "Applied" : "Apply Now"}
</button>


            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <InfoCard title="Experience" value="Freshers Welcome" />
           <InfoCard title="Work Type" value={job.project_type} />
            <InfoCard title="Gender" value={job.gender} />
            <InfoCard title="Payment" value={job.pay} />
          </div>

          {/* Overview */}
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Description
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed">
              {job.description}
            </p>

            {/* <p className="text-sm text-gray-600 leading-relaxed mt-4">
              This opportunity is open to freshers as well as experienced models
              who are comfortable in front of the camera and have a strong sense
              of style and presence.
            </p>

            <p className="text-sm text-gray-600 leading-relaxed mt-4">
              Selected candidates will work with professional photographers,
              stylists, and fashion brands.
            </p> */}
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Qualifications
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed">
              {job.qualifications}
            </p>

            </section>

          {/* Responsibilities */}
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Responsibilities
            </h2>

            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
              <li>Participate in fashion shoots and commercial ads.</li>
              <li>Pose confidently according to creative direction.</li>
              <li>Maintain professional attitude during shoots.</li>
              <li>Attend scheduled auditions and fittings.</li>
              <li>Collaborate with photographers and designers.</li>
            </ul>
          </section>

          <section className="mt-8">
  <h2 className="text-lg font-semibold text-gray-900 mb-3">
    Requirements and Skills
  </h2>

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
