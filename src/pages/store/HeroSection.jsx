import React from "react";
import Logo from "./../../../src/assets/store/logo.webp";

const HeroSection = () => {
  return (
    <section className="w-full bg-white px-4 md:px-12 pt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center md:justify-start">
          <img
            src={Logo}
            alt="Hero Logo"
            className="w-48 sm:w-64 md:w-80 lg:w-96 object-contain"
          />
        </div>
        {/* LEFT SIDE - CONTENT */}
        <div>

          <p className="text-sm italic font-semibold text-gray-800 mb-4">
            Ready to Start your career today?
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight mb-8">
            From camera-ready to <br />
            career-ready. <br />
            A class in elegance, <br />
            confidence, and <br />
            control.
          </h1>

          <p className="text-lg md:text-xl font-medium text-gray-900">
            Learn to{" "}
            <span className="text-green-500 font-semibold">pose</span>,{" "}
            <span className="text-pink-500 font-semibold">walk</span>, and{" "}
            <span className="text-lime-500 font-semibold">glow up</span>{" "}
            – step by step.
          </p>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        

      </div>
    </section>
  );
};

export default HeroSection;
