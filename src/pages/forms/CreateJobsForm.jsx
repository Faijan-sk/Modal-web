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

  
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl space-y-6 mx-auto p-4 mt-5"
    >
      <h2 className="text-lg font-semibold tracking-[0.16em] uppercase text-gray-800">
        Create Job
      </h2>

      {/* Company Name */}
      <div>
        <label className="text-sm font-medium mb-1 block"> Job Tittle</label>
        <input
          type="text"
          placeholder="Enter Job Tittle"
          value={formData.company_name}
          onChange={(e) => {
            const allowed = e.target.value.replace(/[^A-Za-z0-9 ,]/g, "");
            handleChange("company_name", allowed);
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
      </div>

      {/* Contact Person */}
      {/* <div>
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
      </div> */}


      {/* Phone + Website */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div> */}


      {/* Address */}
      {/* <div>
        <label className="text-sm font-medium mb-1 block">Address</label>
        <textarea
          rows={2}
          placeholder="Enter address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        ></textarea>
      </div> */}


      
      {/* <div>
        <label className="text-sm font-medium mb-1 block">Tagline</label>
        <input
          type="text"
          placeholder="Enter tagline"
          value={formData.tagline}
          onChange={(e) => handleChange("tagline", e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
      </div> */}


     

      <button
        type="submit"
        className="relative w-full mt-2 py-2 rounded-lg font-semibold tracking-[0.12em] uppercase text-sm bg-black !text-white hover:bg-primary hover:!text-white transition"
      >
        Create Jobs
      </button> 

    </form>
  );
}
