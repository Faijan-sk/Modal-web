import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useJwt from "./../../endpoints/jwt/useJwt";
import { useParams } from "react-router-dom";

import MaleModel from "./../../../src/assets/logo/MaleModal.jpeg";
import FemaleModal from "./../../../src/assets/logo/femaleModal.jpg";

const FALLBACK_IMAGE =
  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800";

function Models() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const { jobUid } = useParams();

  useEffect(() => {
    // Reset state on jobUid change
    setModels([]);
    setLoading(true);

    async function fetchPublicModels() {
      try {
        const response = await useJwt.getAppliacantsList(jobUid);
        const data = response?.data ?? response;
        const applicants = Array.isArray(data)
          ? data.map((item) => ({
              ...item.applicant,
              application_uuid: item.application_uuid,
              status: item.status,
            }))
          : [];
        setModels(applicants);
      } catch (error) {
        console.error("Failed to fetch public models", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPublicModels();
  }, [jobUid]); // ✅ jobUid added — ab har job card change pe fresh API call hogi

  const getProfileImage = (model) => {
    if (model?.profile_photo) return model.profile_photo;
    const gender = model?.gender?.toLowerCase();
    if (gender === "male") return MaleModel;
    if (gender === "female") return FemaleModal;
    return FALLBACK_IMAGE;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-sm text-gray-500">Loading models...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-8">
          Models
        </h1>

        {models.length === 0 && (
          <p className="text-sm text-gray-500">No models found.</p>
        )}

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {models.map((model) => {
            const profile = model.profile || {};

            return (
              <Link
                key={model.application_uuid}
                to={`/profile`}
                state={{ uid: model.uuid }}
                className="group cursor-pointer block"
              >
                <div className="relative">
                  <img
                    src={getProfileImage(model)}
                    alt={model.full_name}
                    className="w-full h-80 object-cover rounded-2xl transition duration-500 group-hover:scale-[1.02] group-hover:blur-[1px]"
                  />

                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-black/55 opacity-0 backdrop-blur-sm transition duration-500 group-hover:opacity-100">
                    <div className="text-white text-center px-6">
                      {profile.height && (
                        <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-4">
                          Height {profile.height}
                        </p>
                      )}
                      <div className="text-xs sm:text-sm space-y-1 leading-relaxed">
                        {profile.chest_bust && <p>Chest {profile.chest_bust}</p>}
                        {profile.waist && <p>Waist {profile.waist}</p>}
                        {profile.hips && <p>Hips {profile.hips}</p>}
                        {profile.shoe_size && <p>Shoe Size - {profile.shoe_size}</p>}
                        {(profile.hair_color || profile.eye_color) && (
                          <p>
                            Hair - {profile.hair_color || "—"} | Eyes -{" "}
                            {profile.eye_color || "—"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm sm:text-base font-medium">
                    {model.full_name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {model.current_city || "—"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Models;