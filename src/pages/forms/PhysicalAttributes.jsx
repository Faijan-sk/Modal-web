// src/pages/signUp/PhysicalAttributesForm.jsx
import React, { useState } from "react";
import useJwt from "../../endpoints/jwt/useJwt";

function PhysicalAttributesForm({ onSubmitSuccess, gender }) {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    chest_bust: "",
    waist: "",
    hips: "",
    shoulder: "",
    shoe_size: "",
    eye_color: "",
    hair_color: "",
    complexion: "",
    tattoos_piercings: false,
    tattoos_details: "",
    body_type: "",
    suit_jacket_dress_size: "",
    facial_hair: "",
    bust_cup_size: "",
    hair_length: "",
    body_shape: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isMale = gender?.toLowerCase() === "male";
  const isFemale = gender?.toLowerCase() === "female";

  // generic change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setApiError("");
  };

  // numeric-like fields (height, weight etc)
  const handleNumericLikeChange = (e) => {
    const { name, value } = e.target;
    // sirf digits, dot, space, /, - allow
    const cleaned = value.replace(/[^0-9.\s/-]/g, "");
    setFormData((prev) => ({
      ...prev,
      [name]: cleaned,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Common required fields (for all genders)
    const requiredFields = [
      "height",
      "weight",
      "chest_bust",
      "waist",
      "hips",
      "shoulder",
      "shoe_size",
      "eye_color",
      "hair_color",
      "complexion",
      "body_type",
      "hair_length",
      "body_shape",
      "suit_jacket_dress_size",
    ];

    // ✅ Extra required for Male
    if (isMale) {
      requiredFields.push("facial_hair");
    }

    // ✅ Extra required for Female
    if (isFemale) {
      requiredFields.push("bust_cup_size");
    }

    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].toString().trim() === "") {
        newErrors[field] = "This field is required.";
      }
    });

    // If tattoos_piercings is true, tattoos_details is required
    if (formData.tattoos_piercings && !formData.tattoos_details.trim()) {
      newErrors.tattoos_details = "Please provide tattoo/piercing details.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 🔹 Payload according to API structure
    const payload = {
      height: formData.height.trim(),
      weight: formData.weight.trim(),
      chest_bust: formData.chest_bust.trim(),
      waist: formData.waist.trim(),
      hips: formData.hips.trim(),
      shoulder: formData.shoulder.trim(),
      shoe_size: formData.shoe_size.trim(),
      complexion: formData.complexion.trim(),
      eye_color: formData.eye_color.trim(),
      hair_color: formData.hair_color.trim(),
      tattoos_piercings: formData.tattoos_piercings,
      tattoos_details: formData.tattoos_details.trim(),
      suit_jacket_dress_size: formData.suit_jacket_dress_size.trim(),
      hair_length: formData.hair_length.trim(),
      body_type: formData.body_type.trim(),
      body_shape: formData.body_shape.trim(),
      facial_hair: isMale ? formData.facial_hair.trim() : "",
      bust_cup_size: isFemale ? formData.bust_cup_size.trim() : "",
    };

    try {
      setIsSubmitting(true);
      setApiError("");

      // ✅ Tumhara service method
      const response = await useJwt.physicalAttributeSet(payload);

      console.log("PHYSICAL ATTRIBUTES API RESPONSE:", response);

      if (onSubmitSuccess) {
        onSubmitSuccess(response?.data || payload);
      } else {
        console.log("PHYSICAL ATTRIBUTES PAYLOAD:", payload);
        // alert("Physical attributes form submitted (check console).");
      }
    } catch (error) {
      console.error("Error while saving physical attributes:", error);
      setApiError(
        error?.response?.data?.message ||
          "Something went wrong while saving physical attributes."
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
        Physical Attributes
      </h2>

      {apiError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{apiError}</p>
        </div>
      )}

      {/* Row 1: Height + Weight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Height */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Height <span className="text-xs text-gray-500">(cm / ft-in)</span>
          </label>
          <input
            type="text"
            name="height"
            placeholder="e.g. 180 cm or 5'11"
            value={formData.height}
            onChange={handleNumericLikeChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          {errors.height && (
            <p className="mt-1 text-xs text-red-500">{errors.height}</p>
          )}
        </div>

        {/* Weight */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Weight <span className="text-xs text-gray-500">(kg)</span>
          </label>
          <input
            type="text"
            name="weight"
            placeholder="e.g. 70"
            value={formData.weight}
            onChange={handleNumericLikeChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          {errors.weight && (
            <p className="mt-1 text-xs text-red-500">{errors.weight}</p>
          )}
        </div>
      </div>

      {/* Row 2: Chest/Bust + Waist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Chest/Bust */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            {isFemale ? "Bust" : "Chest"}{" "}
            <span className="text-xs text-gray-500">(inches)</span>
          </label>
          <input
            type="text"
            name="chest_bust"
            placeholder={isFemale ? "e.g. 34" : "e.g. 38"}
            value={formData.chest_bust}
            onChange={handleNumericLikeChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          {errors.chest_bust && (
            <p className="mt-1 text-xs text-red-500">{errors.chest_bust}</p>
          )}
        </div>

        {/* Waist */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Waist <span className="text-xs text-gray-500">(inches)</span>
          </label>
          <input
            type="text"
            name="waist"
            placeholder="e.g. 30"
            value={formData.waist}
            onChange={handleNumericLikeChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          {errors.waist && (
            <p className="mt-1 text-xs text-red-500">{errors.waist}</p>
          )}
        </div>
      </div>

      {/* Row 3: Hips + Shoulder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hips */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Hips <span className="text-xs text-gray-500">(inches)</span>
          </label>
          <input
            type="text"
            name="hips"
            placeholder="e.g. 36"
            value={formData.hips}
            onChange={handleNumericLikeChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          {errors.hips && (
            <p className="mt-1 text-xs text-red-500">{errors.hips}</p>
          )}
        </div>

        {/* Shoulder */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Shoulder <span className="text-xs text-gray-500">(inches)</span>
          </label>
          <input
            type="text"
            name="shoulder"
            placeholder="e.g. 18"
            value={formData.shoulder}
            onChange={handleNumericLikeChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          {errors.shoulder && (
            <p className="mt-1 text-xs text-red-500">{errors.shoulder}</p>
          )}
        </div>
      </div>

      {/* Row 4: Shoe Size (full width) */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          Shoe Size
        </label>
        <input
          type="text"
          name="shoe_size"
          placeholder="e.g. 8 / 42"
          value={formData.shoe_size}
          onChange={handleNumericLikeChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
        {errors.shoe_size && (
          <p className="mt-1 text-xs text-red-500">{errors.shoe_size}</p>
        )}
      </div>

      {/* Row 5: Eye Color + Hair Color */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Eye Color */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Eye Color
          </label>
          <select
            name="eye_color"
            value={formData.eye_color}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          >
            <option value="">Select eye color</option>
            <option value="Brown">Brown</option>
            <option value="Black">Black</option>
            <option value="Hazel">Hazel</option>
            <option value="Green">Green</option>
            <option value="Blue">Blue</option>
            <option value="Grey">Grey</option>
            <option value="Other">Other</option>
          </select>
          {errors.eye_color && (
            <p className="mt-1 text-xs text-red-500">{errors.eye_color}</p>
          )}
        </div>

        {/* Hair Color */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Hair Color
          </label>
          <select
            name="hair_color"
            value={formData.hair_color}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          >
            <option value="">Select hair color</option>
            <option value="Black">Black</option>
            <option value="Brown">Brown</option>
            <option value="Blonde">Blonde</option>
            <option value="Red">Red</option>
            <option value="Grey">Grey</option>
            <option value="Colored">Colored</option>
            <option value="Other">Other</option>
          </select>
          {errors.hair_color && (
            <p className="mt-1 text-xs text-red-500">{errors.hair_color}</p>
          )}
        </div>
      </div>

      {/* Row 6: Complexion + Body Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Complexion */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Complexion
          </label>
          <select
            name="complexion"
            value={formData.complexion}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          >
            <option value="">Select complexion</option>
            <option value="Very Fair">Very Fair</option>
            <option value="Fair">Fair</option>
            <option value="Wheatish">Wheatish</option>
            <option value="Medium">Medium</option>
            <option value="Dusky">Dusky</option>
            <option value="Dark">Dark</option>
          </select>
          {errors.complexion && (
            <p className="mt-1 text-xs text-red-500">{errors.complexion}</p>
          )}
        </div>

        {/* Body Type */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Body Type
          </label>
          <select
            name="body_type"
            value={formData.body_type}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          >
            <option value="">Select body type</option>
            <option value="Slim">Slim</option>
            <option value="Athletic">Athletic</option>
            <option value="Average">Average</option>
            <option value="Curvy">Curvy</option>
            <option value="Plus Size">Plus Size</option>
          </select>
          {errors.body_type && (
            <p className="mt-1 text-xs text-red-500">{errors.body_type}</p>
          )}
        </div>
      </div>

      {/* Row 7: Hair Length + Body Shape */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hair Length */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Hair Length
          </label>
          <select
            name="hair_length"
            value={formData.hair_length}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          >
            <option value="">Select hair length</option>
            <option value="Bald">Bald</option>
            <option value="Very Short">Very Short</option>
            <option value="Short">Short</option>
            <option value="Medium">Medium</option>
            <option value="Long">Long</option>
            <option value="Very Long">Very Long</option>
          </select>
          {errors.hair_length && (
            <p className="mt-1 text-xs text-red-500">{errors.hair_length}</p>
          )}
        </div>

        {/* Body Shape */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Body Shape
            <span className="text-xs text-gray-500 ml-1">
              (Face / body shape)
            </span>
          </label>
          <select
            name="body_shape"
            value={formData.body_shape}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          >
            <option value="">Select shape</option>
            <option value="Oval">Oval</option>
            <option value="Round">Round</option>
            <option value="Square">Square</option>
            <option value="Heart">Heart</option>
            <option value="Diamond">Diamond</option>
            <option value="Rectangular">Rectangular</option>
            <option value="Other">Other</option>
          </select>
          {errors.body_shape && (
            <p className="mt-1 text-xs text-red-500">{errors.body_shape}</p>
          )}
        </div>
      </div>

      {/* Row 8: Suit/Jacket/Dress Size */}
      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">
          {isMale ? "Suit / Jacket Size" : isFemale ? "Dress Size" : "Suit / Jacket / Dress Size"}
        </label>
        <input
          type="text"
          name="suit_jacket_dress_size"
          placeholder={isMale ? "e.g. 38R, 40L" : isFemale ? "e.g. S / M / 8 / 10" : "e.g. 38R or S/M"}
          value={formData.suit_jacket_dress_size}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
        {errors.suit_jacket_dress_size && (
          <p className="mt-1 text-xs text-red-500">
            {errors.suit_jacket_dress_size}
          </p>
        )}
      </div>

      {/* Row 9: Gender specific fields */}
      {isMale && (
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Facial Hair
          </label>
          <select
            name="facial_hair"
            value={formData.facial_hair}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          >
            <option value="">Select facial hair</option>
            <option value="None">None</option>
            <option value="Clean Shaven">Clean Shaven</option>
            <option value="Stubble">Stubble</option>
            <option value="Beard">Beard</option>
            <option value="Moustache">Moustache</option>
            <option value="Beard & Moustache">Beard & Moustache</option>
          </select>
          {errors.facial_hair && (
            <p className="mt-1 text-xs text-red-500">{errors.facial_hair}</p>
          )}
        </div>
      )}

      {isFemale && (
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Bust Cup Size
          </label>
          <input
            type="text"
            name="bust_cup_size"
            placeholder="e.g. B, C, D"
            value={formData.bust_cup_size}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          {errors.bust_cup_size && (
            <p className="mt-1 text-xs text-red-500">
              {errors.bust_cup_size}
            </p>
          )}
        </div>
      )}

      {/* Row 10: Tattoos/Piercings */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="tattoos_piercings"
            id="tattoos_piercings"
            checked={formData.tattoos_piercings}
            onChange={handleChange}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label
            htmlFor="tattoos_piercings"
            className="text-sm font-medium text-gray-700 cursor-pointer"
          >
            I have Tattoos or Piercings
          </label>
        </div>

        {formData.tattoos_piercings && (
          <div>
            <label className="text-sm font-medium mb-1 text-gray-700 block">
              Tattoos or Piercings Details
              <span className="text-xs text-gray-500 ml-1">
                (describe with locations)
              </span>
            </label>
            <textarea
              name="tattoos_details"
              placeholder="e.g. Small tattoo on wrist, ear piercings..."
              value={formData.tattoos_details}
              onChange={handleChange}
              rows={3}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full resize-y focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
            {errors.tattoos_details && (
              <p className="mt-1 text-xs text-red-500">
                {errors.tattoos_details}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="relative w-full mt-2 py-2 rounded-lg font-semibold tracking-[0.12em] uppercase text-sm bg-black !text-white hover:bg-primary hover:!text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Saving..." : "Save Physical Attributes"}
      </button>
    </form>
  );
}

export default PhysicalAttributesForm;