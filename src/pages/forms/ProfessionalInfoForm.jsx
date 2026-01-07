// src/pages/signUp/ProfessionalInfoForm.jsx
import React, { useState } from "react";
import useJwt from "../../endpoints/jwt/useJwt";

/** Reusable TagInput with gradient */
function TagInput({
  name,
  label,
  helperText,
  placeholder,
  values,
  onChange,
  error,
}) {
  const [inputValue, setInputValue] = useState("");

  const addTag = (tag) => {
    const value = tag.trim();
    if (!value) return;

    if (values.includes(value)) return;

    onChange(name, [...values, value]);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  const handleBlur = () => {
    if (inputValue.trim()) addTag(inputValue);
  };

  const removeTag = (tag) => {
    onChange(
      name,
      values.filter((t) => t !== tag)
    );
  };

  return (
    <div>
      <label className="text-sm font-medium mb-1 text-gray-700 block">
        {label}
        {helperText && (
          <span className="text-xs text-gray-500 ml-1">{helperText}</span>
        )}
      </label>

      <div className="border border-gray-300 rounded-lg px-2 py-2 w-full flex flex-wrap items-center gap-2 bg-white focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
        {/* Chips */}
        {values.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded-full px-3 py-1 text-xs 
                       bg-gradient-to-r from-primary/80 to-white 
                       text-primary font-medium shadow border border-primary/30"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-primary text-[10px] leading-none ml-1 hover:opacity-70"
            >
              ✕
            </button>
          </span>
        ))}

        {/* Input */}
        <input
          type="text"
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm py-1 px-1"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function ProfessionalInfoForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    professional_experience: "",       // "yes" | "no"
    experience_details: "",
    languages: [],
    skills: [],
    other_skills: [],
    interested_categories: [],
    other_interested_categories: [],
    willing_to_travel: "",            // "yes" | "no"
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSimpleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear experience_details when professional_experience changes to "no"
    if (name === "professional_experience" && value === "no") {
      setFormData((prev) => ({
        ...prev,
        experience_details: "",
      }));
    }

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setApiError("");
  };

  const handleTagChange = (name, values) => {
    setFormData((prev) => ({
      ...prev,
      [name]: values,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Required fields
    const requiredFields = [
      "languages",
      "skills",
      "interested_categories",
      "professional_experience",
      "willing_to_travel",
    ];

    requiredFields.forEach((field) => {
      const value = formData[field];

      if (Array.isArray(value)) {
        if (value.length === 0) {
          newErrors[field] = "This field is required.";
        }
      } else {
        if (!value || String(value).trim() === "") {
          newErrors[field] = "This field is required.";
        }
      }
    });

    // experience_details required only if professional_experience is "yes"
    if (formData.professional_experience === "yes") {
      if (!formData.experience_details || formData.experience_details.trim() === "") {
        newErrors.experience_details = "Please describe your experience.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ✅ API payload (exact as backend expects)
    const payload = {
      professional_experience: formData.professional_experience === "yes",
      experience_details: formData.experience_details.trim(),
      languages: formData.languages,
      other_languages: formData.other_languages,
      skills: formData.skills,
      other_skills: formData.other_skills,
      interested_categories: formData.interested_categories,
      other_interested_categories: formData.other_interested_categories,
      willing_to_travel: formData.willing_to_travel === "yes",
    };

    try {
      setIsSubmitting(true);
      setApiError("");

      // 🔥 Tumhara service method
      const response = await useJwt.professionalFormSet(payload);

      console.log("PROFESSIONAL INFO API RESPONSE:", response);

      if (onSubmitSuccess) {
        onSubmitSuccess(response?.data || payload);
      } else {
        console.log("PROFESSIONAL INFO PAYLOAD:", payload);
        // alert("Professional info form submitted (check console).");
      }
    } catch (error) {
      console.error("Error saving professional info:", error);
      setApiError(
        error?.response?.data?.message ||
          "Something went wrong while saving professional info."
      );
    } finally {
      setIsSubmitting(false);
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

      {apiError && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-200 px-3 py-2 rounded">
          {apiError}
        </p>
      )}

      {/* Professional Experience (Yes/No) */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Do you have prior professional experience?
        </label>
        <div className="flex gap-4 border border-gray-300 rounded-lg px-3 py-2 bg-white">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name="professional_experience"
              value="yes"
              checked={formData.professional_experience === "yes"}
              onChange={handleSimpleChange}
              className="accent-black"
            />
            Yes
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name="professional_experience"
              value="no"
              checked={formData.professional_experience === "no"}
              onChange={handleSimpleChange}
              className="accent-black"
            />
            No
          </label>
        </div>
        {errors.professional_experience && (
          <p className="mt-1 text-xs text-red-500">
            {errors.professional_experience}
          </p>
        )}
      </div>

      {/* Experience Details (shown only if professional_experience is "yes") */}
      {formData.professional_experience === "yes" && (
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Experience Details
            <span className="text-xs text-gray-500 ml-1">
              (brands, shoots, years of work)
            </span>
          </label>
          <textarea
            name="experience_details"
            rows={3}
            placeholder="Describe your professional work experience..."
            value={formData.experience_details}
            onChange={handleSimpleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full resize-y bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
          />
          {errors.experience_details && (
            <p className="mt-1 text-xs text-red-500">
              {errors.experience_details}
            </p>
          )}
        </div>
      )}

      {/* Interested Categories */}
      <TagInput
        name="interested_categories"
        label="Interested Categories"
        helperText="(type + Enter)"
        placeholder="Fashion, Commercial, Runway..."
        values={formData.interested_categories}
        onChange={handleTagChange}
        error={errors.interested_categories}
      />

      <TagInput
        name="other_interested_categories"
        label="Other Interested Categories"
        helperText="(type + Enter, optional)"
        placeholder="Additional categories..."
        values={formData.other_interested_categories}
        onChange={handleTagChange}
        error={errors.other_interested_categories}
      />

      {/* Languages */}
      <TagInput
        name="languages"
        label="Languages"
        helperText="(type + Enter)"
        placeholder="English, Spanish, French..."
        values={formData.languages}
        onChange={handleTagChange}
        error={errors.languages}
      />

    

      {/* Skills */}
      <TagInput
        name="skills"
        label="Skills"
        helperText="(type + Enter)"
        placeholder="Ramp walk, Acting, Dancing..."
        values={formData.skills}
        onChange={handleTagChange}
        error={errors.skills}
      />

     

      {/* Willing to Travel */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Are you willing to travel for projects?
        </label>
        <div className="flex gap-4 border border-gray-300 rounded-lg px-3 py-2 bg-white">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name="willing_to_travel"
              value="yes"
              checked={formData.willing_to_travel === "yes"}
              onChange={handleSimpleChange}
              className="accent-black"
            />
            Yes
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name="willing_to_travel"
              value="no"
              checked={formData.willing_to_travel === "no"}
              onChange={handleSimpleChange}
              className="accent-black"
            />
            No
          </label>
        </div>
        {errors.willing_to_travel && (
          <p className="mt-1 text-xs text-red-500">
            {errors.willing_to_travel}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="relative w-full mt-2 py-2 rounded-lg font-semibold tracking-[0.12em] uppercase text-sm bg-black !text-white hover:bg-primary hover:!text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Saving..." : "Save Professional Info"}
      </button>
    </form>
  );
}

export default ProfessionalInfoForm;