import React, { useState, useMemo } from "react";
import BlankModal from "./Model";

const JOBS_PER_PAGE = 8;

const STATUS_STYLES = {
  applied:  { bg: "#EEF2FF", color: "#4F46E5", label: "Applied" },
  rejected: { bg: "#FEF2F2", color: "#DC2626", label: "Rejected" },
  shortlisted: { bg: "#F0FDF4", color: "#16A34A", label: "Shortlisted" },
  pending:  { bg: "#FFFBEB", color: "#D97706", label: "Pending" },
};

const AppliedJobCards = ({
  jobsData = [],
  searchText,
  location,
  jobType,
  salaryRange,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);

  // ✅ Flatten applied job response — job is nested inside each item
  const filteredJobs = useMemo(() => {
    setPageIndex(0);

    return jobsData.filter((item) => {
      const job = item.job || {};

      if (searchText) {
        const searchLower = searchText.toLowerCase();
        const matchesSearch =
          job.job_title?.toLowerCase().includes(searchLower) ||
          job.job_category?.toLowerCase().includes(searchLower) ||
          job.job_description?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      if (location && location !== "Current Location") {
        const locationLower = location.toLowerCase();
        const matchesLocation =
          job.city?.toLowerCase().includes(locationLower) ||
          job.audition_location?.toLowerCase().includes(locationLower) ||
          job.country?.toLowerCase().includes(locationLower);
        if (!matchesLocation) return false;
      }

      if (jobType) {
        const matchesJobType = job.employment_type
          ?.toLowerCase()
          .includes(jobType.toLowerCase());
        if (!matchesJobType) return false;
      }

      if (salaryRange?.min || salaryRange?.max) {
        const jobSalary = parseFloat(job.compensation) || 0;
        const minSalary = parseFloat(salaryRange.min) || 0;
        const maxSalary = parseFloat(salaryRange.max) || Infinity;
        if (jobSalary < minSalary || jobSalary > maxSalary) return false;
      }

      return true;
    });
  }, [jobsData, searchText, location, jobType, salaryRange]);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const canGoPrev = pageIndex > 0;
  const canGoNext = pageIndex < totalPages - 1;

  const paginatedJobs = filteredJobs.slice(
    pageIndex * JOBS_PER_PAGE,
    pageIndex * JOBS_PER_PAGE + JOBS_PER_PAGE
  );

  return (
    <div className="flex flex-col min-h-[400px]">
      {filteredJobs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No applied jobs found</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
        </div>
      ) : (
        <>
          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {paginatedJobs.map((item, index) => {
              // ✅ Destructure from nested structure
              const {
                application_id,
                application_uuid,
                status,
                applied_at,
                job = {},
              } = item;

              const {
                uuid,
                job_title,
                job_description,
                employment_type,
                city,
                compensation,
                audition_location,
                agency,
              } = job;

              // ✅ Agency name from agency.first_name + agency.last_name
              const agencyName = agency
                ? `${agency.first_name} ${agency.last_name}`
                : "Unknown Agency";

              const rateText = compensation ? ` $${compensation}` : "Not disclosed";
              const tags = [employment_type, city].filter(Boolean);
              const color = "#7C3AED";

              // ✅ Format applied date
              const appliedDate = applied_at
                ? new Date(applied_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Recently";

              // ✅ Status badge style
              const statusStyle =
                STATUS_STYLES[status?.toLowerCase()] || STATUS_STYLES["applied"];

              return (
                <div
                  key={application_uuid || index}
                  className="bg-white rounded-[22px] shadow-[0px_12px_30px_rgba(0,0,0,0.08)] font-inter
                             h-[380px] flex flex-col overflow-hidden"
                >
                  <div className="p-[22px] flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[10px] min-w-0">
                        <span
                          className="w-[36px] h-[36px] rounded-full flex-shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[14px] font-semibold text-black truncate">
                          {agencyName}
                        </span>
                      </div>

                      {/* ✅ Status Badge */}
                      <span
                        className="px-[10px] py-[4px] rounded-[6px] text-[11px] font-semibold"
                        style={{
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.color,
                        }}
                      >
                        {statusStyle.label}
                      </span>
                    </div>

                    {/* ✅ Applied date */}
                    <p className="text-[11px] text-[#888] mt-[10px]">
                      Applied on {appliedDate}
                    </p>

                    <h2 className="text-[20px] font-extrabold leading-[1.2] mt-[10px] mb-[6px] line-clamp-2">
                      {job_title}
                    </h2>

                    <p className="text-[13px] text-[#555] leading-[1.5] line-clamp-3">
                      {job_description}
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

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[16px] font-bold">{rateText}</div>
                        {/* ✅ Show audition location */}
                        <div className="text-[11px] text-[#888] mt-[2px] leading-[1.4]">
                          {audition_location || city || "Location N/A"}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedJob(job);
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
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between gap-6 px-4">
              <button
                onClick={() => canGoPrev && setPageIndex((p) => p - 1)}
                disabled={!canGoPrev}
                className={`flex items-center gap-3 text-xs tracking-[0.18em] uppercase ${
                  !canGoPrev ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center border border-black">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M15 18l-6-6 6-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-[11px]">Previous</span>
              </button>

              <span className="text-[11px] tracking-[0.18em] uppercase text-gray-500">
                {pageIndex + 1} / {totalPages}
              </span>

              <button
                onClick={() => canGoNext && setPageIndex((p) => p + 1)}
                disabled={!canGoNext}
                className={`flex items-center gap-3 text-xs tracking-[0.18em] uppercase ${
                  !canGoNext ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <span className="text-[11px]">Next</span>
                <span className="inline-flex h-10 w-10 items-center justify-center border border-black">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 6l6 6-6 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </div>
          )}
        </>
      )}

      <BlankModal
        isOpen={openModal}
        job={selectedJob}
        isApplied={true}

        onClose={() => {
          setOpenModal(false);
          setSelectedJob(null);
        }}
      />
    </div>
  );
};

export default AppliedJobCards;