import React from 'react'

function ChildSafetyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">

        <h1 className="text-4xl text-primary mb-6 font-bold">
          Child Safety Standards Policy (CSAE)
        </h1>

        <p className="text-gray-700 mb-8 leading-relaxed">
          DrakeOnline is committed to maintaining a safe platform and strictly prohibits any form of child sexual abuse and exploitation (CSAE).
        </p>

        <section className="mb-8">
          <h2 className="text-2xl text-primary mb-4">01. Zero Tolerance Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            DrakeOnline has zero tolerance for child sexual abuse material (CSAM), child exploitation, or any content that harms or sexualizes minors.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl text-primary mb-4">02. Age and Minor Participation</h2>
          <p className="text-gray-700 mb-2">
            DrakeOnline primarily serves users aged 18 years and older.
          </p>
          <p className="text-gray-700 mb-2">
            In certain cases, child artists under the age of 18 may participate in casting opportunities only with the consent and supervision of a parent or legal guardian.
          </p>
          <p className="text-gray-700">
            Parents or guardians are responsible for supervising minors using the platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl text-primary mb-4">03. Prohibited Content</h2>
          <p className="text-gray-700 mb-2">
            The following is strictly prohibited:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
            <li>Child sexual abuse material (CSAM)</li>
            <li>Sexualized images involving minors</li>
            <li>Content that exploits or harms children</li>
            <li>Inappropriate communication with minors</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl text-primary mb-4">04. Content Monitoring</h2>
          <p className="text-gray-700 leading-relaxed">
            DrakeOnline reviews and monitors user-generated content including profiles, images, and job postings to ensure compliance with our safety policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl text-primary mb-4">05. Reporting Violations</h2>
          <p className="text-gray-700 leading-relaxed">
            Users can report suspicious activity or inappropriate content by contacting our support team.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl text-primary mb-4">06. Enforcement</h2>
          <p className="text-gray-700 mb-2">
            Accounts violating child safety standards may be suspended or permanently removed.
          </p>
          <p className="text-gray-700">
            We may also cooperate with law enforcement authorities where required.
          </p>
        </section>

      <section>
  <h2 className="text-2xl text-primary mb-4">07. Safety Contact</h2>
  <p className="text-gray-700">
    If you believe content violates these standards, contact:
  </p>
  <p className="text-gray-700 mt-2">
    <span className="text-primary">Email:</span>{" "}
    <a
      href="mailto:support@drakeonline.com"
      className="text-primary underline"
    >
      support@drakeonline.com
    </a>
  </p>
</section>

      </div>
    </div>
  )
}

export default ChildSafetyPolicy