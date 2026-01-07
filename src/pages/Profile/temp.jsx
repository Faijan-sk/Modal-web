// src/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import Videos from "./Videos";
import Acchivements from "./Acchivements";
import useJwt from "./../../endpoints/jwt/useJwt";
import CircularProgress from "@mui/material/CircularProgress";
import LinkModal from "./../forms/AddLinksForm";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const getInitials = (first, last) => {
    const a = (first || "").trim()[0] || "";
    const b = (last || "").trim()[0] || "";
    return (a + b).toUpperCase() || "U";
  };

  const computeAgeFromDob = (dob) => {
    if (!dob) return null;
    try {
      const birth = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    async function fetchInfo() {
      try {
        setLoading(true);
        setError(null);
        const response = await useJwt.getModalProfileModalInfo();
        const data = response?.data ?? response;
        setProfile(data);
      } catch (err) {
        console.error("Error fetching info:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    }
    fetchInfo();
  }, []);

  const basic = profile?.basic_info ?? {};
  const physical = profile?.physical_profile ?? {};
  const professional = profile?.professional_info ?? {};
  const socialLinks = profile?.social_links ?? [];

  const displayName = (basic.first_name || basic.last_name)
    ? `${basic.first_name ?? ""} ${basic.last_name ?? ""}`.trim()
    : "Unnamed User";

  const age = basic.age && Number(basic.age) > 0 
    ? basic.age 
    : computeAgeFromDob(basic.dob);

  const handleSaveLinks = async (links) => {
    try {
      const response = await useJwt.addLinksToProfile(links);
      console.log("Links saved successfully:", response);
      
      const updated = { ...profile };
      updated.social_links = links.map(link => ({
        platform: link.platform,
        url: link.url,
        uuid: link.uuid || `temp-${Date.now()}-${Math.random()}`
      }));
      setProfile(updated);
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save links:", err);
      throw new Error(err.response?.data?.message || "Failed to save links. Please try again.");
    }
  };

  const handleEditProfile = () => {
  navigate("/edit-profile");
};


  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "1rem" }}>
        <div style={{ color: "#dc2626", fontSize: "18px", fontWeight: "600" }}>{error}</div>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#000",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb", paddingBottom: "2.5rem" }}>
      {saveSuccess && (
        <div style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 50,
          backgroundColor: "#22c55e",
          color: "white",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
        }}>
          Links saved successfully!
        </div>
      )}

      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1rem", paddingTop: "2rem" }}>
        <div className="bg-gradient-to-tr from-white via-primary/5 to-primary/20 rounded-2xl shadow-lg p-6 mb-6">
          <div style={{ display: "flex", flexDirection: window.innerWidth < 768 ? "column" : "row", gap: "1.5rem" }}>
            <div style={{ position: "relative" }}>
              <div style={{
                width: "128px",
                height: "128px",
                borderRadius: "50%",
                background: "linear-gradient(to bottom right, #a855f7, #ec4899)",
                padding: "4px"
              }}>
                <div style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "#1f2937",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                  fontWeight: "bold"
                }}>
                  {getInitials(basic.first_name, basic.last_name)}
                </div>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827", margin: 0 }}>{displayName}</h1>
                    {basic.approved && <span style={{ color: "#3b82f6" }}>✔</span>}
                  </div>
                  <p style={{ color: "#6b7280", margin: "0.25rem 0 0 0" }}>{professional?.experience_level ?? "Talent"}</p>
                </div>
                <button
                  onClick={handleEditProfile}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    backgroundColor: "white"
                  }}
                >
                  Edit Profile
                </button>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <h3 style={{ fontWeight: "600", color: "#111827", marginBottom: "0.5rem" }}>About Talent</h3>
                <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "0.5rem" }}>
                  {professional?.experience_details ?? "No bio available."}
                </p>
                <p style={{ fontSize: "14px", color: "#6b7280", margin: "0.25rem 0" }}>
                  Email: {basic.email ?? "—"}
                </p>
                <p style={{ fontSize: "14px", color: "#6b7280", margin: "0.25rem 0" }}>
                  Phone: {basic.country_code ?? ""} {basic.phone ?? "—"}
                </p>
                <p style={{ fontSize: "14px", color: "#6b7280", margin: "0.25rem 0" }}>
                  DOB: {basic.dob ?? "—"} 
                  {age !== null && <> • {age} yr{age > 1 ? "s" : ""}</>}
                </p>

                {socialLinks?.length > 0 && (
                  <div style={{ marginTop: "0.5rem" }}>
                    <span style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}>Social Links: </span>
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "14px",
                          color: "#2563eb",
                          textDecoration: "none",
                          marginRight: "0.75rem"
                        }}
                      >
                        {link.platform} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 768 ? "1fr 1fr" : "repeat(4, 1fr)", gap: "1rem", fontSize: "14px" }}>
                <div>
                  <div style={{ fontWeight: "600", color: "#374151" }}>Location</div>
                  <div style={{ color: "#6b7280" }}>{basic.current_city ?? "Not specified"}</div>
                </div>
                <div>
                  <div style={{ fontWeight: "600", color: "#374151" }}>Gender</div>
                  <div style={{ color: "#6b7280" }}>{basic.gender ?? "—"}</div>
                </div>
                <div>
                  <div style={{ fontWeight: "600", color: "#374151" }}>Languages</div>
                  <div style={{ color: "#6b7280" }}>
                    {professional?.languages?.length ? professional.languages.join(", ") : "—"}
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: "600", color: "#374151" }}>Category</div>
                  <div style={{ color: "#6b7280" }}>
                    {professional?.interested_categories?.length 
                      ? professional.interested_categories.join(" • ") 
                      : "—"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", paddingTop: "1.5rem", borderTop: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {/* <div>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#111827" }}>214</div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>Projects done</div>
              </div>
              <div>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#111827" }}>4.9/5</div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>Casting rating</div>
              </div>
              <div>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#111827" }}>&lt; 24 hrs</div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>Avg. response</div>
              </div> */}
            </div>

            <div>
              <button
                onClick={() => setIsLinkModalOpen(true)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid #d1d5db",
                  fontWeight: "500",
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                {socialLinks && socialLinks.length > 0 ? "Edit Links" : "Add Social Links"}
              </button>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: "white", borderRadius: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", overflow: "hidden" }}>
          <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb" }}>
            <button
              onClick={() => setActiveTab("posts")}
              style={{
                flex: 1,
                padding: "1rem",
                textAlign: "center",
                fontWeight: "500",
                cursor: "pointer",
                backgroundColor: "transparent",
                border: "none",
                color: activeTab === "posts" ? "#000" : "#9ca3af",
                borderBottom: activeTab === "posts" ? "2px solid #000" : "none"
              }}
            >
              Portfolio
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              style={{
                flex: 1,
                padding: "1rem",
                textAlign: "center",
                fontWeight: "500",
                cursor: "pointer",
                backgroundColor: "transparent",
                border: "none",
                color: activeTab === "videos" ? "#000" : "#9ca3af",
                borderBottom: activeTab === "videos" ? "2px solid #000" : "none"
              }}
            >
              Showreels
            </button>
            <button
              onClick={() => setActiveTab("acchivements")}
              style={{
                flex: 1,
                padding: "1rem",
                textAlign: "center",
                fontWeight: "500",
                cursor: "pointer",
                backgroundColor: "transparent",
                border: "none",
                color: activeTab === "acchivements" ? "#000" : "#9ca3af",
                borderBottom: activeTab === "acchivements" ? "2px solid #000" : "none"
              }}
            >
              Awards
            </button>
          </div>

          <div style={{ padding: "1.5rem" }}>
            {activeTab === "posts" && <Post />}
            {activeTab === "videos" && <Videos />}
            {activeTab === "acchivements" && <Acchivements />}
          </div>
        </div>
      </div>

      {/* LinkModal Component - Yeh modal ab render hoga */}
      <LinkModal
        open={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        onSave={handleSaveLinks}
        existingLinks={socialLinks}
      />
    </div>
  );
};

export default ProfilePage;