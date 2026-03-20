import React, { useState, useEffect } from "react";
import useJwt from "./../../endpoints/jwt/useJwt";

// editJob prop — agar pass hua to edit mode, nahi to create mode
export default function CompanyCreateForm({
  modalClose,
  onJobCreated,
  editJob,
}) {
  const isEditMode = Boolean(editJob);

  const emptyForm = {
    job_title: "",
    job_category: "",
    job_description: "",
    qualification: "",
    gender: "",
    minimum_age: "",
    maximum_age: "",
    employment_type: "",
    num_of_vacancy: "",
    working_days: "",
    audition_location: "",
    audition_start_date: "",
    audition_end_date: "",
    job_sub_date: "",
    year_of_exp: "",
    compensation: "",
    street_add: "",
    city: "",
    postal_code: "",
    country: "",
    travel_provide: false,
  };

  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  // editJob aane par form pre-fill karo
  useEffect(() => {
    if (editJob) {
      setFormData({
        job_title: editJob.job_title ?? "",
        job_category: editJob.job_category ?? "",
        job_description: editJob.job_description ?? "",
        qualification: editJob.qualification ?? "",
        gender: editJob.gender ?? "",
        minimum_age: editJob.minimum_age ?? "",
        maximum_age: editJob.maximum_age ?? "",
        employment_type: editJob.employment_type ?? "",
        num_of_vacancy: editJob.num_of_vacancy ?? "",
        working_days: editJob.working_days ?? "",
        audition_location: editJob.audition_location ?? "",
        audition_start_date: editJob.audition_start_date ?? "",
        audition_end_date: editJob.audition_end_date ?? "",
        job_sub_date: editJob.job_sub_date ?? "",
        year_of_exp: editJob.year_of_exp ?? "",
        compensation: editJob.compensation ?? "",
        street_add: editJob.street_add ?? "",
        city: editJob.city ?? "",
        postal_code: editJob.postal_code ?? "",
        country: editJob.country ?? "",
        travel_provide: editJob.travel_provide ?? false,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editJob]);

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const payload = {
      job_title: formData.job_title,
      job_category: formData.job_category,
      job_description: formData.job_description,
      gender: formData.gender,
      qualification: formData.qualification,
      minimum_age: Number(formData.minimum_age),
      maximum_age: Number(formData.maximum_age),
      employment_type: formData.employment_type,
      num_of_vacancy: Number(formData.num_of_vacancy),
      working_days: formData.working_days,
      audition_location: formData.audition_location,
      audition_start_date: formData.audition_start_date,
      audition_end_date: formData.audition_end_date,
      job_sub_date: formData.job_sub_date,
      year_of_exp: Number(formData.year_of_exp),
      compensation: formData.compensation,
      street_add: formData.street_add,
      city: formData.city,
      postal_code: formData.postal_code,
      country: formData.country,
      travel_provide: formData.travel_provide,
    };

    try {
      // edit mode me updateJob, create mode me createJob
      const response = isEditMode
        ? await useJwt.updateJob(editJob.uuid, payload)
        : await useJwt.createJob(payload);

      if (
        response &&
        (response.status === 200 || response.status === 201 || response.data)
      ) {
        if (onJobCreated) onJobCreated();
        modalClose();
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(
        isEditMode ? "Update job failed" : "Create job failed",
        err,
      );
      setError(
        err?.response?.data?.message || "Failed to save job. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Agar edit mode me applicants > 0 hain to edit block karo
  if (isEditMode && editJob?.total_applicants > 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 gap-5 text-center px-6">
        <div className="bg-yellow-50 rounded-full p-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>
        <h2 className="text-[20px] font-bold text-gray-800">
          Edit Is Not Allowed
        </h2>
        <p className="text-[14px] text-gray-500 max-w-sm">
          This job can no longer be edited as{" "}
          <span className="font-semibold text-gray-800">
            {editJob?.total_applicants} applicant
          </span>{" "}
          has already submitted an application..
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-lg font-semibold tracking-[0.16em] uppercase text-gray-800">
        {isEditMode ? "Edit Job" : "Create Job"}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Job Title */}
      <div>
        <label className="text-sm font-medium mb-1 block">Job Title</label>
        <input
          type="text"
          placeholder="Enter Job Title"
          value={formData.job_title}
          onChange={(e) => {
            if (/^[A-Za-z ]*$/.test(e.target.value))
              handleChange("job_title", e.target.value);
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          required
        />
      </div>

      {/* Job Category */}
      <div>
        <label className="text-sm font-medium mb-1 block">Job Category</label>
        <input
          type="text"
          placeholder="Enter Job Category"
          value={formData.job_category}
          onChange={(e) => {
            if (/^[A-Za-z ]*$/.test(e.target.value))
              handleChange("job_category", e.target.value);
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          required
        />
      </div>

      {/* Job Description */}
      <div>
        <label className="text-sm font-medium mb-1 block">
          Job Description
        </label>
        <textarea
          rows={4}
          placeholder="Enter Job Description"
          value={formData.job_description}
          onChange={(e) => {
            if (/^[A-Za-z0-9 ,]*$/.test(e.target.value))
              handleChange("job_description", e.target.value);
          }}
          onPaste={(e) => {
            e.preventDefault();
            const filtered = e.clipboardData
              .getData("text")
              .replace(/[^A-Za-z0-9 ,]/g, "");
            const { selectionStart: s, selectionEnd: en } = e.target;
            handleChange(
              "job_description",
              formData.job_description.substring(0, s) +
                filtered +
                formData.job_description.substring(en),
            );
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          required
        />
      </div>

      {/* Qualification */}
      <div>
        <label className="text-sm font-medium mb-1 block">
          Qualification Required
        </label>
        <input
          placeholder="Enter Qualification"
          value={formData.qualification}
          onChange={(e) => {
            if (/^[A-Za-z0-9 ,]*$/.test(e.target.value))
              handleChange("qualification", e.target.value);
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          required
        />
      </div>

      {/* Gender */}
      <div>
        <label className="text-sm font-medium mb-1 block">Gender</label>
        <select
          value={formData.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="any">Any</option>
        </select>
      </div>

      {/* Age */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Minimum Age</label>
          <input
            type="number"
            min={0}
            placeholder="Enter Minimum Age"
            value={formData.minimum_age}
            onChange={(e) => {
              if (e.target.value === "" || Number(e.target.value) >= 0)
                handleChange("minimum_age", e.target.value);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Maximum Age</label>
          <input
            type="number"
            min={0}
            placeholder="Enter Maximum Age"
            value={formData.maximum_age}
            onChange={(e) => {
              if (e.target.value === "" || Number(e.target.value) >= 0)
                handleChange("maximum_age", e.target.value);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            required
          />
        </div>
      </div>

      {/* Employment Type */}
      <div>
        <label className="text-sm font-medium mb-1 block">
          Employment Type
        </label>
        <input
          type="text"
          placeholder="Enter Employment Type"
          value={formData.employment_type}
          onChange={(e) => {
            if (/^[A-Za-z0-9 ,\-]*$/.test(e.target.value))
              handleChange("employment_type", e.target.value);
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          required
        />
      </div>

      {/* Vacancies & Working Days */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">
            Number of Vacancies
          </label>
          <input
            type="number"
            min={0}
            step={1}
            placeholder="Enter Number"
            value={formData.num_of_vacancy}
            onChange={(e) => {
              if (e.target.value === "" || /^\d+$/.test(e.target.value))
                handleChange("num_of_vacancy", e.target.value);
            }}
            onKeyDown={(e) => {
              if (["-", "e", "."].includes(e.key)) e.preventDefault();
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Working Days</label>
          <input
            type="text"
            placeholder="Enter Working Days"
            value={formData.working_days}
            onChange={(e) => {
              if (e.target.value === "" || /^\d+$/.test(e.target.value))
                handleChange("working_days", e.target.value);
            }}
            onKeyDown={(e) => {
              if (["-", "e", "."].includes(e.key)) e.preventDefault();
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            required
          />
        </div>
      </div>

      {/* Audition Location */}
      <div>
        <label className="text-sm font-medium mb-1 block">
          Audition Location
        </label>
        <input
          type="text"
          placeholder="Enter Audition Location"
          value={formData.audition_location}
          onChange={(e) => {
            if (/^[A-Za-z0-9 ,]*$/.test(e.target.value))
              handleChange("audition_location", e.target.value);
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          required
        />
      </div>

      {/* Audition Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">
            Audition Start Date
          </label>
          <input
            type="date"
            min={today}
            value={formData.audition_start_date}
            onChange={(e) =>
              handleChange("audition_start_date", e.target.value)
            }
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">
            Audition End Date
          </label>
          <input
            type="date"
            min={today}
            value={formData.audition_end_date}
            onChange={(e) => handleChange("audition_end_date", e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            required
          />
        </div>
      </div>

      {/* Job Submission Date */}
      <div>
        <label className="text-sm font-medium mb-1 block">
          Job Submission Date
        </label>
        <input
          type="date"
          min={today}
          value={formData.job_sub_date}
          onChange={(e) => handleChange("job_sub_date", e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          required
        />
      </div>

      {/* Years of Experience */}
      <div>
        <label className="text-sm font-medium mb-1 block">
          Years of Experience
        </label>
        <input
          type="number"
          min={0}
          step={1}
          placeholder="Enter Years of Experience"
          value={formData.year_of_exp}
          onChange={(e) => {
            if (e.target.value === "" || /^\d+$/.test(e.target.value))
              handleChange("year_of_exp", e.target.value);
          }}
          onKeyDown={(e) => {
            if (["-", "e", "."].includes(e.key)) e.preventDefault();
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          required
        />
      </div>

      {/* Compensation */}
      <div>
        <label className="text-sm font-medium mb-1 block">Compensation</label>
        <input
          type="text"
          placeholder="Enter Compensation"
          value={formData.compensation}
          onChange={(e) => {
            if (/^[0-9.]*$/.test(e.target.value))
              handleChange("compensation", e.target.value);
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          required
        />
      </div>

      {/* Street Address */}
      <div>
        <label className="text-sm font-medium mb-1 block">Street Address</label>
        <input
          type="text"
          placeholder="Enter Street Address"
          value={formData.street_add}
          onChange={(e) => {
            if (/^[A-Za-z0-9 ,\.]*$/.test(e.target.value))
              handleChange("street_add", e.target.value);
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          required
        />
      </div>

      {/* City & Postal Code */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">City</label>
          <input
            type="text"
            placeholder="Enter City"
            value={formData.city}
            onChange={(e) => {
              if (/^[A-Za-z ]*$/.test(e.target.value))
                handleChange("city", e.target.value);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Postal Code</label>
          <input
            type="text"
            placeholder="Enter Postal Code"
            value={formData.postal_code}
            maxLength={5}
            onChange={(e) => {
              if (/^\d{0,5}$/.test(e.target.value))
                handleChange("postal_code", e.target.value);
            }}
            onKeyDown={(e) => {
              if (["-", "e", "."].includes(e.key)) e.preventDefault();
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            required
          />
        </div>
      </div>

      {/* Country */}
      <div>
        <label className="text-sm font-medium mb-1 block">Country</label>
        <input
          type="text"
          placeholder="Enter Country"
          value={formData.country}
          onChange={(e) => {
            if (/^[A-Za-z0-9 ]*$/.test(e.target.value))
              handleChange("country", e.target.value);
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          required
        />
      </div>

      {/* Travel Provided */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.travel_provide}
          onChange={(e) => handleChange("travel_provide", e.target.checked)}
          className="w-4 h-4 accent-primary"
        />
        <label className="text-sm font-medium">Travel Provided</label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="relative w-full mt-2 py-2 rounded-lg font-semibold tracking-[0.12em] uppercase text-sm bg-black !text-white hover:bg-primary hover:!text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading
          ? isEditMode
            ? "Updating..."
            : "Creating..."
          : isEditMode
            ? "Update Job"
            : "Create Job"}
      </button>
    </form>
  );
}
