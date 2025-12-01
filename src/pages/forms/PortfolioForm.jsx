// src/pages/signUp/MediaUploadForm.jsx
import React, { useState } from "react";

function MediaUploadForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    full_body_front: null,
    full_body_left_side: null,
    full_body_right_side: null,
    head_shot: null,
    profile_photo: null,
    introduction_video: null,
  });

  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files && files[0] ? files[0] : null;

    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "full_body_front",
      "full_body_left_side",
      "full_body_right_side",
      "head_shot",
      "profile_photo",
      "introduction_video",
    ];

    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Yaha tum chaaho toh FormData bana ke API call bhi kar sakte ho
    // abhi ke liye parent ko data bhej rahe hain:
    if (onSubmitSuccess) {
      onSubmitSuccess(formData);
    } else {
      console.log("MEDIA UPLOAD PAYLOAD:", formData);
      alert("Media form submitted (check console).");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl space-y-6 bg-white"
    >
      <h2 className="text-lg font-semibold tracking-[0.16em] uppercase text-gray-800">
        Portfolio Media
      </h2>

      <p className="text-xs text-gray-500">
        Please upload clear images and a short introduction video. All fields
        are required.
      </p>

      {/* Full Body Front */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Full Body - Front
          <span className="text-xs text-gray-500 ml-1">
            (clear, full height, facing camera)
          </span>
        </label>
        <input
          type="file"
          name="full_body_front"
          accept="image/*"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
        {formData.full_body_front && (
          <p className="mt-1 text-xs text-gray-600">
            Selected: {formData.full_body_front.name}
          </p>
        )}
        {errors.full_body_front && (
          <p className="mt-1 text-xs text-red-500">
            {errors.full_body_front}
          </p>
        )}
      </div>

      {/* Full Body Left Side */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Full Body - Left Side
          <span className="text-xs text-gray-500 ml-1">
            (profile from left side)
          </span>
        </label>
        <input
          type="file"
          name="full_body_left_side"
          accept="image/*"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
        {formData.full_body_left_side && (
          <p className="mt-1 text-xs text-gray-600">
            Selected: {formData.full_body_left_side.name}
          </p>
        )}
        {errors.full_body_left_side && (
          <p className="mt-1 text-xs text-red-500">
            {errors.full_body_left_side}
          </p>
        )}
      </div>

      {/* Full Body Right Side */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Full Body - Right Side
          <span className="text-xs text-gray-500 ml-1">
            (profile from right side)
          </span>
        </label>
        <input
          type="file"
          name="full_body_right_side"
          accept="image/*"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
        {formData.full_body_right_side && (
          <p className="mt-1 text-xs text-gray-600">
            Selected: {formData.full_body_right_side.name}
          </p>
        )}
        {errors.full_body_right_side && (
          <p className="mt-1 text-xs text-red-500">
            {errors.full_body_right_side}
          </p>
        )}
      </div>

      {/* Head Shot */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Head Shot
          <span className="text-xs text-gray-500 ml-1">
            (close-up, no heavy filters)
          </span>
        </label>
        <input
          type="file"
          name="head_shot"
          accept="image/*"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
        {formData.head_shot && (
          <p className="mt-1 text-xs text-gray-600">
            Selected: {formData.head_shot.name}
          </p>
        )}
        {errors.head_shot && (
          <p className="mt-1 text-xs text-red-500">{errors.head_shot}</p>
        )}
      </div>

      {/* Profile Photo */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Profile Photo
          <span className="text-xs text-gray-500 ml-1">
            (clear face, simple background)
          </span>
        </label>
        <input
          type="file"
          name="profile_photo"
          accept="image/*"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
        {formData.profile_photo && (
          <p className="mt-1 text-xs text-gray-600">
            Selected: {formData.profile_photo.name}
          </p>
        )}
        {errors.profile_photo && (
          <p className="mt-1 text-xs text-red-500">{errors.profile_photo}</p>
        )}
      </div>

      {/* Introduction Video */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Introduction Video
          <span className="text-xs text-gray-500 ml-1">
            (short intro, walking & simple pose)
          </span>
        </label>
        <input
          type="file"
          name="introduction_video"
          accept="video/*"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
        {formData.introduction_video && (
          <p className="mt-1 text-xs text-gray-600">
            Selected: {formData.introduction_video.name}
          </p>
        )}
        {errors.introduction_video && (
          <p className="mt-1 text-xs text-red-500">
            {errors.introduction_video}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="relative w-full mt-2 py-2 rounded-lg font-semibold tracking-[0.12em] uppercase text-sm bg-black !text-white hover:bg-primary hover:!text-white transition"
      >
        Save Media
      </button>
    </form>
  );
}

export default MediaUploadForm;
