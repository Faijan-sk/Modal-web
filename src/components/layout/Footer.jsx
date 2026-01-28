// src/components/layout/Footer.jsx
import React from "react";

// Instagram strip images (replace with your real paths)
import insta1 from "../../assets/her-section-one/footer_one.webp";
import insta2 from "../../assets/her-section-one/footer_two.webp";
import insta3 from "../../assets/her-section-one/footer_three.webp";
import insta4 from "../../assets/her-section-one/footer_five.webp";
import insta5 from "../../assets/her-section-one/footer_six.webp";

// Pink round logo
import drakeLogo from "../../assets/logo/Drake-Logo.png";

const instaImages = [insta1, insta2, insta3, insta4, insta5];

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* ========== INSTAGRAM STRIP ========== */}
      <section className="border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-6">
          {/* INSTAGRAM heading */}
          <div className="flex items-center gap-2 mb-4">
            {/* small ig icon placeholder */}
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white text-[10px]">
              ◉
            </span>
            <span className="text-xs tracking-[0.25em] uppercase">
              Instagram
            </span>
          </div>

          {/* Images row */}
          <div className="flex gap-4 overflow-x-auto">
            {instaImages.map((src, idx) => (
              <div key={idx} className="flex-shrink-0">
                <img
                  src={src}
                  alt={`Instagram ${idx + 1}`}
                  className="w-48 h-56 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MIDDLE: LOGO + TEXT + SOCIAL ========== */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Left: pink round logo */}
          <div className="md:w-1/3">
            <img
              src={drakeLogo}
              alt="Drake Logo"
              className="w-28 h-28 object-contain"
            />
          </div>

          {/* Right: text content */}
          <div className="md:w-2/3 text-sm leading-relaxed">
            <p className="font-medium mb-2">Drake</p>

            <p className="text-neutral-300 mb-4 max-w-xl">
              Drake bridges training and opportunity — empowering aspiring talent
              with industry-grade skills while connecting brands to diverse,
              ready-to-work creatives. Learn. Prepare. Book.
            </p>

            <p className="text-neutral-300 mb-3">
              Casting breakdowns. Proud partner of drakegirl.com
            </p>

            <p className="text-neutral-300 mb-6 uppercase text-xs">
              INFO@DRAKEGIRL.COM
            </p>

            {/* Social icons row */}
            <div className="flex items-center gap-4 text-base">
              {/* yaha actual icons ke liye react-icons use kar sakte ho;
                  abhi simple placeholders rakhe hain */}
              <a href="#" className="hover:text-primary">
                IG
              </a>
              <a href="#" className="hover:text-primary">
                X
              </a>
              <a href="#" className="text-primary">
                f
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== BOTTOM NAV + COPYRIGHT ========== */}
      <section className="border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-6 text-[11px] text-primary">
          {/* nav links with glow effect on hover */}
          <nav className="flex flex-wrap gap-6 mb-3 tracking-[0.25em] uppercase text-primary">
            <a 
              href="/" 
              className="text-primary transition-all duration-300 hover:drop-shadow-[0_0_8px_rgb(255_105_180)]"
            >
              Home
            </a>
            <a 
              href="/modals" 
              className="text-primary transition-all duration-300 hover:drop-shadow-[0_0_8px_rgb(255_105_180)]"
            >
              Models
            </a>
            <a 
              href="/about-us" 
              className="text-primary transition-all duration-300 hover:drop-shadow-[0_0_8px_rgb(255_105_180)]"
            >
              About Us
            </a>
            <a 
              href="/store" 
              className="text-primary transition-all duration-300 hover:drop-shadow-[0_0_8px_rgb(255_105_180)]"
            >
              Store
            </a>
            <a 
              href="/terms-condition" 
              className="text-primary transition-all duration-300 hover:drop-shadow-[0_0_8px_rgb(255_105_180)]"
            >
              Terms & Condition
            </a>
            <a 
              href="/privacy-policy" 
              className="text-primary transition-all duration-300 hover:drop-shadow-[0_0_8px_rgb(255_105_180)]"
            >
              Privacy Policy
            </a>

            {/* <a 
              href="/jobs" 
              className="text-primary transition-all duration-300 hover:drop-shadow-[0_0_8px_rgb(255_105_180)]"
            >
              Jobs
            </a> */}
            <a 
              href="/contact-us" 
              className="text-primary transition-all duration-300 hover:drop-shadow-[0_0_8px_rgb(255_105_180)]"
            >
              Contact Us
            </a>
          </nav>

          {/* copyright */}
          <p className="text-neutral-400">
            Copyright © 2025. All Rights Reserved by DRAKE, LLC.
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;