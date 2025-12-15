// src/pages/signUp/Index.jsx
import React, { useState } from "react";
import useJwt from "./../../endpoints/jwt/useJwt";
import CryptoJS from "crypto-js";

const SECRET_KEY = "12345678901234567890123456789012"; // 32 chars
const IV = "1234567890123456"; // 16 chars

export function aesEncrypt(text) {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const iv = CryptoJS.enc.Utf8.parse(IV);

  const encrypted = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString(); // Base64 output
}

// Simple wrapper used in submit
const encryptPassword = (password) => {
  try {
    return aesEncrypt(password);
  } catch (err) {
    console.error("AES Encryption Error:", err);
    return null;
  }
};

const countryOptions = [
  
  { code: "+1", label: "United States", flag: "🇺🇸" },
  { code: "+91", label: "India", flag: "🇮🇳" },
  { code: "+44", label: "United Kingdom", flag: "🇬🇧" },
  { code: "+61", label: "Australia", flag: "🇦🇺" },
  { code: "+971", label: "UAE", flag: "🇦🇪" },
];

function Index({ onSignupSuccess }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedUserType, setSelectedUserType] = useState("User Type");
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);
  const [submitButton, SetSubmitButton] = useState("Create Account");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // errors.api => server / API error (jaise "Email already registered")
  const [errors, setErrors] = useState({});

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleUserTypeSelect = (value) => {
    setSelectedUserType(value);
    setOpenDropdown(null);
    setErrors((prev) => ({ ...prev, userType: "" }));
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setOpenDropdown(null);
    setErrors((prev) => ({ ...prev, countryCode: "" }));
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setFormData((prev) => ({ ...prev, firstName: value }));
      setErrors((prev) => ({ ...prev, firstName: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        firstName: "Only alphabets and spaces are allowed in First Name.",
      }));
    }
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setFormData((prev) => ({ ...prev, lastName: value }));
      setErrors((prev) => ({ ...prev, lastName: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        lastName: "Only alphabets and spaces are allowed in Last Name.",
      }));
    }
  };

  const handleDobChange = (e) => {
    const value = e.target.value;
    const today = new Date().toISOString().split("T")[0];
    if (value > today) {
      setErrors((prev) => ({
        ...prev,
        dob: "Future date is not allowed.",
      }));
    } else {
      setFormData((prev) => ({ ...prev, dob: value }));
      setErrors((prev) => ({ ...prev, dob: "" }));
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z0-9@.]*$/.test(value)) {
      setFormData((prev) => ({ ...prev, email: value }));
      setErrors((prev) => ({ ...prev, email: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email:
          "Only alphabets, numbers, @ and . are allowed in Email. Other characters are not allowed.",
      }));
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, ""); // only digits

    if (value.length > 10) {
      value = value.slice(0, 10);
      setErrors((prev) => ({
        ...prev,
        phone: "Phone number cannot be more than 10 digits.",
      }));
    } else if (value.length > 0 && value.length < 10) {
      setErrors((prev) => ({
        ...prev,
        phone: "Phone number must be exactly 10 digits.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }

    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, password: value }));

    if (formData.confirmPassword && value !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Password and Confirm Password do not match.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, confirmPassword: value }));

    if (formData.password && value !== formData.password) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Password and Confirm Password do not match.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Har submit ke start pe API error clear kar do
    setErrors((prev) => ({ ...prev, api: "" }));

    const newErrors = {};

    if (!selectedUserType || selectedUserType === "User Type") {
      newErrors.userType = "Please select a User Type.";
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required.";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required.";
    }
    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    }
    if (!selectedCountry) {
      newErrors.countryCode = "Country code is required.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password and Confirm Password do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    // 🔐 AES encrypt password (crypto-js)
    const encryptedPassword = encryptPassword(formData.password);
    const encryptedConfirmPassword = encryptedPassword;

    if (!encryptedPassword) {
      setErrors((prev) => ({
        ...prev,
        api: "Password encryption failed.",
      }));
      return;
    }

    // map user type to number as per backend
    const userTypeMap = {
      Model: 1,
      "Casting Company": 2,
    };

    // ✅ payload: encrypted password & same encrypted confirm_password
    const payload = {
      first_name: formData.firstName.trim(),
      last_name: formData.lastName.trim(),
      dob: formData.dob,
      email: formData.email.trim(),
      country_code: selectedCountry.code,
      phone: formData.phone,
      password: encryptedPassword,
      confirm_password: encryptedConfirmPassword,
      user_type: userTypeMap[selectedUserType] || 0,
    };

    console.log("SIGNUP PAYLOAD (JSON):", payload);

    try {
      SetSubmitButton("Creating...");
      const response = await useJwt.signup(payload);
      console.log("Signup response:", response);
      // alert("Account created successfully!");

      // ✅ Signup success → fields reset + errors clear
      setFormData({
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      setSelectedUserType("User Type");
      setSelectedCountry(countryOptions[0]);
      setErrors({}); // sab errors hata do

      // ✅ Signup success → modal ko band karo (Navbar se)
      if (typeof onSignupSuccess === "function") {
        onSignupSuccess();
      }
    } catch (err) {
      console.error("Signup error:", err);

      // ✅ Backend se aane wala message dikhana (jaise {"detail":"Email already registered"})
      let apiMessage = "Something went wrong while creating account.";

      // agar axios type response hai
      if (err?.response?.data) {
        const data = err.response.data;
        if (typeof data === "string") {
          apiMessage = data;
        } else if (data.detail) {
          apiMessage = data.detail;
        } else if (data.message) {
          apiMessage = data.message;
        }
      }

      setErrors((prev) => ({
        ...prev,
        api: apiMessage,
      }));

      // ❌ Yaha form reset NAHI karna hai
    } finally {
      // sirf button ka text wapas normal karo
      SetSubmitButton("Create Account");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6">
      {/* USER TYPE DROPDOWN */}
      <li className="relative list-none">
        <button
          type="button"
          onClick={() => toggleDropdown("userType")}
          className="btn-animated-outline w-full lg:w-auto flex items-center justify-between text-[0.85rem] font-medium tracking-[0.12em] uppercase px-[0.9rem] py-2 cursor-pointer bg-transparent border border-gray-300 rounded-md text-black hover:text-primary hover:border-primary"
        >
          <p className="text-primary">{selectedUserType}</p>
          <svg
            className="w-3 h-3 ml-2 inline-block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {openDropdown === "userType" && (
          <ul className="absolute top-full left-0 bg-white shadow-lg rounded min-w-[160px] mt-1 border border-gray-200 list-none p-0 z-20">
            <li>
              <button
                type="button"
                onClick={() => handleUserTypeSelect("Model")}
                className="w-full text-left block px-4 py-2 text-sm text-black hover:text-primary hover:bg-[#f5f5f5]"
              >
                Model
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleUserTypeSelect("Casting Company")}
                className="w-full text-left block px-4 py-2 text-sm text-black hover:text-primary hover:bg-[#f5f5f5]"
              >
                Casting Company
              </button>
            </li>
          </ul>
        )}

        {errors.userType && (
          <p className="mt-1 text-xs text-red-500">{errors.userType}</p>
        )}
      </li>

      {/* ROW 1: First Name + Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            First Name
          </label>
          <input
            type="text"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleFirstNameChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleLastNameChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* ROW 2: DOB + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* DOB */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Date of Birth
          </label>
          <input
            type="date"
            max={today}
            value={formData.dob}
            onChange={handleDobChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none [color-scheme:light]"
          />
          {errors.dob && (
            <p className="mt-1 text-xs text-red-500">{errors.dob}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleEmailChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>
      </div>

      {/* ROW 3: Country Code + Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Country Code Dropdown */}
        <div className="relative">
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Country Code
          </label>
          <button
            type="button"
            onClick={() => toggleDropdown("countryCode")}
            className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm hover:shadow-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">{selectedCountry.flag}</span>
              <span className="text-sm font-semibold text-gray-800">
                {selectedCountry.code}
              </span>
              <span className="text-xs text-gray-500">{selectedCountry.label}</span>
            </span>
            <svg
              className="w-4 h-4 ml-2 inline-block text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {openDropdown === "countryCode" && (
            <ul className="absolute top-full left-0 w-full bg-white shadow-lg rounded mt-1 border border-gray-200 list-none p-1 z-20 max-h-56 overflow-y-auto">
              {countryOptions.map((country) => (
                <li key={country.code}>
                  <button
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-800 hover:bg-[#f5f5f5]"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{country.flag}</span>
                      <span className="font-medium">{country.code}</span>
                      <span className="text-xs text-gray-500">{country.label}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {errors.countryCode && (
            <p className="mt-1 text-xs text-red-500">{errors.countryCode}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Phone Number
          </label>
          <input
            type="text"
            placeholder="Enter 10-digit phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            maxLength={10}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* ROW 4: Password + Confirm Password */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Password */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handlePasswordChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-sm font-medium mb-1 text-gray-700 block">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      {/* 🔴 API / SERVER ERROR MESSAGE (jaise: "Email already registered") */}
      {errors.api && <p className="text-sm text-red-500 text-center">{errors.api}</p>}

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="relative w-full mt-2 py-2 rounded-lg font-semibold tracking-[0.12em] uppercase text-sm bg-black !text-white hover:bg-primary hover:!text-white transition"
      >
        {submitButton}
      </button>
    </form>
  );
}

export default Index;
