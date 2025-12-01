// src/pages/signUp/ProfessionalInfoForm.jsx
import React, { useState } from "react";

function ProfessionalInfoForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    experience_level: "",
    Interrested_catagories: "",
    languages: "",
    skills: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "experience_level",
      "Interrested_catagories",
      "languages",
      "skills",
    ];

    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = "This field is required.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Step 1 success → parent ko data bhejo
    if (onSubmitSuccess) {
      onSubmitSuccess(formData);
    } else {
      console.log("PROFESSIONAL INFO PAYLOAD:", formData);
      alert("Professional info form submitted (check console).");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl space-y-6 bg-white"
    >
      <h2 className="text-lg font-semibold tracking-[0.16em] uppercase text-gray-800">
        Professional Information
      </h2>

      {/* Experience Level */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Experience Level
        </label>
        <select
          name="experience_level"
          value={formData.experience_level}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        >
          <option value="">Select experience level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Professional">Professional</option>
          <option value="Expert">Expert</option>
        </select>
        {errors.experience_level && (
          <p className="mt-1 text-xs text-red-500">
            {errors.experience_level}
          </p>
        )}
      </div>

      {/* Interested Categories */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Interested Categories
          <span className="text-xs text-gray-500 ml-1">
            (comma separated or short description)
          </span>
        </label>
        <textarea
          name="Interrested_catagories"
          placeholder="e.g. Fashion, Commercial, Runway, Print, TVC..."
          value={formData.Interrested_catagories}
          onChange={handleChange}
          rows={3}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full resize-y focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
        {errors.Interrested_catagories && (
          <p className="mt-1 text-xs text-red-500">
            {errors.Interrested_catagories}
          </p>
        )}
      </div>

      {/* Languages */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Languages
          <span className="text-xs text-gray-500 ml-1">
            (comma separated)
          </span>
        </label>
        <input
          type="text"
          name="languages"
          placeholder="e.g. English, Hindi, Marathi"
          value={formData.languages}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
        {errors.languages && (
          <p className="mt-1 text-xs text-red-500">{errors.languages}</p>
        )}
      </div>

      {/* Skills */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Skills
          <span className="text-xs text-gray-500 ml-1">
            (comma separated or description)
          </span>
        </label>
        <textarea
          name="skills"
          placeholder="e.g. Ramp walk, Acting, Dancing, Posing, Voice-over..."
          value={formData.skills}
          onChange={handleChange}
          rows={3}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full resize-y focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
        {errors.skills && (
          <p className="mt-1 text-xs text-red-500">{errors.skills}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="relative w-full mt-2 py-2 rounded-lg font-semibold tracking-[0.12em] uppercase text-sm bg-black !text-white hover:bg-primary hover:!text-white transition"
      >
        Save Professional Info
      </button>
    </form>
  );
}

export default ProfessionalInfoForm;
