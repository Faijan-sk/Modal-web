// src/components/NavbarRJ.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./../../assets/logo/Drake-Logo.png";
import SignUp from "../../../src/pages/signUp/index";
import Login from "../../../src/pages/login/Login.jsx";
import useJwt from "./../../endpoints/jwt/useJwt.js"

const NavbarRJ = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userUid , setUserUid] = useState('');

useEffect(() => {
  try {
    // 🔹 authData read
    const authData = localStorage.getItem("authData");
    // 🔹 user read
    const userData = localStorage.getItem("user");
    console.log("USER DATA FROM LOCAL" , userData)
           
    if (authData && userData) {
      const user = JSON.parse(userData);
     
      setUserUid( user.uuid);
      setIsLoggedIn(true);
      setUserType(user?.userType);
       // ✅ CORRECT KEY
    } else {
      setIsLoggedIn(false);
      setUserType(null);
    }
  } catch (err) {
    console.error("Error reading user from localStorage:", err);
    setIsLoggedIn(false);
    setUserType(null);
  }
}, []);


  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };





  const handleNavItemClick = () => {
    setIsOpen(false);
    setOpenDropdown(null);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // const handleCastingJobS = () => {

    

  // }

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    const stored = localStorage.getItem("authData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUserType(parsed?.user?.user_type);
    }
    setIsModalOpen(false);
    setShowLogin(false);
  };

  const handleSignupSuccess = () => {
    setIsModalOpen(false);
    setShowLogin(false);
  };


  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1050]">
        <nav className="bg-white shadow-sm py-3">
          <div className="container mx-auto px-4 flex items-center justify-between flex-wrap lg:flex-nowrap">

            <Link to="/" className="flex items-center no-underline" onClick={handleNavItemClick}>
              <div>
                <img src={Logo} alt="Drake Online" className="h-[80px] w-auto" />
              </div>
              <span className="text-[0.85rem] font-bold tracking-[0.12em] uppercase text-gray-800">
                Drake Online
              </span>
            </Link>

            <button
              type="button"
              className="lg:hidden p-2 border border-gray-300 rounded !bg-white hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>

            <div
              className={`${isOpen ? "block" : "hidden"} w-full lg:flex lg:w-auto lg:justify-center lg:flex-1`}
            >
              <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-1 mt-4 lg:mt-0 list-none p-0 m-0">

                <li>
                  <Link
                    to="/"
                    onClick={handleNavItemClick}
                    className="block text-[0.85rem] font-medium tracking-[0.12em] uppercase px-[0.9rem] py-2 no-underline text-black hover:text-primary"
                  >
                    HOME
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about-us"
                    onClick={handleNavItemClick}
                    className="block text-[0.85rem] font-medium tracking-[0.12em] uppercase px-[0.9rem] py-2 no-underline text-black hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>

                <li>  
                  <Link
                    to="/modals"
                    onClick={handleNavItemClick}
                    className="block text-[0.85rem] font-medium tracking-[0.12em] uppercase px-[0.9rem] py-2 no-underline text-black hover:text-primary"
                  >
                    Models
                  </Link>
                </li>


{userType  == 2 ? <li>
                  <Link
                    to="/casting-job"
                    onClick={handleNavItemClick}
                    className="block text-[0.85rem] font-medium tracking-[0.12em] uppercase px-[0.9rem] py-2 no-underline text-black hover:text-primary"
                  >
                    Jobs for Company
                  </Link>
                </li> : <li>
                  <Link
                    to="/jobs"
                    onClick={handleNavItemClick}
                    className="block text-[0.85rem] font-medium tracking-[0.12em] uppercase px-[0.9rem] py-2 no-underline text-black hover:text-primary"
                  >
                    Jobs
                  </Link>
                </li> }
                

                <li>
                  <Link
                    to="/store"
                    onClick={handleNavItemClick}
                    className="block text-[0.85rem] font-medium tracking-[0.12em] uppercase px-[0.9rem] py-2 no-underline text-black hover:text-primary"
                  >
                    Store
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact-us"
                    onClick={handleNavItemClick}
                    className="block text-[0.85rem] font-medium tracking-[0.12em] uppercase px-[0.9rem] py-2 no-underline text-black hover:text-primary"
                  >
                    Contact Us
                  </Link>
                </li>

              </ul>
            </div>

            {isLoggedIn ? (
              <Link
                to={userType === 1 ? "/user_profile" : "/company_profile"}
                onClick={handleNavItemClick}
                className="btn-drake-outline mt-3 lg:mt-0 no-underline flex items-center justify-center"
              >
                Profile
              </Link>
            ) : (
              <button
                className="btn-drake-outline mt-3 lg:mt-0"
                onClick={() => {
                  setShowLogin(false);
                  setIsModalOpen(true);
                  setOpenDropdown(null);
                  setIsOpen(false);
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                Sign up
              </button>
            )}

          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[1100] flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          setIsModalOpen(false);
          setShowLogin(false);
        }}
      >
        <div
          className={`bg-white rounded-xl shadow-lg px-8 py-6 w-full max-w-[720px] max-h-[90vh] overflow-y-auto transform transition-transform duration-300 ${
            isModalOpen ? "scale-100 translate-y-0" : "scale-95 -translate-y-2"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end">
            <button
              className="text-gray-500 hover:text-black text-xl leading-none"
              onClick={() => {
                setIsModalOpen(false);
                setShowLogin(false);
              }}
            >
              ×
            </button>
          </div>

          <div className="mt-2">
            {showLogin ? (
              <>
                <Login onLoginSuccess={handleLoginSuccess} />
                <p className="mt-2 text-center flex justify-center items-center">
                  <span>Don&apos;t have an account?</span>
                  <button
                    type="button"
                    className="ml-1 font-bold text-primary underline-offset-2 hover:underline cursor-pointer"
                    onClick={() => setShowLogin(false)}
                  >
                    Create new account
                  </button>
                </p>
              </>
            ) : (
              <>
                <SignUp onSignupSuccess={handleSignupSuccess} />
                <p className="mt-2 text-center flex justify-center items-center">
                  <span>Already have an account?</span>
                  <button
                    type="button"
                    className="ml-1 font-bold text-primary underline-offset-2 hover:underline cursor-pointer"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarRJ;
