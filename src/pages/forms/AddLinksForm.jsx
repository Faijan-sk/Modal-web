import React, { useEffect, useState } from "react";

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
  const [links, setLinks] = useState(initialLinks || []);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setLinks(initialLinks || []);
      setSelectedPlatform(platforms[0].name);
      setUrl("");
      setError(null);
    }
  }, [open, initialLinks]);

  const validateUrl = (value) => {
    if (!value) return false;
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

  // Convert links array to backend format
  const convertToBackendFormat = (linksArray) => {
    const backendData = {};
    
    linksArray.forEach((link) => {
      const platformObj = platforms.find(p => p.name === link.platform);
      if (platformObj) {
        backendData[platformObj.key] = link.url;
      }
    });
    
    return backendData;
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      
      // Convert to backend format
      const backendPayload = convertToBackendFormat(links);
      
      if (onSave) {
        await onSave(backendPayload);
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
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "1rem"
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
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
            cursor: "pointer",
            color: "#666"
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

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontWeight: "500", marginBottom: "0.5rem" }}>
            Platform
          </label>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              border: "1px solid #ddd",
              borderRadius: "6px"
            }}
          >
            {platforms.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontWeight: "500", marginBottom: "0.5rem" }}>
            Insert your link
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-link.com/yourprofile"
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              border: "1px solid #ddd",
              borderRadius: "6px"
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
          <button
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
            onClick={() => {
              setUrl("");
              setError(null);
            }}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "white",
              color: "#000",
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
              fontSize: "14px",
              marginBottom: "1rem"
            }}
          >
            {error}
          </div>
        )}

        <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "1rem" }}>
          Added links
        </h3>

        {links.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: "#999",
              padding: "2rem",
              border: "2px dashed #ddd",
              borderRadius: "8px"
            }}
          >
            No links added yet.
          </div>
        )}

        {links.map((l) => (
          <div
            key={l.platform}
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
                flexShrink: 0
              }}
            >
              {l.platform[0]}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: "600" }}>{l.platform}</div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#666",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}
              >
                {l.url}
              </div>
            </div>
            <a
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "12px",
                color: "#0066cc",
                textDecoration: "none",
                padding: "0 0.5rem"
              }}
            >
              Open
            </a>
            <button
              onClick={() => handleRemove(l.platform)}
              style={{
                fontSize: "12px",
                color: "#c00",
                background: "none",
                border: "none",
                cursor: "pointer"
              }}
            >
              Remove
            </button>
          </div>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.75rem",
            marginTop: "1.5rem",
            paddingTop: "1rem",
            borderTop: "1px solid #eee"
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "0.5rem 1.5rem",
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: "0.5rem 1.5rem",
              backgroundColor: "#000",
              color: "white",
              border: "none",
              borderRadius: "20px",
              cursor: saving ? "not-allowed" : "pointer",
              fontSize: "14px",
              opacity: saving ? 0.5 : 1
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