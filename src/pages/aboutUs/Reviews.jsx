// src/components/TestimonialsSection.jsx
import React from "react";

const reviews = [
  {
    id: 1,
    name: "JOHN D.",
    role: "modal",
    avatar: "https://i.pravatar.cc/80?img=12",
    rating: 5,
    text: "Working with this clinic has been an incredible experience. The staff is caring, professional, and always makes me feel comfortable. I always feel heard and supported during every visit."
  },
  {
    id: 2,
    name: "SOPHIA P.",
    role: "modal",
    avatar: "https://i.pravatar.cc/80?img=32",
    rating: 5,
    text: "From my very first appointment, I knew I was in good hands. The team is thorough and kind, and they take the time to explain everything clearly. I feel more confident about my health than ever."
  },
  {
    id: 3,
    name: "MICHAEL R.",
    role: "modal",
    avatar: "https://i.pravatar.cc/80?img=45",
    rating: 4,
    text: "They truly go above and beyond. The appointments run on time, the follow-ups are consistent, and I never feel rushed. I appreciate how much they genuinely care about their modals."
  },
  {
    id: 4,
    name: "EMILY W.",
    role: "modal",
    avatar: "https://i.pravatar.cc/80?img=5",
    rating: 5,
    text: "I was nervous at first, but the warmth and encouragement from the entire team made all the difference. Their guidance has helped me build healthier habits that actually last."
  },
  {
    id: 5,
    name: "DAVID K.",
    role: "modal",
    avatar: "https://i.pravatar.cc/80?img=20",
    rating: 5,
    text: "The care here is on another level. They listen, ask the right questions, and personalize every recommendation. I recommend this clinic to family and friends all the time."
  },
  {
    id: 6,
    name: "LARA S.",
    role: "modal",
    avatar: "https://i.pravatar.cc/80?img=28",
    rating: 5,
    text: "I love how attentive and organized the staff is. Scheduling is easy, reminders are helpful, and the environment is always clean and welcoming. I’m so glad I found this place."
  },
  {
    id: 7,
    name: "ADAM T.",
    role: "modal",
    avatar: "https://i.pravatar.cc/80?img=15",
    rating: 4,
    text: "They were recommended to me and I’m really happy I came. My treatment plan was clear and effective, and I always feel like my time and concerns are respected."
  },
  {
    id: 8,
    name: "NORA H.",
    role: "modal",
    avatar: "https://i.pravatar.cc/80?img=36",
    rating: 5,
    text: "The entire experience has been seamless—from the front desk to follow-up calls. I feel truly cared for and supported. I’m extremely grateful for their dedication."
  },
];

const TestimonialsSection = () => {
  return (
    <section
      style={{
        padding: "80px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>

        <h2 className="mb-10 text-3xl md:text-4xl font-serif tracking-[0.35em] text-pink-500 uppercase text-center">
          REAL PEOPLE. REAL STORIES
          </h2>     
        <p style={{ marginTop: "15px", color: "#555" }}>
          What our modals are saying
        </p>
      </div>

      {/* Reviews grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {reviews.map((review) => (
          <article
            key={review.id}
            style={{
              border: "1px solid #eee",
              padding: "32px 32px 24px",
              borderRadius: "4px",
              backgroundColor: "#fff",
              minHeight: "260px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Stars */}
            <div style={{ marginBottom: "16px", fontSize: "18px" }}>
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>

            {/* Text */}
            <p style={{ color: "#444", lineHeight: 1.6 }}>
              {review.text}
            </p>

            {/* Footer: avatar + name */}
            <div
              style={{
                marginTop: "32px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <img
                src={review.avatar}
                alt={review.name}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <div>
                <div
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    letterSpacing: "0.08em",
                  }}
                >
                  {review.name}
                </div>
                <div style={{ fontSize: "12px", color: "#777" }}>
                  {review.role}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
