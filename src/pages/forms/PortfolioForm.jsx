// src/pages/signUp/MediaUploadForm.jsx
import React, { useEffect, useState } from "react";
import useJwt from "./../../endpoints/jwt/useJwt";

function MediaUploadForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    full_body_front: null,
    full_body_left_side: null,
    full_body_right_side: null,
    head_shot: null,
    profile_photo: null,
    introduction_video: null,
  });

  const [existingMedia, setExistingMedia] = useState({
    full_body_front: "",
    full_body_left_side: "",
    full_body_right_side: "",
    head_shot: "",
    profile_photo: "",
    introduction_video: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getFileNameFromUrl = (url) => {
    if (!url) return "";
    return url.split("/").pop();
  };

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
    setApiError("");
  };

  const handleSubmit = async (e) => {
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
      if (!formData[field] && !existingMedia[field]) {
        newErrors[field] = "This field is required.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      setApiError("");

      const uploadResults = {};

      for (const field of requiredFields) {
        const file = formData[field];

        if (!file && existingMedia[field]) {
          uploadResults[field] = existingMedia[field];
          continue;
        }

        if (!file) continue;

        const body = new FormData();
        body.append("kind", field);
        body.append("file", file);

        const response = await useJwt.modelMediaSet(body);
        uploadResults[field] = response?.data || null;
      }

      if (onSubmitSuccess) {
        onSubmitSuccess(uploadResults);
      }
    } catch (error) {
      setApiError(
        error?.response?.data?.message ||
          "Something went wrong while uploading media."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await useJwt.getMediaFormData();

        if (response?.data) {
          setExistingMedia({
            full_body_front: response.data.full_body_front || "",
            full_body_left_side: response.data.full_body_left_side || "",
            full_body_right_side: response.data.full_body_right_side || "",
            head_shot: response.data.head_shot || "",
            profile_photo: response.data.profile_photo || "",
            introduction_video: response.data.introduction_video || "",
          });
        }
      } catch (err) {
        console.error("Error fetching media data:", err);
      }
    };

    fetchFormData();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl space-y-6 bg-white"
    >
      <h2 className="text-lg font-semibold tracking-[0.16em] uppercase text-gray-800">
        Media
      </h2>

      <p className="text-xs text-gray-500">
        Please upload clear images and a short introduction video. All fields
        are required.
      </p>

      {apiError && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-200 px-3 py-2 rounded">
          {apiError}
        </p>
      )}

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
          className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white"
        />
        {formData.full_body_front && (
          <p className="mt-1 text-xs text-gray-600">
            Selected: {formData.full_body_front.name}
          </p>
        )}
        {!formData.full_body_front && existingMedia.full_body_front && (
          <p className="mt-1 text-xs text-gray-600">
            Existing: {getFileNameFromUrl(existingMedia.full_body_front)} ·{" "}
            <a
              href={existingMedia.full_body_front}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              View
            </a>
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
        </label>
        <input
          type="file"
          name="full_body_left_side"
          accept="image/*"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white"
        />
        {!formData.full_body_left_side &&
          existingMedia.full_body_left_side && (
            <p className="mt-1 text-xs text-gray-600">
              Existing:{" "}
              {getFileNameFromUrl(existingMedia.full_body_left_side)} ·{" "}
              <a
                href={existingMedia.full_body_left_side}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                View
              </a>
            </p>
          )}
      </div>

      {/* Full Body Right Side */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Full Body - Right Side
        </label>
        <input
          type="file"
          name="full_body_right_side"
          accept="image/*"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white"
        />
        {!formData.full_body_right_side &&
          existingMedia.full_body_right_side && (
            <p className="mt-1 text-xs text-gray-600">
              Existing:{" "}
              {getFileNameFromUrl(existingMedia.full_body_right_side)} ·{" "}
              <a
                href={existingMedia.full_body_right_side}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                View
              </a>
            </p>
          )}
      </div>

      {/* Head Shot */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Head Shot
        </label>
        <input
          type="file"
          name="head_shot"
          accept="image/*"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white"
        />
        {!formData.head_shot && existingMedia.head_shot && (
          <p className="mt-1 text-xs text-gray-600">
            Existing: {getFileNameFromUrl(existingMedia.head_shot)} ·{" "}
            <a
              href={existingMedia.head_shot}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              View
            </a>
          </p>
        )}
      </div>

      {/* Profile Photo */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Profile Photo
        </label>
        <input
          type="file"
          name="profile_photo"
          accept="image/*"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white"
        />
        {!formData.profile_photo && existingMedia.profile_photo && (
          <p className="mt-1 text-xs text-gray-600">
            Existing: {getFileNameFromUrl(existingMedia.profile_photo)} ·{" "}
            <a
              href={existingMedia.profile_photo}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              View
            </a>
          </p>
        )}
      </div>

      {/* Introduction Video */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Introduction Video
        </label>
        <input
          type="file"
          name="introduction_video"
          accept="video/*"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white"
        />
        {!formData.introduction_video &&
          existingMedia.introduction_video && (
            <p className="mt-1 text-xs text-gray-600">
              Existing:{" "}
              {getFileNameFromUrl(existingMedia.introduction_video)} ·{" "}
              <a
                href={existingMedia.introduction_video}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                View
              </a>
            </p>
          )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="relative w-full mt-2 py-2 rounded-lg font-semibold tracking-[0.12em] uppercase text-sm bg-black !text-white hover:bg-primary hover:!text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Uploading..." : "Save Media"}
      </button>
    </form>
  );
}

export default MediaUploadForm;
