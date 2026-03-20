import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useJwt from "../../endpoints/jwt/useJwt";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CompanyCreateForm from "../forms/CreateJobsForm"; // apna actual path yahan rakho

const JOBS_PER_PAGE = 8;

// ── Delete Confirmation Modal ──────────────────────────────────────────────────
const DeleteConfirmModal = ({ job, onConfirm, onCancel, isDeleting }) => {
  if (!job) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white rounded-[20px] shadow-2xl w-full max-w-sm mx-4 p-6 flex flex-col gap-4">
        <div className="flex justify-center">
          <div className="bg-red-50 rounded-full p-4">
            <DeleteIcon sx={{ color: "#ef4444", fontSize: 32 }} />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-[18px] font-bold text-gray-800 mb-1">
            Delete Job?
          </h2>
          <p className="text-[13px] text-gray-500">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-700">
              "{job.job_title}"
            </span>
            ? This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-3 mt-2">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 h-[42px] rounded-[10px] border border-gray-200 text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 h-[42px] rounded-[10px] bg-red-500 text-white text-[13px] font-medium hover:bg-red-600 transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Deleting...
              </>
            ) : (
              "Yes, Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Edit Modal ─────────────────────────────────────────────────────────────────
const EditJobModal = ({ job, onClose, onUpdated }) => {
  if (!job) return null;
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1060] p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl min-w-[300px] max-h-[90vh] rounded-xl flex flex-col relative transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-500 hover:text-black text-2xl w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>
        <div className="overflow-y-auto flex-1 p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <CompanyCreateForm
            modalClose={onClose}
            editJob={job}
            onJobCreated={onUpdated}
          />
        </div>
      </div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────
const StaticJobCard = ({ setJobUid }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [deleteModalJob, setDeleteModalJob] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editModalJob, setEditModalJob] = useState(null); // edit modal ke liye

  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await useJwt.getOwnCreatedJobs();
      setJobs(response?.data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
  const paginatedJobs = jobs.slice(
    pageIndex * JOBS_PER_PAGE,
    (pageIndex + 1) * JOBS_PER_PAGE,
  );

  const handleMenuOpen = (event, job) => {
    setAnchorEl(event.currentTarget);
    setSelectedJob(job);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedJob(null);
  };

  const handleEditClick = () => {
    setEditModalJob(selectedJob); // selectedJob modal me pass karo
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteModalJob(selectedJob);
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModalJob) return;
    try {
      setIsDeleting(true);
      await useJwt.deleteJob(deleteModalJob.uuid);
      setJobs((prev) => prev.filter((j) => j.uuid !== deleteModalJob.uuid));
    } catch (error) {
      console.error("Error deleting job:", error);
    } finally {
      setIsDeleting(false);
      setDeleteModalJob(null);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-24">
        <p className="text-gray-400">Fetching your jobs...</p>
      </div>
    );
  if (jobs.length === 0)
    return (
      <div className="flex justify-center py-24">
        <p>No jobs created yet.</p>
      </div>
    );

  return (
    <>
      <DeleteConfirmModal
        job={deleteModalJob}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModalJob(null)}
        isDeleting={isDeleting}
      />

      {/* Edit Modal — sirf yahan, koi aur file nahi */}
      <EditJobModal
        job={editModalJob}
        onClose={() => setEditModalJob(null)}
        onUpdated={() => {
          setEditModalJob(null);
          fetchJobs();
        }}
      />

      <div className="flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
          {paginatedJobs.map((job) => {
            const tags = [job.employment_type, job.city].filter(Boolean);
            return (
              <div
                key={job.uuid}
                className="bg-white rounded-[22px] shadow-md h-[360px] flex flex-col"
              >
                <div className="p-[22px] flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <h1 className="text-xs text-gray-400">Job Title</h1>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, job)}
                      sx={{ color: "gray" }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </div>
                  <h2 className="text-[20px] font-bold mt-2 mb-2 line-clamp-2">
                    {job.job_title}
                  </h2>
                  <p className="text-[13px] text-[#555] line-clamp-3">
                    {job.job_description}
                  </p>
                  <p className="text-[11px] text-[#888] mt-3">
                    Posted {job.job_sub_date || "Recently"}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 px-2 py-1 rounded-full text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex-1" />
                  <div className="border-t my-3" />
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-[16px] font-bold text-primary">
                        {job.total_applicants}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        Total Applicants
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/model-listing/${job.uuid}`)}
                      className="btn-drake-outline h-[34px] px-3 text-[11px]"
                    >
                      View Applications
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            sx: {
              borderRadius: "12px",
              minWidth: 140,
              boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
            },
          }}
        >
          <MenuItem onClick={handleEditClick}>
            <ListItemIcon>
              <EditIcon fontSize="small" sx={{ color: "#3b82f6" }} />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </MenuItem>
          <MenuItem onClick={handleDeleteClick}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" sx={{ color: "#ef4444" }} />
            </ListItemIcon>
            <ListItemText
              primary="Delete"
              primaryTypographyProps={{ sx: { color: "#ef4444" } }}
            />
          </MenuItem>
        </Menu>

        {totalPages > 1 && (
          <div className="mt-12 flex justify-between px-4">
            <button
              onClick={() => setPageIndex((p) => p - 1)}
              disabled={pageIndex === 0}
            >
              Previous
            </button>
            <span>
              {pageIndex + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPageIndex((p) => p + 1)}
              disabled={pageIndex === totalPages - 1}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default StaticJobCard;
