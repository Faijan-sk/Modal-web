// src/pages/signUp/ProfessionalInfoForm.jsx
import React, { useEffect, useState } from "react";
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
    professional_experience: "",
    experience_details: "",
    languages: [],
    skills: [],
    other_skills: [],
    interested_categories: [],
    other_interested_categories: [],
    willing_to_travel: "",
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

    if (formData.professional_experience === "yes") {
      if (
        !formData.experience_details ||
        formData.experience_details.trim() === ""
      ) {
        newErrors.experience_details =
          "Please describe your experience.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      professional_experience:
        formData.professional_experience === "yes",
      experience_details: formData.experience_details.trim(),
      languages: formData.languages,
      other_languages: formData.other_languages,
      skills: formData.skills,
      other_skills: formData.other_skills,
      interested_categories: formData.interested_categories,
      other_interested_categories:
        formData.other_interested_categories,
      willing_to_travel: formData.willing_to_travel === "yes",
    };

    try {
      setIsSubmitting(true);
      setApiError("");

      const response = await useJwt.professionalFormSet(payload);

      if (onSubmitSuccess) {
        onSubmitSuccess(response?.data || payload);
      }
    } catch (error) {
      setApiError(
        error?.response?.data?.message ||
          "Something went wrong while saving professional info."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ PREFILL DATA (ADDED – NO EXISTING LINE REMOVED)
  useEffect(() => {
    const fetchProfessionalInfo = async () => {
      try {
        const response = await useJwt.getProfessionalInfo();

        if (response?.data) {
          setFormData((prev) => ({
            ...prev,
            professional_experience: response.data.professional_experience
              ? "yes"
              : "no",
            experience_details:
              response.data.experience_details || "",
            languages: response.data.languages || [],
            skills: response.data.skills || [],
            interested_categories:
              response.data.interested_categories || [],
            willing_to_travel: response.data.willing_to_travel
              ? "yes"
              : "no",
          }));
        }
      } catch (err) {
        console.error("Error fetching professional info:", err);
      }
    };

    fetchProfessionalInfo();
  }, []);

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

      {/* Professional Experience */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Do you have prior professional experience?
        </label>
        <div className="flex gap-4 border border-gray-300 rounded-lg px-3 py-2 bg-white">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="professional_experience"
              value="yes"
              checked={formData.professional_experience === "yes"}
              onChange={handleSimpleChange}
            />
            Yes
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="professional_experience"
              value="no"
              checked={formData.professional_experience === "no"}
              onChange={handleSimpleChange}
            />
            No
          </label>
        </div>
      </div>

      {formData.professional_experience === "yes" && (
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Experience Details
          </label>
          <textarea
            name="experience_details"
            rows={3}
            value={formData.experience_details}
            onChange={handleSimpleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
          />
        </div>
      )}

      <TagInput
        name="interested_categories"
        label="Interested Categories"
        placeholder="Fashion, Commercial..."
        values={formData.interested_categories}
        onChange={handleTagChange}
      />

      <TagInput
        name="languages"
        label="Languages"
        placeholder="English, Spanish..."
        values={formData.languages}
        onChange={handleTagChange}
      />

      <TagInput
        name="skills"
        label="Skills"
        placeholder="Acting, Dancing..."
        values={formData.skills}
        onChange={handleTagChange}
      />

      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Are you willing to travel?
        </label>
        <div className="flex gap-4 border border-gray-300 rounded-lg px-3 py-2 bg-white">
          <label>
            <input
              type="radio"
              name="willing_to_travel"
              value="yes"
              checked={formData.willing_to_travel === "yes"}
              onChange={handleSimpleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="willing_to_travel"
              value="no"
              checked={formData.willing_to_travel === "no"}
              onChange={handleSimpleChange}
            />
            No
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 bg-black text-white rounded-lg"
      >
        {isSubmitting ? "Saving..." : "Save Professional Info"}
      </button>
    </form>
  );
}

export default ProfessionalInfoForm;
