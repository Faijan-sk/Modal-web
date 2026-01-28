import React, { useState } from "react";
import useJwt from "./../../endpoints/jwt/useJwt";

export default function CompanyCreateForm() {
  const [formData, setFormData] = useState({
    company_name: "",
    contact_name: "",
    phone: "",
    website: "",
    address: "",
    tagline: "",
    about: "",
    services: [""],
    social_links: [],
  });

  const [selectedLogo, setSelectedLogo] = useState(null);

  // SERVICES
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceChange = (index, value) => {
    const updatedServices = [...formData.services];
    updatedServices[index] = value;

    setFormData((prev) => ({
      ...prev,
      services: updatedServices,
    }));
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("authData");
    } catch (err) {
      console.error("Error clearing authData:", err);
    }
    window.location.href = "/";
  };

  const addServiceField = () => {
    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, ""],
    }));
  };

  // SOCIAL LINKS
  const [socialLinks, setSocialLinks] = useState([
    { platform: "", url: "" },
  ]);

  const handlePlatformChange = (index, value) => {
    const updated = [...socialLinks];
    updated[index].platform = value;
    setSocialLinks(updated);

    setFormData((prev) => ({
      ...prev,
      social_links: updated,
    }));
  };

  const handleUrlChange = (index, value) => {
    const updated = [...socialLinks];
    updated[index].url = value;
    setSocialLinks(updated);

    setFormData((prev) => ({
      ...prev,
      social_links: updated,
    }));
  };

  const addNewSocialField = () => {
    setSocialLinks([...socialLinks, { platform: "", url: "" }]);
  };

  // ⭐ SUBMIT FUNCTION UPDATED
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("company_name", formData.company_name);
    fd.append("contact_name", formData.contact_name);
    fd.append("phone", formData.phone);
    fd.append("website", formData.website);
    fd.append("address", formData.address);
    fd.append("tagline", formData.tagline);
    fd.append("about", formData.about);

    // ⭐ Backend चाहता JSON string
    fd.append("services", JSON.stringify(formData.services));

    // ⭐ Convert social link array → JSON object {facebook:"", insta:""}
    const socialObj = {};

    socialLinks.forEach((item) => {
      if (item.platform && item.url) {
        socialObj[item.platform] = item.url;
      }
    });

    fd.append("social_links", JSON.stringify(socialObj));

    if (selectedLogo) {
      fd.append("logo", selectedLogo);
    }

    // try {
    //   const response = await useJwt.completeCastingProfile(fd);
    //   // alert("Company Profile Created Successfully!");
    // } catch (error) {
    //   console.log(error);
    //   // alert("Something went wrong!");
    // }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl space-y-6 mx-auto p-4 mt-5"
    >
      <h2 className="text-lg font-semibold tracking-[0.16em] uppercase text-gray-800">
        Update Company Profile
      </h2>

      {/* Company Name */}
      <div>
        <label className="text-sm font-medium mb-1 block">Company Name</label>
        <input
          type="text"
          placeholder="Enter company name"
          value={formData.company_name}
          onChange={(e) => {
            const allowed = e.target.value.replace(/[^A-Za-z0-9 ,]/g, "");
            handleChange("company_name", allowed);
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
      </div>

      {/* Contact Person */}
      <div>
        <label className="text-sm font-medium mb-1 block">Contact Name</label>
        <input
          type="text"
          placeholder="Enter contact person name"
          value={formData.contact_name}
          onChange={(e) => {
            const allowed = e.target.value.replace(/[^A-Za-z0-9 ,]/g, "");
            handleChange("contact_name", allowed);
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
      </div>


      {/* Phone + Website */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Phone Number</label>
          <input
            type="text"
            placeholder="Enter phone number"
            value={formData.phone}
            maxLength={10}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/[^0-9]/g, "");
              handleChange("phone", onlyNums);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Website</label>
          <input
            type="text"
            placeholder="Enter website URL"
            value={formData.website}
            onChange={(e) => handleChange("website", e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
        </div>
      </div>


      {/* Address */}
      <div>
        <label className="text-sm font-medium mb-1 block">Address</label>
        <textarea
          rows={2}
          placeholder="Enter address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        ></textarea>
      </div>


      {/* Company Logo */}
      {/* <div>
        <label className="text-sm font-medium mb-1 block">Company Logo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedLogo(e.target.files[0])}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
      </div> */}


      {/* Tagline */}
      <div>
        <label className="text-sm font-medium mb-1 block">Tagline</label>
        <input
          type="text"
          placeholder="Enter tagline"
          value={formData.tagline}
          onChange={(e) => handleChange("tagline", e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
      </div>


      {/* About */}
      {/* <div>
        <label className="text-sm font-medium mb-1 block">About Company</label>
        <textarea
          rows={3}
          placeholder="Enter company description"
          value={formData.about}
          onChange={(e) => handleChange("about", e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        ></textarea>
      </div> */}

      {/* Services */}
      {/* <div>
        <label className="text-sm font-medium mb-2 block">
          Company Services
        </label>

        {formData.services.map((service, index) => (
          <input
            key={index}
            type="text"
            placeholder="Enter service"
            value={service}
            onChange={(e) => handleServiceChange(index, e.target.value)}
            className="border border-gray-300 rounded-lg mb-2 px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
        ))}

        <button
          type="button"
          onClick={addServiceField}
          className="text-sm px-3 py-1 border rounded-md"
        >
          + Add More Service
        </button>
      </div> */}

      {/* SOCIAL LINKS */}
      {/* <div className="space-y-2">
        <label className="text-sm font-medium mb-2 block">
          Social Media Links
        </label>

        {socialLinks.map((item, index) => (
          <div key={index}>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none mb-2"
              value={item.platform}
              onChange={(e) => handlePlatformChange(index, e.target.value)}
            >
              <option value="">Select Platform</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter / X</option>
              <option value="linkedin">LinkedIn</option>
              <option value="youtube">YouTube</option>
              <option value="website">Website</option>
            </select>

            {item.platform && (
              <input
                type="text"
                placeholder="Enter platform URL"
                value={item.url}
                onChange={(e) => handleUrlChange(index, e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none mb-3"
              />
            )}

            {item.platform &&
              item.url &&
              index === socialLinks.length - 1 && (
                <button
                  type="button"
                  onClick={addNewSocialField}
                  className="text-sm px-3 py-1 border rounded-md"
                >
                  + Add New Social Link
                </button>
              )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="relative w-full mt-2 py-2 rounded-lg font-semibold tracking-[0.12em] uppercase text-sm bg-black !text-white hover:bg-primary hover:!text-white transition"
      >
        Create Company
      </button> */}

      <p className=" text-center flex justify-center items-center mb-10">
        <span>Want to logout?</span>
        <button
          type="button"
          className="ml-1 font-bold text-primary underline-offset-2 hover:underline cursor-pointer"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </p>
    </form>
  );
}
// import React from 'react'

// function CastingCompanyCreateForm() {
//   return (
//     <div>
//       <p className='mt-20 mb-20 text-2xl text-center'>
//         Update Profile page
//       </p>
//     </div>

//   )
// }

// export default CastingCompanyCreateForm