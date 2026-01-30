import React, { useState } from "react";
import useJwt from "./../../endpoints/jwt/useJwt";

export default function CompanyCreateForm({ modalClose }) {
  const [formData, setFormData] = useState({
    job_title: "",
    job_category: "",
    job_description: "",
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
  });

  const [isLoading, setIsLoading] = useState(false);
const today = new Date().toISOString().split("T")[0];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      job_title: formData.job_title,
      job_category: formData.job_category,
      job_description: formData.job_description,
      gender: formData.gender,
      minimum_age: Number(formData.minimum_age),
      maximum_age: Number(formData.maximum_age),
      employment_type: formData.employment_type,
      num_of_vacancy: Number(formData.num_of_vacancy),
      working_days: Number(formData.working_days),
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
      debugger
      const response = await useJwt.createJob(payload);
      console.log('###################333' , response )
      
     
      if (response && (response.status === 200 || response.status === 201 || response.data)) {
        alert("Job created successfully!");
        
        setFormData({
          job_title: "",
          job_category: "",
          job_description: "",
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
        });

       
        setTimeout(() => {
          modalClose();
        }, 1000); 
        
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Create job failed", error);
      alert(error?.response?.data?.message || "Failed to create job. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-lg font-semibold tracking-[0.16em] uppercase text-gray-800">
        Create Job
      </h2>

      {/* Job Title */}
      <div>
  <label className="text-sm font-medium mb-1 block">Job Title</label>
  <input
    type="text"
    placeholder="Enter Job Title"
    value={formData.job_title}
    onChange={(e) => {
      const value = e.target.value;
      // allow only alphabets and spaces
      if (/^[A-Za-z ]*$/.test(value)) {
        handleChange("job_title", value);
      }
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
      const value = e.target.value;
      // allow only alphabets and spaces
      if (/^[A-Za-z ]*$/.test(value)) {
        handleChange("job_category", value);
      }
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
      const value = e.target.value;
      // allow alphabets, numbers, space, comma
      if (/^[A-Za-z0-9 ,]*$/.test(value)) {
        handleChange("job_description", value);
      }
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
        const value = e.target.value;
        if (value === "" || Number(value) >= 0) {
          handleChange("minimum_age", value);
        }
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
        const value = e.target.value;
        if (value === "" || Number(value) >= 0) {
          handleChange("maximum_age", value);
        }
      }}
      className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
      required
    />
  </div>
</div>


      {/* Employment Type */}
      <div>
  <label className="text-sm font-medium mb-1 block">Employment Type</label>
  <input
    type="text"
    placeholder="Enter Employment Type (e.g., Full-time, Part-time)"
    value={formData.employment_type}
    onChange={(e) => {
      const value = e.target.value;
      // allow alphabets, numbers, space, dash, comma
      if (/^[A-Za-z0-9 ,\-]*$/.test(value)) {
        handleChange("employment_type", value);
      }
    }}
    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
    required
  />
</div>


      {/* Number of Vacancy and Working Days */}
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
        const value = e.target.value;
        if (value === "" || (/^\d+$/.test(value))) {
          handleChange("num_of_vacancy", value);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "-" || e.key === "e" || e.key === ".") {
          e.preventDefault();
        }
      }}
      className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
      required
    />
  </div>

  <div>
    <label className="text-sm font-medium mb-1 block">
      Working Days
    </label>
    <input
      type="number"
      min={0}
      step={1}
      placeholder="Enter Working Days"
      value={formData.working_days}
      onChange={(e) => {
        const value = e.target.value;
        if (value === "" || (/^\d+$/.test(value))) {
          handleChange("working_days", value);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "-" || e.key === "e" || e.key === ".") {
          e.preventDefault();
        }
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
      const value = e.target.value;
      // allow alphabets, numbers, space, comma
      if (/^[A-Za-z0-9 ,]*$/.test(value)) {
        handleChange("audition_location", value);
      }
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
      onChange={(e) => handleChange("audition_start_date", e.target.value)}
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
      const value = e.target.value;
      if (value === "" || /^\d+$/.test(value)) {
        handleChange("year_of_exp", value);
      }
    }}
    onKeyDown={(e) => {
      if (e.key === "-" || e.key === "e" || e.key === ".") {
        e.preventDefault();
      }
    }}
    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
    required
  />
</div>


      {/* Compensation */}
      <div>
  <label className="text-sm font-medium mb-1 block">
    Compensation
  </label>
  <input
    type="text"
    placeholder="Enter Compensation"
    value={formData.compensation}
    onChange={(e) => {
      const value = e.target.value;
      // allow only alphabets and spaces
      if (/^[A-Za-z ]*$/.test(value)) {
        handleChange("compensation", value);
      }
    }}
    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
    required
  />
</div>


      {/* Address */}
      <div>
  <label className="text-sm font-medium mb-1 block">
    Street Address
  </label>
  <input
    type="text"
    placeholder="Enter Street Address"
    value={formData.street_add}
    onChange={(e) => {
      const value = e.target.value;
      // allow alphabets, numbers, space, comma, dot
      if (/^[A-Za-z0-9 ,\.]*$/.test(value)) {
        handleChange("street_add", value);
      }
    }}
    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
    required
  />
</div>


      {/* City and Postal Code */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">City</label>
          <input
  type="text"
  placeholder="Enter City"
  value={formData.city}
  onChange={(e) => {
    const value = e.target.value;
    if (/^[A-Za-z ]*$/.test(value)) {
      handleChange("city", value);
    }
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
    const value = e.target.value;
    // allow only numbers and max 5 digits
    if (/^\d{0,5}$/.test(value)) {
      handleChange("postal_code", value);
    }
  }}
  onKeyDown={(e) => {
    if (e.key === "-" || e.key === "e" || e.key === ".") {
      e.preventDefault();
    }
  }}
  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
  required
/>

        </div>
      </div>

      {/* Country */}
      <div>
  <label className="text-sm font-medium mb-1 block">
    Country
  </label>
  <input
    type="text"
    placeholder="Enter Country"
    value={formData.country}
    onChange={(e) => {
      const value = e.target.value;
      // allow only alphabets, numbers, and space
      if (/^[A-Za-z0-9 ]*$/.test(value)) {
        handleChange("country", value);
      }
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
        {isLoading ? "Creating..." : "Create Job"}
      </button>
    </form>
  );
}