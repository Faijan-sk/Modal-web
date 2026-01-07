// src/pages/signUp/BasicInfoForm.jsx
import React, { useEffect, useState } from "react";
import useJwt from "../../endpoints/jwt/useJwt";

function BasicInfoForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    gender: "",
    current_city: "",
    nationality: "",
    home_town: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "gender",
      "current_city",
      "nationality",
      "home_town",
    ];

    const newErrors = {};

    requiredFields.forEach((field) => {
      const value = formData[field];
      if (!value || value.trim() === "") {
        newErrors[field] = "This field is required.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      gender: formData.gender.trim(),
      current_city: formData.current_city.trim(),
      nationality: formData.nationality.trim(),
      home_town: formData.home_town.trim(),
    };

    try {
      setIsSubmitting(true);
      setApiError("");

      const response = await useJwt.updateProfile(payload);
      console.log("BASIC INFO API RESPONSE:", response);

      if (onSubmitSuccess) {
        onSubmitSuccess(response?.data || payload);
      } else {
        console.log("BASIC INFO PAYLOAD:", payload);
        // alert("Basic info form submitted (check console).");
      }
    } catch (error) {
      console.error("Error updating basic info:", error);
      setApiError(
        error?.response?.data?.message ||
          "Something went wrong while saving your info."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🔥 Autofill user basic detail when component loads
  useEffect(() => {
    const fetchBasicDetails = async () => {
      try {
        const res = await useJwt.getBasicDetail();
        console.log("GET BASIC DETAIL RESPONSE:", res);

        if (res?.data?.user) {
          const userData = res.data.user;

          setFormData({
            gender: userData.gender || "",
            current_city: userData.current_city || "",
            nationality: userData.nationality || "",
            home_town: userData.home_town || "", // backend key = home_town
          });
        }
      } catch (error) {
        console.error("Failed to fetch basic detail: ", error);
      }
    };

    fetchBasicDetails();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl space-y-6 bg-white"
    >
      <h2 className="text-lg font-semibold tracking-[0.16em] uppercase text-gray-800">
        Basic Information
      </h2>

      {apiError && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-200 px-3 py-2 rounded">
          {apiError}
        </p>
      )}

      {/* Gender */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Gender
        </label>

        <div className="border border-gray-300 rounded-lg px-3 py-2 bg-white flex items-center gap-4 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
              className="accent-black"
            />
            Male
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
              className="accent-black"
            />
            Female
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === "Other"}
              onChange={handleChange}
              className="accent-black"
            />
            Other
          </label>
        </div>

        {errors.gender && (
          <p className="mt-1 text-xs text-red-500">{errors.gender}</p>
        )}
      </div>

      {/* Current City */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Current City
        </label>
        <input
          type="text"
          name="current_city"
          value={formData.current_city}
          onChange={handleChange}
          placeholder="Enter City name here"
          className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
        />
        {errors.current_city && (
          <p className="mt-1 text-xs text-red-500">{errors.current_city}</p>
        )}
      </div>

      {/* Nationality */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Nationality
        </label>
        <input
          type="text"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          placeholder="Enter Country name here"
          className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
        />
        {errors.nationality && (
          <p className="mt-1 text-xs text-red-500">{errors.nationality}</p>
        )}
      </div>

      {/* Home City */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Home Town
        </label>
        <input
          type="text"
          name="home_town"
          value={formData.home_town}
          onChange={handleChange}
          placeholder="Enter City name here"
          className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
        />
        {errors.home_town && (
          <p className="mt-1 text-xs text-red-500">{errors.home_town}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="relative w-full mt-2 py-2 rounded-lg font-semibold tracking-[0.12em] uppercase text-sm bg-black !text-white hover:bg-primary hover:!text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Saving..." : "Save Basic Info"}
      </button>
    </form>
  );
}

export default BasicInfoForm;
