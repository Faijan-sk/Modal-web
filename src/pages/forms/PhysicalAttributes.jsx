// src/pages/signUp/PhysicalAttributesForm.jsx
import React, { useState } from "react";

function PhysicalAttributesForm({ onSubmitSuccess }) {
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
    tattoos_or_piercings: "",
    body_type: "",
    chest_size: "",
    suit_jacket_size: "",
    facial_hair: "",
    bust_cup_size: "",
    dress_size: "",
    hair_length: "",
    shape: "",
  });

  const [errors, setErrors] = useState({});

  // generic change handler
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

  // numeric-like fields (height, weight etc)
  const handleNumericLikeChange = (e) => {
    const { name, value } = e.target;
    // sirf digits, dot, space, cm/inch jaisa unit allow karne ke liye
    const cleaned = value.replace(/[^0-9.\s/-]/g, "");
    setFormData((prev) => ({
      ...prev,
      [name]: cleaned,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
      "shape",
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

    // Step 2 success → parent ko data bhejo
    if (onSubmitSuccess) {
      onSubmitSuccess(formData);
    } else {
      console.log("PHYSICAL ATTRIBUTES PAYLOAD:", formData);
      alert("Physical attributes form submitted (check console).");
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
            Chest / Bust <span className="text-xs text-gray-500">(inches)</span>
          </label>
          <input
            type="text"
            name="chest_bust"
            placeholder="e.g. 38"
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

      {/* Row 4: Shoe Size + Suit/Jacket Size */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Shoe Size */}
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

        {/* Suit / Jacket Size */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Suit / Jacket Size
          </label>
          <input
            type="text"
            name="suit_jacket_size"
            placeholder="e.g. 38R, 40L"
            value={formData.suit_jacket_size}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          {errors.suit_jacket_size && (
            <p className="mt-1 text-xs text-red-500">
              {errors.suit_jacket_size}
            </p>
          )}
        </div>
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

      {/* Row 7: Chest Size + Bust Cup / Dress Size */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Chest Size */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Chest Size
          </label>
          <input
            type="text"
            name="chest_size"
            placeholder="e.g. 38"
            value={formData.chest_size}
            onChange={handleNumericLikeChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          {errors.chest_size && (
            <p className="mt-1 text-xs text-red-500">{errors.chest_size}</p>
          )}
        </div>

        {/* Bust Cup Size + Dress Size */}
        <div className="grid grid-cols-1 gap-2">
          {/* Bust Cup Size */}
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

          {/* Dress Size */}
          <div>
            <label className="text-sm font-medium mb-1 text-gray-700 block">
              Dress Size
            </label>
            <input
              type="text"
              name="dress_size"
              placeholder="e.g. S / M / 8 / 10"
              value={formData.dress_size}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
            {errors.dress_size && (
              <p className="mt-1 text-xs text-red-500">{errors.dress_size}</p>
            )}
          </div>
        </div>
      </div>

      {/* Row 8: Hair Length + Shape */}
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

        {/* Shape */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Shape
            <span className="text-xs text-gray-500 ml-1">
              (Face / body shape)
            </span>
          </label>
          <select
            name="shape"
            value={formData.shape}
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
          {errors.shape && (
            <p className="mt-1 text-xs text-red-500">{errors.shape}</p>
          )}
        </div>
      </div>

      {/* Row 9: Facial Hair + Tattoos/Piercings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Facial Hair */}
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

        {/* Tattoos or Piercings */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Tattoos or Piercings
            <span className="text-xs text-gray-500 ml-1">
              (describe with locations)
            </span>
          </label>
          <textarea
            name="tattoos_or_piercings"
            placeholder="e.g. Small tattoo on wrist, ear piercings..."
            value={formData.tattoos_or_piercings}
            onChange={handleChange}
            rows={3}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full resize-y focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          {errors.tattoos_or_piercings && (
            <p className="mt-1 text-xs text-red-500">
              {errors.tattoos_or_piercings}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="relative w-full mt-2 py-2 rounded-lg font-semibold tracking-[0.12em] uppercase text-sm bg-black !text-white hover:bg-primary hover:!text-white transition"
      >
        Save Physical Attributes
      </button>
    </form>
  );
}

export default PhysicalAttributesForm;
