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
  import PerdonalProfile from "../pages/Profile/temp" 
  import Store from "../pages/store/index"
  import JobsPage from "../pages/jobs/index"
  import CastingCompany from "./../pages/Profile/CompanyProfile"
  import EditProfile from "./../pages/Profile/EditProfile"

  const NotFound = () => <div>404 - Page not found</div>

  const AppRouter = () => {
    return (
      <BrowserRouter basename='/drakeonline'>
        {/* 🔹 Top: Navbar (fixed) */}
        <NavbarRJ />

        {/* 🔹 Center: Routing content (Navbar ke niche dikhane ke liye padding) */}
        <main className="pt-24">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/modals" element={<ModalsListing />} />
            <Route path="/dashboard" element={<div>Dashboard</div>} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/user_profile" element={<UserProfile />} />
            <Route path='/personal-Profile' element={<PerdonalProfile />} />
            <Route path='/store' element={<Store />} />
            <Route path='/jobs' element={<JobsPage />} />
            <Route path='/company_profile' element={<CastingCompany />} />
            <Route path='/edit-profile' element={<EditProfile />} />
          
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* 🔹 Bottom: Footer */}
        <Footer />
      </BrowserRouter>
    )
  }

  export default AppRouter
