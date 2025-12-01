// src/pages/Home/Home.jsx
import React from 'react'
import Navbar from '../../components/layout/Navbar'
import HeroSectionone from "./HeroSectionOne"
import HomeSectionTwo from "./HeroSectionTwo"
import HomeSectionThree from "./HomeSectionThree"
import TestimonialsSection from './Testimonials'
import OurServices from './OurServices'
import News from "./News"
import Reviews from "./../aboutUs/Reviews"
import Footer from "./../../components/layout/Footer"

function Home() {
  return (
    <>
     
      <HeroSectionone />
      <HomeSectionTwo />
      


      <HomeSectionThree />
      <News />
<Reviews />
      {/* <TestimonialsSection /> */}
      <OurServices />


     

    </>
  )
}

export default Home
