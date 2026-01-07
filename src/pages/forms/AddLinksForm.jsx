import React, { useEffect, useState } from "react";
import useJwt from "./../../endpoints/jwt/useJwt";

const LinkModal = ({ open, onClose, initialLinks = [], onSave }) => {
  const platforms = [
    { name: "Twitter", key: "x" },
    { name: "Facebook", key: "facebook" },
    { name: "Instagram", key: "instagram" },
    { name: "TikTok", key: "tiktok" },
    { name: "Snapchat", key: "snapchat" },
    { name: "Pinterest", key: "pinterest" },
    { name: "LinkedIn", key: "linkedin" },
    { name: "YouTube", key: "youtube" }
  ];

  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0].name);
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  // Backend se links fetch karo jab modal open ho
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setLoading(true);
        const response = await useJwt.getAllSocialLinks();
        console.log('Response of the links api:', response.data);

        // API response ko links format mein convert karo
        if (response.data && response.data.length > 0) {
          const apiData = response.data[0]; // Pehla object lo
          const formattedLinks = [];

          // Har platform ko check karo aur agar URL hai to add karo
          platforms.forEach((platform) => {
            const urlValue = apiData[platform.key];
            if (urlValue && urlValue.trim()) {
              formattedLinks.push({
                platform: platform.name,
                url: urlValue
              });
            }
          });

          setLinks(formattedLinks);
        }
      } catch (err) {
        console.error("Error fetching links:", err);
        setError("Failed to load existing links");
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchLinks();
      setSelectedPlatform(platforms[0].name);
      setUrl("");
      setError(null);
    }
  }, [open]);

  const validateUrl = (value) => {
    if (!value) return false;
    try {
      const u = new URL(value);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleAdd = () => {
    setError(null);

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid URL (include http:// or https://)");
      return;
    }

    if (links.some((l) => l.platform === selectedPlatform)) {
      setError(`${selectedPlatform} already added. Remove it first.`);
      return;
    }

    setLinks([...links, { platform: selectedPlatform, url: url.trim() }]);
    setUrl("");
    setError(null);
  };

  const handleRemove = async (platform) => {
    try {
      // Pehle state se remove karo
      const updatedLinks = links.filter((l) => l.platform !== platform);
      setLinks(updatedLinks);

      // Phir API ko hit karo with updated links
      const backendPayload = convertToBackendFormat(updatedLinks);
      console.log("Removing link, sending to backend:", backendPayload);

      await useJwt.AddLinksToProfile(backendPayload);

      // Agar onSave callback hai to call karo
      if (onSave) {
        onSave(backendPayload);
      }
    } catch (err) {
      console.error("Error removing link:", err);
      setError(
        err?.response?.data?.message ||
        err.message ||
        "Failed to remove link"
      );
      // Error hone par links ko wapas set kar do
      setLinks(links);
    }
  };

  const convertToBackendFormat = (linksArray) => {
    const backendData = {};

    // Pehle saare platforms ko empty string se initialize karo
    platforms.forEach((platform) => {
      backendData[platform.key] = "";
    });

    // Phir jo links add hain unko set karo
    linksArray.forEach((link) => {
      const platformObj = platforms.find((p) => p.name === link.platform);
      if (platformObj && link.url) {
        backendData[platformObj.key] = link.url;
      }
    });

    return backendData;
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      const backendPayload = convertToBackendFormat(links);
      console.log("Sending to backend:", backendPayload);

      await useJwt.AddLinksToProfile(backendPayload);

      if (onSave) {
        onSave(backendPayload);
      }

      onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err.message ||
        "Failed to save links"
      );
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "1rem"
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "80vh",
          overflowY: "auto",
          padding: "1.5rem",
          position: "relative"
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer"
          }}
        >
          ×
        </button>

        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "0.5rem" }}>
          Add links
        </h2>

        <p style={{ color: "#666", fontSize: "14px", marginBottom: "1.5rem" }}>
          Add social / portfolio links that will show on your profile.
        </p>

        {/* PLATFORM DROPDOWN */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontWeight: "500", marginBottom: "0.5rem" }}>
            Platform
          </label>
          <select
            value={selectedPlatform}
            onChange={(e) => {
              setSelectedPlatform(e.target.value);
            }}
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "14px"
            }}
          >
            {platforms.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* URL INPUT */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontWeight: "500", marginBottom: "0.5rem" }}>
            Insert your link
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAdd();
              }
            }}
            placeholder="https://your-link.com/yourprofile"
            autoComplete="off"
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "14px",
              outline: "none"
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
          <button
            type="button"
            onClick={handleAdd}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#000",
              color: "white",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            Add
          </button>

          <button
            type="button"
            onClick={() => {
              setUrl("");
              setError(null);
            }}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            Clear
          </button>
        </div>

        {error && (
          <div
            style={{
              padding: "0.75rem",
              backgroundColor: "#fee",
              color: "#c00",
              borderRadius: "6px",
              marginBottom: "1rem",
              fontSize: "14px"
            }}
          >
            {error}
          </div>
        )}

        <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "1rem" }}>
          Added links
        </h3>

        {loading ? (
          <div
            style={{
              textAlign: "center",
              color: "#999",
              padding: "2rem",
              fontSize: "14px"
            }}
          >
            Loading links...
          </div>
        ) : links.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#999",
              padding: "2rem",
              border: "2px dashed #ddd",
              borderRadius: "8px",
              fontSize: "14px"
            }}
          >
            No links added yet.
          </div>
        ) : (
          links.map((l, idx) => (
            <div
              key={`${l.platform}-${idx}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                marginBottom: "0.5rem"
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#000",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "16px"
                }}
              >
                {l.platform[0]}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "600", fontSize: "14px" }}>{l.platform}</div>
                <div style={{ fontSize: "12px", color: "#666", wordBreak: "break-all" }}>
                  {l.url}
                </div>
              </div>

              <a 
                href={l.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  padding: "0.25rem 0.75rem",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "4px",
                  textDecoration: "none",
                  color: "#333",
                  fontSize: "13px",
                  whiteSpace: "nowrap"
                }}
              >
                Open
              </a>

              <button
                type="button"
                onClick={() => handleRemove(l.platform)}
                style={{ 
                  color: "#c00", 
                  background: "none", 
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "500",
                  whiteSpace: "nowrap"
                }}
              >
                Remove
              </button>
            </div>
          ))
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.75rem",
            marginTop: "1.5rem",
            borderTop: "1px solid #eee",
            paddingTop: "1rem"
          }}
        >
          <button 
            type="button"
            onClick={onClose}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={handleSave} 
            disabled={saving}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: saving ? "#ccc" : "#000",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: saving ? "not-allowed" : "pointer",
              fontSize: "14px"
            }}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkModal;