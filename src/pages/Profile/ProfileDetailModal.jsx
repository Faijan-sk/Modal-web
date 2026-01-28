import React from 'react';
import { MapPin, User, Globe, Ruler, Briefcase, Share2 } from 'lucide-react';

function ProfileDetailModal({ modaldata }) {
  if (!modaldata) return null;

  const { basic_info, profile, professional, social_links } = modaldata;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
      
      {/* --- Header Section with Primary to White Gradient --- */}
      <div className="relative bg-gradient-to-b from-pink-400 via-pink-400/20 to-white px-8 pt-10 pb-6">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
          
          {/* Profile Image */}
          <div className="relative">
            <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-gray-200">
              <img 
                src={basic_info.profile_photo} 
                alt={basic_info.full_name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Basic Info */}
          <div className="text-center md:text-left mb-2">
            <h2 className="text-3xl font-bold text-gray-900 capitalize">
              {basic_info.full_name}
            </h2>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-pink-700 text-sm font-medium shadow-sm border border-pink-100">
                <MapPin size={14} className="mr-1" /> {basic_info.current_city}
              </span>

              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 text-sm font-medium shadow-sm border border-gray-100">
                <User size={14} className="mr-1" /> {basic_info.age} Yrs • {basic_info.gender}
              </span>

              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 text-sm font-medium shadow-sm border border-gray-100">
                <Globe size={14} className="mr-1" /> {basic_info.nationality}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content Body --- */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left Column */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b-2 border-pink-100">
            <Ruler className="text-pink-600" size={20}/>
            <h3 className="text-lg font-bold text-gray-800">Physical Appearance</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <StatBox label="Height" value={`${profile.height} cm`} />
            <StatBox label="Weight" value={`${profile.weight} kg`} />
            <StatBox label="Chest" value={profile.chest_bust} />
            <StatBox label="Waist" value={profile.waist} />
            <StatBox label="Complexion" value={profile.complexion} />
            <StatBox label="Body Type" value={profile.body_type} />
            <StatBox label="Hair" value={profile.hair_length} />
            <StatBox label="Eye Color" value={profile.eye_color} />
          </div>
        </section>

        {/* Right Column */}
        <div className="space-y-8">
          <section>
            <div className="flex items-center gap-2 pb-2 border-b-2 border-pink-100 mb-4">
              <Briefcase className="text-pink-600" size={20}/>
              <h3 className="text-lg font-bold text-gray-800">Professional Info</h3>
            </div>
            
            <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg border-l-4 border-pink-400 mb-4">
              {professional.experience_details}
            </p>

            <div className="space-y-4">
              <TagList title="Skills" items={professional.skills} theme="primary" />
              <TagList title="Languages" items={professional.languages} theme="gray" />
              <TagList title="Categories" items={professional.interested_categories} theme="primarySoft" />
            </div>
          </section>

          {/* Social Links */}
          <section>
            <div className="flex items-center gap-2 pb-2 border-b-2 border-pink-100 mb-4">
              <Share2 className="text-pink-600" size={20}/>
              <h3 className="text-lg font-bold text-gray-800">Connect</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {Object.entries(social_links).map(([name, url]) => (
                url && (
                  <a 
                    key={name}
                    href={url}
                    className="px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-pink-500 hover:text-pink-600 transition-all capitalize shadow-sm"
                  >
                    {name}
                  </a>
                )
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

const StatBox = ({ label, value }) => (
  <div>
    <p className="text-[11px] uppercase tracking-wider font-bold text-gray-400">
      {label}
    </p>
    <p className="text-gray-800 font-semibold">
      {value || '—'}
    </p>
  </div>
);

const TagList = ({ title, items = [], theme }) => {
  const colors = {
    primary: "bg-pink-50 text-pink-700 border-pink-200",
    primarySoft: "bg-pink-100/60 text-pink-700 border-pink-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200",
  };
  
  return (
    <div>
      <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-tight">
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span
            key={i}
            className={`px-2.5 py-0.5 rounded-md border text-xs font-medium ${colors[theme]}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProfileDetailModal;
