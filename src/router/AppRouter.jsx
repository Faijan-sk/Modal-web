// src/router/AppRouter.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "../pages/home/Home"
import ProfilePage from "../pages/Profile/Profile"
import NavbarRJ from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ModalsListing from "../pages/modals/ModalListing"
import AboutUs from "../pages/aboutUs/AboutUs"
import ContactUs from "../pages/contactUs/ContactUs"
import UserProfile from "../pages/Profile/user_profile"
// import Login from "../pages/login/Login"

const NotFound = () => <div>404 - Page not found</div>

const AppRouter = () => {
  return (
    <BrowserRouter>
    <NavbarRJ/>
      <Routes>
        {/* Public routes */}
        
        <Route path="/" element={<Home />} />           
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path="/modals/:type" element={<ModalsListing />} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path='/user_profile' element ={<UserProfile/>} />
       

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
        
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default AppRouter
