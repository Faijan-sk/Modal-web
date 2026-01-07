import React from "react";
import SellingImage from "../../../src/assets/store/dvd.webp";

function HeroSectionFour() {
  return (
    <div className="w-full flex flex-col items-center justify-center pb-20">
      <img
        src={SellingImage}
        alt="advertisement"
        className="w-full object-cover"
      />

      <a
        href="https://www.drakegirl.com/store"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-drake-outline
          mt-3
          w-[60%]
          mx-auto
          text-center
          block
          lg:w-[40%]
        "
      >
        Buy now
      </a>
    </div>
  );
}

export default HeroSectionFour;
