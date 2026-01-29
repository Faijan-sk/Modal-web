// src/pages/login/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useJwt from "../../endpoints/jwt/useJwt";
import CryptoJS from "crypto-js";
import { useAuth } from "../../context/AuthContext";

// AES config (same as signup)
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

  return encrypted.toString(); // Base64
}

// wrapper used in submit
const encryptPassword = (password) => {
  try {
    return aesEncrypt(password);
  } catch (err) {
    console.error("AES Encryption Error:", err);
    return null;
  }
};

// ✅ Static public key kept only for reference (not used now)
const PUBLIC_KEY_HEX =
  "203db88555e364bf7f8b8a68b7dc24357c9c192ff9ad82002fe63885849ee50e";

function Login({ onLoginSuccess }) {

const {login,handleProfileUpload}=useAuth()

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submitButton, setSubmitButton] = useState("Login");

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

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, password: value }));
    setErrors((prev) => ({ ...prev, password: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

        // 🔥 USER NORMALIZATION (IMPORTANT FIX)
        if (data?.user) {
          const normalizedUser = {
            ...data.user,
            userType: data.user.userType ?? data.user.user_type, // ✅ FIX
          };

          login(normalizedUser)
          handleProfileUpload(normalizedUser.update_profile)

          // update_profile

          // localStorage.setItem("user", JSON.stringify(normalizedUser));
        }

        // ✅ Full auth response
        // localStorage.setItem("authData", JSON.stringify(data));

        if (typeof onLoginSuccess === "function") {
          onLoginSuccess();
        }

        navigate("/");
      }

      setFormData({ email: "", password: "" });
      setErrors({});
      setSubmitButton("Login");
    } catch (err) {
      console.error("Login error:", err);
      setSubmitButton("Login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6 mx-auto">
      <h2 className="text-xl font-semibold tracking-[0.12em] uppercase text-center">
        Login
      </h2>

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

      <button
        type="submit"
        className="relative w-full mt-2 py-2 rounded-lg font-semibold tracking-[0.12em] uppercase text-sm bg-black !text-white hover:bg-primary hover:!text-white transition"
      >
        {submitButton}
      </button>
    </form>
  );
}

export default Login;
