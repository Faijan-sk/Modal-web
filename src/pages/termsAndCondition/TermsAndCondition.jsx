import React from 'react'

function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">
        <h1 className="text-4xl    text-primary mb-4 font-bold">Terms & Conditions</h1>
        <p className="text-gray-600 mb-8">
          <span className="font-semibold">Effective Date: </span> 28-01-2026
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          By accessing or using <span className="   text-primary">DrakeOnline</span>, you agree to comply with and be bound by these Terms & Conditions.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl text-primary mb-4">1. Eligibility</h2>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
            <li>You must be  <span className="text-primary"> 18 years or older</span> to use this platform.</li>
            <li>By registering, you confirm that the information provided is accurate and complete.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">2. User Accounts</h2>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
            <li>Users are responsible for maintaining account confidentiality.</li>
            <li>You are responsible for all activities under your account.</li>
            <li>We reserve the right to suspend or terminate accounts violating our policies.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">3. Model Responsibilities</h2>
          <p className="text-gray-700 mb-2">Models agree to:</p>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
            <li>Provide accurate profile and professional information</li>
            <li>Upload only content they own or have rights to</li>
            <li>Maintain professional conduct on the platform</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">4. Casting Agency Responsibilities</h2>
          <p className="text-gray-700 mb-2">Casting Agencies agree to:</p>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
            <li>Post genuine and lawful job opportunities</li>
            <li>Use applicant information only for casting purposes</li>
            <li>Avoid misleading or fraudulent job postings</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">5. Job Applications</h2>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
            <li>DrakeOnline acts as a <span className="   text-primary"> platform only </span> and does not guarantee job placement.</li>
            <li>We are not responsible for agreements made outside the platform.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">6. Content Ownership</h2>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
            <li>Users retain ownership of their uploaded content.</li>
            <li>By uploading content, you grant DrakeOnline a non-exclusive right to display it on the platform.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">7. Prohibited Activities</h2>
          <p className="text-gray-700 mb-2"><span className="   text-primary">Users must not:</span></p>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
            <li>Post false, misleading, or harmful content</li>
            <li>Harass or abuse other users</li>
            <li>Attempt to access unauthorized data or systems</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">8. Account Termination</h2>
          <p className="text-gray-700 mb-2"><span className="   text-primary">We reserve the right to:</span></p>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
            <li>Suspend or terminate accounts without notice for policy violations</li>
            <li>Remove content that violates our terms</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">9. Limitation of Liability</h2>
          <p className="text-gray-700 mb-2"><span className="   text-primary">DrakeOnline is not liable for:</span></p>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
            <li>Any loss, damage, or disputes between users</li>
            <li>Job outcomes or professional agreements</li>
            <li>Technical interruptions or data loss</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">10. Governing Law</h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms shall be governed and interpreted according to the <span className="   text-primary">laws of US.</span>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">11. Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update these Terms & Conditions at any time. <span className="   text-primary">Continued use of the platform indicates acceptance of the updated terms.</span>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">12. Contact Us</h2>
          <p className="text-gray-700 mb-2">For any questions regarding these Terms:</p>
          <p className="text-gray-700">
            <span className="   text-primary">Email:</span> support@drakeonline.com 
          </p>
        </section>
      </div>
    </div>
  )
}

export default TermsAndConditions