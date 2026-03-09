import React from 'react'

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">

        <h1 className="text-4xl text-primary mb-4 font-bold">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">
          <span className="font-semibold">Effective Date:</span> 09-03-2026
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          <span className='text-primary'>DrakeOnline </span>respects your privacy and is committed to protecting personal information collected through our platform.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl text-primary mb-4">1. Information We Collect</h2>

          <h4 className="text-xl text-primary mb-3">Information from Models may include:</h4>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1 mb-6">
            <li>Name, email address, phone number</li>
            <li>Physical attributes such as height, weight, and measurements</li>
            <li>Professional experience and skills</li>
            <li>Social media links</li>
            <li>Photos, portfolios, or other media uploads</li>
            <li>Job application activity</li>

            
          </ul>

          <h4 className="text-xl text-primary mb-3">Information from Casting Agencies may include:</h4>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
            <li>Company name and business details</li>
            <li>Contact person information</li>
            <li>Email and phone number</li>
            <li>Job postings and application data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl text-primary mb-4">2. How We Use Information</h2>
          <p className="text-gray-700 mb-2">We use collected information to:</p>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
            <li>Create and manage user accounts</li>
            <li>Display profiles and job listings</li>
            <li>Connect models with casting agencies</li>
            <li>Improve platform functionality and performance</li>
            <li>Maintain platform security</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl text-primary mb-4">3. Public Profile Information</h2>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
            <li>Model profiles may be visible to Casting Agencies on the platform.</li>
            <li>Only information voluntarily provided by the Model will be displayed.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl text-primary mb-4">4. Data Sharing</h2>
          <p className="text-gray-700 mb-2">
            We do not sell or rent personal information.
          </p>
          <p className="text-gray-700 mb-2">
            Information may be shared when required by law, necessary for platform security, or with user consent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl text-primary mb-4">5.Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We implement reasonable security measures to protect user data. However, no system can guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl text-primary mb-4">6. Cookies</h2>
          <p className="text-gray-700 leading-relaxed">
            Cookies may be used to maintain sessions, analyze usage, and improve user experience.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl text-primary mb-4">7. User Rights</h2>
          <p className="text-gray-700 mb-2">Users may:</p>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
            <li>Update profile information</li>
            <li>Control profile visibility</li>
            <li>Request data corrections</li>
            <li>Delete their account</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl text-primary mb-4">8. Children’s Privacy</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            DrakeOnline primarily serves adult users.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            Child artists under the age of 18 may participate only with the consent and supervision of a parent or legal guardian.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We do not allow the collection or display of content that exploits or harms minors.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl text-primary mb-4">9. Policy Updates</h2>
          <p className="text-gray-700 leading-relaxed">
            This Privacy Policy may be updated periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl text-primary mb-4">10. Contact</h2>
          <p className="text-gray-700">
            <span className="text-primary">Email:</span> support@drakeonline.com
          </p>
        </section>

      </div>
    </div>
  )
}

export default PrivacyPolicy