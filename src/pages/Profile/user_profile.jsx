// src/pages/user_profile.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfessionalInfoForm from "./../forms/ProfessionalInfoForm";
import PhysicalAttributesForm from "./../forms/PhysicalAttributes";

function UserProfile() {
  // Start from Step 1 by default
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1); // Step 1 open by default

  const navigate = useNavigate();

  // First form success → 50% + open second form
  const handleFirstFormSuccess = (data) => {
    console.log("Professional Info Submitted:", data);
    setProgress(50);
    setCurrentStep(2);
  };

  // Second form success → 100% + redirect
  const handleSecondFormSuccess = (data) => {
    console.log("Physical Attributes Submitted:", data);
    setProgress(100);
    navigate("/profile");
  };

  // ✅ LOGOUT HANDLER + PAGE REFRESH
  const handleLogout = () => {
    try {
      // Login ke time jo store kiya tha woh hata do
      localStorage.removeItem("authData");
    } catch (err) {
      console.error("Error clearing authData from localStorage:", err);
    }

    // ✅ Full page reload + home par redirect
    window.location.href = "/";
  };

  return (
    <div className="mt-40 mb-20 px-4 flex flex-col items-center">
      {/* PROGRESS BAR */}
      <div className="w-full max-w-xl mb-10">
        <div className="mb-2 flex justify-between text-xs text-gray-500">
          <span>Profile Completion</span>
          <span>{progress}%</span>
        </div>

        <div className="relative w-full h-2 rounded-full bg-gray-200">
          {/* Filled Pink Bar */}
          <div
            className="h-2 rounded-full bg-pink-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />

          {/* Percentage Tooltip */}
          <div
            className="absolute -top-8 flex items-center justify-center"
            style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
          >
            <div className="px-2 py-1 text-xs bg-white rounded shadow">
              {progress}%
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="w-full max-w-2xl">
        {/* STEP 1 – OPEN BY DEFAULT */}
        {currentStep === 1 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Step 1 of 2 – Professional Information
            </h3>
            <ProfessionalInfoForm onSubmitSuccess={handleFirstFormSuccess} />
          </div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Step 2 of 2 – Physical Attributes
            </h3>
            <PhysicalAttributesForm
              onSubmitSuccess={handleSecondFormSuccess}
            />
          </div>
        )}
      </div>

      {/* LOGOUT SECTION */}
      <p className="mt-4 text-center flex justify-center items-center">
        <span>Want to logout?</span>
        <button
          type="button"
          className="ml-1 font-bold text-primary underline-offset-2 hover:underline cursor-pointer"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </p>
    </div>
  );
}

export default UserProfile;
