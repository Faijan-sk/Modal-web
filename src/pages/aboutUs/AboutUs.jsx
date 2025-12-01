import React from 'react'
import About from "../home/HeroSectionTwo"
import OurServices from "../home/OurServices"
import HeroSection from "./HeroSectionOne"
import Testimonial from "./../home/Testimonials"
import Reviews from "./Reviews"

function AboutUs() {
  return (<>
   
    <HeroSection />
    <About />
    {/* <Testimonial /> */}
    <Reviews />
  
    <OurServices />
    
    
     </>
  )
}

export default AboutUs