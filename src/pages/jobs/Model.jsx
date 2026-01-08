import React, { useEffect } from "react";
import useJwt from "../../endpoints/jwt/useJwt";

const BlankModal = ({ isOpen, onClose, jobUuid }) => {
  if (!isOpen) return null;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await useJwt.jobDetailsById(jobUuid);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    if (jobUuid) {
      fetchJob();
    }
  }, [jobUuid]);

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
              Fashion Model (Male/Female)
            </h1>

            <div className="flex items-center gap-2 mt-1 text-sm">
              <span className="text-primary font-medium">
                Aura Casting Studio
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
              <span>Mumbai, India · Onsite</span>
              <span>•</span>
              <span>Posted 2 days ago</span>
              <span>•</span>
              <span>120 Applicants</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 px-3 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100">
              ♡ Save
            </button>

            <button className="flex items-center gap-1 px-3 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100">
              ↗ Share
            </button>

           <button  className="flex items-center gap-1 px-3 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100"
                >
  Apply Now
</button>

          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <InfoCard title="Experience" value="Freshers Welcome" />
          <InfoCard title="Work Type" value="Photoshoot / Ramp Walk" />
          <InfoCard title="Gender" value="Male & Female" />
          <InfoCard title="Payment" value="$25,000 – $80,000 / Project" />
        </div>

        {/* Overview */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Description
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed">
            Aura Casting Studio is looking for confident and passionate
            individuals for upcoming fashion shoots, brand advertisements,
            and portfolio building projects.
          </p>

          <p className="text-sm text-gray-600 leading-relaxed mt-4">
            This opportunity is open to freshers as well as experienced models
            who are comfortable in front of the camera and have a strong sense
            of style and presence.
          </p>

          <p className="text-sm text-gray-600 leading-relaxed mt-4">
            Selected candidates will work with professional photographers,
            stylists, and fashion brands.
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

        {/* Requirements */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Requirements and Skills
          </h2>

          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>Good camera presence and confidence.</li>
            <li>No age barrier; freshers can apply.</li>
            <li>Basic grooming and fitness awareness.</li>
            <li>Ability to follow instructions on set.</li>
            <li>Portfolio is a plus but not mandatory.</li>
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
