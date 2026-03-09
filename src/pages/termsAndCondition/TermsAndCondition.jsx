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
        Welcome to  <span className="   text-primary">DrakeOnline</span>. By accessing or using our website or mobile application, you agree to comply with and be bound by the following Terms & Conditions.</p>

    

        <section className="mb-8">
          <h2 className="text-2xl text-primary mb-4">1. Eligibility</h2>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
                        <li>DrakeOnline is primarily intended for individuals who are <span className="text-primary"> 18 years of age or older</span> .</li>

            <li>In certain cases, child artists under the age of 18 may participate in casting opportunities through the supervision and consent of a parent or legal guardian. Parents or guardians are responsible for managing and supervising accounts created for minors.</li>
            <li>By registering, you confirm that the information provided is accurate and complete.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">2. User Accounts</h2>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
            <li>Users are responsible for maintaining the confidentiality of their login credentials.</li>
            <li>You agree to accept responsibility for all activities that occur under your account. DrakeOnline reserves the right to suspend or terminate accounts that violate our policies.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">3. Model Responsibilities</h2>
          <p className=" mb-2 text-primary">Models agree to:</p>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
            <li>Provide accurate profile and professional information</li>
            <li>Upload only content they own or have rights to</li>
            <li>Ensure uploaded media complies with platform guidelines</li>
                        <li>Maintain professional and respectful conduct</li>

          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">4. Casting Agency Responsibilities</h2>
          <p className="text-primary mb-2">Casting Agencies agree to:</p>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
            <li>Post genuine and lawful job opportunities</li>
            <li>Use applicant information only for casting purposes</li>
            <li>Avoid misleading or fraudulent job postings</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">5. Job Applications</h2>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
            <li>DrakeOnline acts only as a <span className='text-primary'>platform connecting Models and Casting Agencies</span>.</li>
            <li>We do not guarantee job placement, project selection, or professional engagements. Any agreements between users occur outside the platform.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">6. Content Ownership</h2>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
            <li>Users retain ownership of their uploaded content.</li>
            <li>By uploading content, users grant DrakeOnline a non-exclusive license to display the content on the platform for service operation.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">7. Prohibited Activities</h2>
          <p className="text-gray-700 mb-2"><span className="   text-primary">Users must not:</span></p>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
            <li>Post false or misleading information</li>
            <li>Upload illegal, abusive, or inappropriate content</li>
            <li>Harass or threaten other users</li>
                        <li>Attempt to access unauthorized systems</li>

          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">8. Account Termination</h2>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
            <li> <span className='text-primary'>DrakeOnline</span> reserves the right to suspend or terminate accounts that violate these Terms or misuse the platform.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">9. Limitation of Liability</h2>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
            <li><span className='text-primary'>DrakeOnline</span>  is not responsible for disputes, losses, or damages arising from interactions between users.</li>
    
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">10. Governing Law</h2>
          <p className="text-gray-700 leading-relaxed">
These Terms shall be governed according to the <span className='text-primary'>laws of India </span>.          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">11. Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
           We may update these Terms from time to time. Continued use of the platform indicates acceptance of the updated terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl    text-primary mb-4">12. Contact Us</h2>
          {/* <p className="text-gray-700 mb-2">For any questions regarding these Terms:</p> */}
          <p className="text-gray-700">
            <span className="   text-primary">Email:</span>support@drakeonline.com
          </p>
        </section>
      </div>
    </div>
  )
}

export default TermsAndConditions