// src/pages/login/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useJwt from "../../endpoints/jwt/useJwt";
import CryptoJS from "crypto-js";
import { useAuth } from "../../context/AuthContext";

// AES config
const SECRET_KEY = "12345678901234567890123456789012"; 
const IV = "1234567890123456"; 

export function aesEncrypt(text) {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const iv = CryptoJS.enc.Utf8.parse(IV);
  const encrypted = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

const encryptPassword = (password) => {
  try {
    return aesEncrypt(password);
  } catch (err) {
    console.error("AES Encryption Error:", err);
    return null;
  }
};

function Login({ onLoginSuccess }) {
  const { login, handleProfileUpload } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(""); // ✅ New state for API response errors
  const [submitButton, setSubmitButton] = useState("Login");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setApiError(""); // Clear API error on change
    if (/^[A-Za-z0-9@.]*$/.test(value)) {
      setFormData((prev) => ({ ...prev, email: value }));
      setErrors((prev) => ({ ...prev, email: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "Only alphabets, numbers, @ and . are allowed.",
      }));
    }
  };

  const handlePasswordChange = (e) => {
    setApiError(""); // Clear API error on change
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, password: value }));
    setErrors((prev) => ({ ...prev, password: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(""); // Reset error on new attempt

    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    try {
      setSubmitButton("Logging in...");

      const encryptedPassword = encryptPassword(formData.password);
      if (!encryptedPassword) throw new Error("Password encryption failed.");

      const response = await useJwt.login({
        email: formData.email,
        password: encryptedPassword,
      });

      if (response?.status === 200 || response?.status === 201) {
        const data = response.data;
        if (data?.user) {
          const normalizedUser = {
            ...data.user,
            userType: data.user.userType ?? data.user.user_type,
          };
          login(normalizedUser);
          handleProfileUpload(normalizedUser.update_profile);
        }

        if (typeof onLoginSuccess === "function") {
          onLoginSuccess();
        }
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      // ✅ API response extract karke state me set karna
      const message = err.response?.data?.detail || "Something went wrong. Please try again.";
      setApiError(message); 
      setSubmitButton("Login");
    } finally {
        // Cleaning up state if needed
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6 mx-auto">
      <h2 className="text-xl font-semibold tracking-[0.12em] uppercase text-center">
        Login
      </h2>

      {/* ✅ API Error Alert Box */}
      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm text-center animate-pulse">
          {apiError}
        </div>
      )}

      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">Email</label>
        <input
          type="text"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleEmailChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label className="text-sm font-medium mb-1 text-gray-700 block">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handlePasswordChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
      </div>

      <button
        type="submit"
        disabled={submitButton === "Logging in..."}
        className="relative w-full mt-2 py-2 rounded-lg font-semibold tracking-[0.12em] uppercase text-sm bg-black !text-white hover:bg-primary hover:!text-white transition disabled:bg-gray-400"
      >
        {submitButton}
      </button>
    </form>
  );
}

export default Login;