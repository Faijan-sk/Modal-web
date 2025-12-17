  // src/ProfilePage.jsx
  import React, { useEffect, useState } from "react";
  import Post from "./Post";
  import Videos from "./Videos";
  import Acchivements from "./Acchivements";
  import useJwt from "./../../endpoints/jwt/useJwt";

  import CircularProgress from "@mui/material/CircularProgress";

  // ===== LinkModal component (copied modal style from NavbarRJ) =====
  const LinkModal = ({ open, onClose, initialLinks = [], onSave }) => {
    const platforms = [
      "Twitter",
      "Facebook",
      "Instagram",
      "TikTok",
      "Snapchat",
      "Pinterest",
      "LinkedIn",
      "YouTube"
    ];

    const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
    const [url, setUrl] = useState("");
    const [links, setLinks] = useState(initialLinks || []);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    // reset when opened/closed
    useEffect(() => {
      if (open) {
        setLinks(initialLinks || []);
        setSelectedPlatform(platforms[0]);
        setUrl("");
        setError(null);
      }
    }, [open, initialLinks]);

    const validateUrl = (value) => {
      if (!value) return false;
      // basic URL check
      try {
        const u = new URL(value);
        return !!u.protocol && (u.protocol === "http:" || u.protocol === "https:");
      } catch (e) {
        return false;
      }
    };

    const handleAdd = () => {
      setError(null);
      if (!validateUrl(url)) {
        setError("Please enter a valid URL (include http:// or https://)");
        return;
      }

      // prevent duplicate platform entries
      if (links.some((l) => l.platform === selectedPlatform)) {
        setError(`${selectedPlatform} already added. Remove it first to add again.`);
        return;
      }

      const next = [...links, { platform: selectedPlatform, url: url.trim() }];
      setLinks(next);
      setUrl("");
    };

    const handleRemove = (platform) => {
      setLinks(links.filter((l) => l.platform !== platform));
    };

    const handleSave = async () => {
      try {
        setSaving(true);
        setError(null);
        
        // call parent's onSave with new links
        if (onSave) {
          await onSave(links);
        }
        
        onClose();
      } catch (err) {
        setError(err.message || "Failed to save links");
      } finally {
        setSaving(false);
      }
    };

    if (!open) return null;

    return (
      <div
        className={`fixed inset-0 z-[1200] flex items-center justify-center bg-black/30 backdrop-blur-sm`}
        onClick={onClose}
      >
        <div
          className={`bg-white rounded-xl shadow-lg px-6 py-5 w-full max-w-[640px] max-h-[90vh] overflow-y-auto transform`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end">
            <button className="text-gray-500 hover:text-black text-xl leading-none" onClick={onClose}>
              ×
            </button>
          </div>

          <h3 className="text-lg font-semibold">Add links</h3>
          <p className="text-sm text-gray-500 mt-1">Add social / portfolio links that will show on your profile.</p>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <label className="text-xs text-gray-600">Platform</label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            >
              {platforms.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <label className="text-xs text-gray-600">Insert your link</label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-link.com/yourprofile"
              className="w-full rounded-md border px-3 py-2"
            />

            <div className="flex gap-2">
              <button onClick={handleAdd} className="px-4 py-2 rounded-full border text-sm hover:bg-gray-50 transition">
                Add
              </button>
              <button onClick={() => { setUrl(""); setError(null); }} className="px-4 py-2 rounded-full border text-sm hover:bg-gray-50 transition">
                Clear
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="mt-2">
              <p className="text-xs text-gray-500">Added links</p>
              <div className="mt-2 grid gap-2">
                {links.length === 0 && <p className="text-sm text-gray-500">No links added yet.</p>}
                {links.map((l) => (
                  <div key={l.platform} className="flex items-center justify-between bg-slate-50 rounded-md px-3 py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-semibold text-sm">{l.platform[0]}</div>
                      <div className="text-sm">
                        <div className="font-medium">{l.platform}</div>
                        <div className="text-xs text-gray-600 truncate max-w-[380px]">{l.url}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a href={l.url} target="_blank" rel="noreferrer" className="text-xs underline hover:text-blue-600">Open</a>
                      <button onClick={() => handleRemove(l.platform)} className="text-xs text-red-600 hover:text-red-800">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button onClick={onClose} className="px-4 py-2 rounded-full border hover:bg-gray-50 transition" disabled={saving}>
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                className="px-4 py-2 rounded-full border text-sm hover:bg-gray-50 transition"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("posts");
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // helper: initials
    const getInitials = (first, last) => {
      const a = (first || "").trim()[0] || "";
      const b = (last || "").trim()[0] || "";
      return (a + b).toUpperCase() || "U";
    };

    // helper: compute age from dob (YYYY-MM-DD) if needed
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

    // safe destructure
    const basic = profile?.basic_info ?? {};
    const physical = profile?.physical_profile ?? {};
    const professional = profile?.professional_info ?? {};

    // display name fallback
    const displayName =
      (basic.first_name || basic.last_name)
        ? `${basic.first_name ?? ""} ${basic.last_name ?? ""}`.trim()
        : "Unnamed User";

    // age: prefer returned age, otherwise compute from dob
    const age = basic.age && Number(basic.age) > 0 ? basic.age : computeAgeFromDob(basic.dob);

    const handleSaveLinks = async (links) => {
      try {
        // Call the actual API endpoint
        const response = await useJwt.addLinksToProfile(links);
        
        console.log("Links saved successfully:", response);
        
        // Update local state with the saved links
        const updated = { ...profile };
        updated.basic_info = { ...(updated.basic_info || {}), links };
        setProfile(updated);
        
        // Show success message
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        
      } catch (err) {
        console.error("Failed to save links:", err);
        // Re-throw error so modal can display it
        throw new Error(err.response?.data?.message || "Failed to save links. Please try again.");
      }
    };

   
    

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-black">
      

        <div className="max-w-6xl mx-auto px-4 pt-8 pb-14">
          {/* ===== TOP PROFILE CARD ===== */}
          <div className="bg-white border rounded-2xl shadow-sm p-5 md:p-7 bg-gradient-to-br from-pink-100 to-pink-300">
            {/* TOP SECTION: Avatar + Basic Info + Hire button */}
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Avatar + ring */}
              <div className="flex justify-center md:block">
                <div className="relative w-28 h-28 md:w-40 md:h-40 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-gray-800">
                  {/* No avatar URL in API response — show initials */}
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    {getInitials(basic.first_name, basic.last_name)}
                  </div>
                </div>
              </div>

              {/* Right side info */}
              <div className="flex-1 w-full space-y-4">
                {/* username + buttons */}
                <div className="flex flex-wrap items-center gap-3 justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl md:text-3xl font-semibold">{displayName}</h2>
                      {/* show verified if approved true */}
                      {basic.approved && <span className="text-blue-500 text-xl">✔</span>}
                    </div>
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mt-1">
                      {professional?.experience_level ?? "Talent"}
                    </p>
                  </div>

                  {/* Primary actions */}
                </div>

                {/* Bio + short details */}
                <div className="grid md:grid-cols-[2fr,1.3fr] gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">About Talent</p>
                    <p className="mt-1 text-gray-700">
                      {/* use experience_details if present, otherwise fallback */}
                      {professional?.experience_details ?? "No bio available."}
                    </p>

                    <div className="mt-2 text-xs text-gray-500">
                      <p>
                        <span className="font-semibold">Email:</span> {basic.email ?? "—"}
                      </p>
                      <p>
                        <span className="font-semibold">Phone:</span> {basic.country_code ?? ""} {basic.phone ?? "—"}
                      </p>
                      <p>
                        <span className="font-semibold">DOB:</span> {basic.dob ?? "—"} {age !== null ? <span>• {age} yr{age > 1 ? "s" : ""}</span> : null}
                      </p>
                    </div>

                    {/* Display saved links */}
                    {basic.links && basic.links.length > 0 && (
                      <div className="mt-3">
                        <p className="font-semibold text-gray-900 mb-2">Social Links:</p>
                        <div className="flex flex-wrap gap-2">
                          {basic.links.map((link) => (
    <a
      key={link.platform}
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-medium transition"
    >
      <span>{link.platform}</span>
      <span className="text-gray-400">↗</span>
    </a>
  ))}

                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick meta info */}
                  <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-gray-500">Location</p>
                      <p className="font-semibold text-gray-900">{basic.current_city ?? "Not specified"}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-gray-500">Experience</p>
                      <p className="font-semibold text-gray-900">{professional?.experience_level ?? "—"}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-gray-500">Languages</p>
                      <p className="font-semibold text-gray-900">{professional?.languages?.length ? professional.languages.join(", ") : (basic.languages ?? "—")}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-gray-500">Category</p>
                      <p className="font-semibold text-gray-900">{professional?.interested_categories?.length ? professional.interested_categories.join(" • ") : "—"}</p>
                    </div>
                  </div>
                </div>

                {/* Stats + tags */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-2 border-t border-gray-100">
                  {/* Stats */}
                  <div className="flex gap-6 text-sm">
                    <div>
                      <p className="font-semibold text-gray-900">214</p>
                      <p className="text-gray-500 text-xs">Projects done</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">4.9/5</p>
                      <p className="text-gray-500 text-xs">Casting rating</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">&lt; 24 hrs</p>
                      <p className="text-gray-500 text-xs">Avg. response</p>
                    </div>
                  </div>

                  {/* Add Links Button */}
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <button
                      onClick={() => setIsLinkModalOpen(true)}
                      className="px-3 py-1 rounded-full bg-white text-white font-medium hover:bg-gray-800 transition"
                    >
                      {basic.links && basic.links.length > 0 ? "Edit Links" : "Add Links"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== TABS + LINE (LINE IS NOW BELOW BUTTONS) ===== */}
          <div className="mt-6">
            {/* Tabs */}
            <div className="flex justify-center gap-10 text-[11px] md:text-xs font-semibold tracking-[0.18em] uppercase text-gray-500">
              {/* POSTS TAB */}
              <button
                className={`relative flex items-center gap-1 py-3 transition ${activeTab === "posts" ? "text-black" : "hover:text-gray-800"}`}
                onClick={() => setActiveTab("posts")}
              >
                <span>Portfolio</span>
                {activeTab === "posts" && <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-black rounded-full" />}
              </button>

              {/* VIDEOS TAB */}
              <button
                className={`relative flex items-center gap-1 py-3 transition ${activeTab === "videos" ? "text-black" : "hover:text-gray-800"}`}
                onClick={() => setActiveTab("videos")}
              >
                <span>Showreels</span>
                {activeTab === "videos" && <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-black rounded-full" />}
              </button>

              {/* ACCHIVEMENTS TAB */}
              <button
                className={`relative flex items-center gap-1 py-3 transition ${activeTab === "acchivements" ? "text-black" : "hover:text-gray-800"}`}
                onClick={() => setActiveTab("acchivements")}
              >
                <span>Awards</span>
                {activeTab === "acchivements" && <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-black rounded-full" />}
              </button>
            </div>

            {/* LINE UNDER THE BUTTONS */}
            <div className="border-t mt-1 border-gray-200" />
          </div>

          {/* ===== TAB CONTENT AREA ===== */}
          <div className="mt-4">
            {activeTab === "posts" && <Post profile={profile} />}
            {activeTab === "videos" && <Videos profile={profile} />}
            {activeTab === "acchivements" && <Acchivements profile={profile} />}
          </div>
        </div>

        {/* Link modal */}
        <LinkModal
          open={isLinkModalOpen}
          onClose={() => setIsLinkModalOpen(false)}
          initialLinks={(profile?.basic_info && profile.basic_info.links) || []}
          onSave={handleSaveLinks}
        />
      </div>
    );
  };

  export default ProfilePage;