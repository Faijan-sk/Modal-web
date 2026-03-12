// src/pages/signUp/ProfessionalInfoForm.jsx
import React, { useEffect, useState, useCallback, useRef } from "react";
import useJwt from "../../endpoints/jwt/useJwt";

function TagInput({
  name,
  label,
  helperText,
  placeholder,
  values = [],
  onChange,
  error,
}) {
  const [inputValue, setInputValue] = useState("");

  const addTag = (tag) => {
    const value = tag.trim();
    if (!value || values.includes(value)) return;
    onChange(name, [...values, value]);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  return (
    <div>
      <label className="text-sm font-medium mb-1 text-gray-700 block">
        {label}
        {helperText && <span className="text-xs text-gray-500 ml-1">{helperText}</span>}
      </label>

      <div className={`border rounded-lg px-2 py-2 w-full flex flex-wrap items-center gap-2 bg-white focus-within:ring-1 focus-within:ring-primary ${error ? 'border-red-500' : 'border-gray-300 focus-within:border-primary'}`}>
        {values.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded-full px-3 py-1 text-xs bg-gradient-to-r from-primary/80 to-white text-primary font-medium shadow border border-primary/30"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(name, values.filter((t) => t !== tag))}
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
          onBlur={() => inputValue.trim() && addTag(inputValue)}
        />
      </div>
      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}

function ProfessionalInfoForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    professional_experience: "",
    experience_details: "",
    languages: [],
    skills: [],
    interested_categories: [],
    willing_to_travel: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return; 
    
    const fetchProfessionalInfo = async () => {
      try {
        const response = await useJwt.getProfessionalInfo();
        if (response?.data) {
          const d = response.data;
          setFormData({
            professional_experience: d.professional_experience === true ? "yes" : d.professional_experience === false ? "no" : "",
            experience_details: d.experience_details || "",
            languages: Array.isArray(d.languages) ? d.languages : [],
            skills: Array.isArray(d.skills) ? d.skills : [],
            interested_categories: Array.isArray(d.interested_categories) ? d.interested_categories : [],
            willing_to_travel: d.willing_to_travel === true ? "yes" : d.willing_to_travel === false ? "no" : "",
          });
          hasFetched.current = true;
        }
      } catch (err) {
        console.error("Error fetching professional info:", err);
      }
    };

    fetchProfessionalInfo();
  }, []);

  const handleSimpleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "professional_experience" && value === "no" ? { experience_details: "" } : {}),
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    setApiError("");
  };

  const handleTagChange = useCallback((name, values) => {
    setFormData((prev) => ({ ...prev, [name]: values }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.professional_experience) newErrors.professional_experience = "Required.";
    if (formData.professional_experience === "yes" && !formData.experience_details?.trim()) {
      newErrors.experience_details = "Details are required.";
    }
    if (!formData.willing_to_travel) newErrors.willing_to_travel = "Required.";
    ["languages", "skills", "interested_categories"].forEach(f => {
      if (!formData[f] || formData[f].length === 0) newErrors[f] = "Add at least one item.";
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      professional_experience: formData.professional_experience === "yes",
      experience_details: formData.experience_details.trim(),
      languages: formData.languages,
      skills: formData.skills,
      interested_categories: formData.interested_categories,
      willing_to_travel: formData.willing_to_travel === "yes",
    };

    try {
      setIsSubmitting(true);
      setApiError("");
      const response = await useJwt.professionalFormSet(payload);
      if(response.status == 201 || response.status ==200){
if (onSubmitSuccess) onSubmitSuccess(response.data);
      }
      
    } catch (error) {
      setApiError(error?.response?.data?.message || "Server error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-6 bg-white">
      <h2 className="text-lg font-semibold tracking-[0.16em] uppercase text-gray-800">
        Professional Information
      </h2>

      {apiError && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-200 px-3 py-2 rounded">
          {apiError}
        </p>
      )}

      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">Prior professional experience?</label>
        <div className={`flex gap-4 border rounded-lg px-3 py-2 bg-white ${errors.professional_experience ? 'border-red-500' : 'border-gray-300'}`}>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="radio" name="professional_experience" value="yes" checked={formData.professional_experience === "yes"} onChange={handleSimpleChange} /> Yes
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="radio" name="professional_experience" value="no" checked={formData.professional_experience === "no"} onChange={handleSimpleChange} /> No
          </label>
        </div>
        {errors.professional_experience && <p className="mt-1 text-[11px] text-red-500">{errors.professional_experience}</p>}
      </div>

      {formData.professional_experience === "yes" && (
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">Experience Details</label>
          <textarea
            name="experience_details"
            rows={3}
            value={formData.experience_details}
            onChange={handleSimpleChange}
            className={`border rounded-lg px-3 py-2 w-full text-sm outline-none focus:ring-1 focus:ring-primary ${errors.experience_details ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.experience_details && <p className="mt-1 text-[11px] text-red-500">{errors.experience_details}</p>}
        </div>
      )}

      <TagInput name="interested_categories" label="Interested Categories" placeholder="Fashion, Commercial..." values={formData.interested_categories} onChange={handleTagChange} error={errors.interested_categories} />
      <TagInput name="languages" label="Languages" placeholder="English, French..." values={formData.languages} onChange={handleTagChange} error={errors.languages} />
      <TagInput name="skills" label="Skills" placeholder="Acting, Dancing..." values={formData.skills} onChange={handleTagChange} error={errors.skills} />

      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">Willing to travel?</label>
        <div className={`flex gap-4 border rounded-lg px-3 py-2 bg-white ${errors.willing_to_travel ? 'border-red-500' : 'border-gray-300'}`}>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="radio" name="willing_to_travel" value="yes" checked={formData.willing_to_travel === "yes"} onChange={handleSimpleChange} /> Yes
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="radio" name="willing_to_travel" value="no" checked={formData.willing_to_travel === "no"} onChange={handleSimpleChange} /> No
          </label>
        </div>
        {errors.willing_to_travel && <p className="mt-1 text-[11px] text-red-500">{errors.willing_to_travel}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
      >
        {isSubmitting ? "Saving..." : "Save Professional Info"}
      </button>
    </form>
  );
}

export default ProfessionalInfoForm;