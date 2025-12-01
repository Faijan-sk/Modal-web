// src/pages/signUp/ProfessionalInfoForm.jsx
import React, { useState } from "react";

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

        {/* Chips with Primary → White Gradient + TEXT PRIMARY */}
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
    experience_level: "",
    Interrested_catagories: [],
    languages: [],
    skills: [],
  });

  const [errors, setErrors] = useState({});

  const handleExperienceChange = (e) => {
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

  const handleTagChange = (name, values) => {
    setFormData((prev) => ({
      ...prev,
      [name]: values,
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
      const value = formData[field];

      if (Array.isArray(value)) {
        if (value.length === 0) newErrors[field] = "This field is required.";
      } else {
        if (!value || value.trim() === "") newErrors[field] = "This field is required.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      ...formData,
      Interrested_catagories: formData.Interrested_catagories.join(", "),
      languages: formData.languages.join(", "),
      skills: formData.skills.join(", "),
    };

    if (onSubmitSuccess) onSubmitSuccess(payload);
    else {
      console.log("PROFESSIONAL INFO PAYLOAD:", payload);
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
          onChange={handleExperienceChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        >
          <option value="">Select experience level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Professional">Professional</option>
          <option value="Expert">Expert</option>
        </select>
        {errors.experience_level && (
          <p className="mt-1 text-xs text-red-500">{errors.experience_level}</p>
        )}
      </div>

      {/* Tag Inputs */}
      <TagInput
        name="Interrested_catagories"
        label="Interested Categories"
        helperText="(type + Enter)"
        placeholder="Fashion, Commercial, Runway..."
        values={formData.Interrested_catagories}
        onChange={handleTagChange}
        error={errors.Interrested_catagories}
      />

      <TagInput
        name="languages"
        label="Languages"
        helperText="(type + Enter)"
        placeholder="English, Hindi, Marathi..."
        values={formData.languages}
        onChange={handleTagChange}
        error={errors.languages}
      />

      <TagInput
        name="skills"
        label="Skills"
        helperText="(type + Enter)"
        placeholder="Ramp walk, Acting, Dancing..."
        values={formData.skills}
        onChange={handleTagChange}
        error={errors.skills}
      />

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
