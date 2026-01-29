  // src/pages/user_profile.jsx
  import React, { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";

  // ✅ Correct paths based on your files
  import ProfessionalInfoForm from "./../forms/ProfessionalInfoForm";
  import PhysicalAttributesForm from "./../forms/PhysicalAttributes";
  import MediaUploadForm from "./../forms/PortfolioForm";
  import UpdateProfile from "./../forms/updateProfile"; 
import useJwt from "../../../src/endpoints/jwt/useJwt";
import { useAuth } from "../../context/AuthContext";

  function UserProfile() {
    // Start from Step 1
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(1);
    const [user, setUser] = useState(null);
    const {logout}=useAuth()

    // ✅ yaha gender store karenge (step1 se)
    const [gender, setGender] = useState("");

    const navigate = useNavigate();

    // STEP 1 → STEP 2 (Update Profile → Physical)
    const handleUpdateProfileSuccess = (data) => {
      console.log("Update Profile Submitted:", data);

      // 🔥 yaha se gender nikaal ke store karein
      // API response sample: { message: "...", user: { gender: "Female", ... } }
      const detectedGender =
        data?.user?.gender || // agar backend ka response direct mila
        data?.gender || // agar form ne sirf gender send kiya ho
        "";
      setGender(detectedGender); // ✅ second form ke liye gender store

      setProgress(25); // ✅ Step 1 complete → 25%
      setCurrentStep(2);
    };

    // STEP 2 → STEP 3 (Physical → Educational / Professional)
    const handlePhysicalSuccess = (data) => {
      console.log("Physical Attributes Submitted:", data);
      setProgress(50); // ✅ Step 2 complete → 50%
      setCurrentStep(3);
    };

    // STEP 3 → STEP 4 (Educational / Professional → Portfolio)
    const handleProfessionalSuccess = (data) => {
      console.log("Educational / Professional Info Submitted:", data);
      setProgress(75); // ✅ Step 3 complete → 75%
      setCurrentStep(4);
    };

    // STEP 4 → COMPLETED → REDIRECT
    const handlePortfolioSuccess = (data) => {
      console.log("Portfolio / Media Submitted:", data);
      setProgress(100); // ✅ Step 4 complete → 100%
      navigate("/personal-Profile"); // ✅ final redirection
    };

    // LOGOUT
    const handleLogout = () => {
       logout()

    
      window.location.href = "/";
    };


    //status check 
    // useEffect(() => {
    //    const storedUser = localStorage.getItem("user");
    //    console.clear();
    // console.log("********************" , JSON.parse(storedUser).id)

    //   const fetchStatus = async () => {

    //           const resonse = await useJwt.getProfileStatusCheck( JSON.parse(storedUser).id);


    //   }
    
    
      
    // }, [])


  

    

    return (
      <div className="mt-10 mb-20 px-4 flex flex-col items-center">
        {/* PROGRESS BAR */}
        <div className="w-full max-w-xl mb-10">
          <div className="mb-2 flex justify-between text-xs text-gray-500">
            <span>Profile Completion</span>
            <span>{progress}%</span>
          </div>

          <div className="relative w-full h-2 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-pink-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />

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

        {/* MAIN CONTENT */}
        <div className="w-full max-w-2xl">
          {/* STEP 1: UPDATE PROFILE */}
          {currentStep === 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Step 1 of 4 — Update Profile
              </h3>
              <UpdateProfile onSubmitSuccess={handleUpdateProfileSuccess} />
            </div>
          )}

          {/* STEP 2: PHYSICAL ATTRIBUTES */}
          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Step 2 of 4 — Physical Attributes
              </h3>
              {/* 🔥 yaha gender prop pass kar rahe */}
              <PhysicalAttributesForm
                gender={gender}
                onSubmitSuccess={handlePhysicalSuccess}
              />
            </div>
          )}

          {/* STEP 3: EDUCATIONAL / PROFESSIONAL */}
          {currentStep === 3 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Step 3 of 4 — Educational / Professional Information
              </h3>
              <ProfessionalInfoForm
                onSubmitSuccess={handleProfessionalSuccess}
              />
            </div>
          )}

          {/* STEP 4: PORTFOLIO / MEDIA UPLOAD */}
          {currentStep === 4 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Step 4 of 4 — Media Upload
              </h3>
              <MediaUploadForm onSubmitSuccess={handlePortfolioSuccess} />
            </div>
          )}
        </div>

        {/* LOGOUT */}
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
