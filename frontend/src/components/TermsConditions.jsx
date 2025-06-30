import React from "react";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-10 text-purple-700">
          📃 Terms & Conditions
        </h1>
        <p className="text-lg text-center mb-12 text-gray-600">
          Please read these terms and conditions carefully before using our
          online voting platform.
        </p>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="leading-relaxed">
            By accessing or using our platform, you agree to comply with and be
            bound by these Terms & Conditions. If you do not agree, you must
            not use our services.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">2. Eligibility</h2>
          <p className="leading-relaxed">
            You must be at least 18 years old or the minimum voting age in your
            jurisdiction and legally eligible to vote in the election to use
            this platform.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">3. User Account</h2>
          <p className="leading-relaxed mb-4">
            You are responsible for maintaining the confidentiality of your
            login credentials. You agree to notify us immediately of any
            unauthorized use or security breach.
          </p>
          <p className="leading-relaxed">
            We reserve the right to suspend or terminate accounts suspected of
            fraudulent activity.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">4. Voting Process</h2>
          <p className="leading-relaxed mb-4">
            Our platform aims to provide a secure and transparent voting process.
            However, final election results are subject to certification by the
            authorized election body.
          </p>
          <p className="leading-relaxed">
            Votes once cast and confirmed cannot be changed or revoked.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">5. Intellectual Property</h2>
          <p className="leading-relaxed mb-4">
            All content on this platform, including text, graphics, logos,
            and software, is owned or licensed by us and protected by
            intellectual property laws.
          </p>
          <p className="leading-relaxed">
            You agree not to reproduce, distribute, or create derivative works
            without express permission.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">6. Limitation of Liability</h2>
          <p className="leading-relaxed">
            We strive to maintain platform availability and accuracy, but we
            are not liable for any direct or indirect damages arising from
            technical issues, unauthorized access, or election outcomes.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">7. User Conduct</h2>
          <p className="leading-relaxed">
            You agree not to misuse the platform, attempt hacking, or interfere
            with other users’ experience. Violations may lead to account
            suspension or legal action.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">8. Changes to Terms</h2>
          <p className="leading-relaxed">
            We reserve the right to modify these Terms & Conditions at any
            time. Changes will be posted on this page with an updated date.
            Continued use after changes indicates acceptance.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">9. Governing Law</h2>
          <p className="leading-relaxed">
            These terms shall be governed by and construed in accordance with
            the laws of the jurisdiction where the platform operates.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">10. Contact Information</h2>
          <p className="leading-relaxed">
            For any questions about these Terms & Conditions, please contact:
          </p>
          <p className="mt-4 font-semibold">Email:</p>
          <p className="mb-4">support@onlinevote.com</p>
          <p className="font-semibold">Mailing Address:</p>
          <p>OnlineVote Inc.<br />123 Democracy Lane<br />Suite 100<br />Cityville, Country</p>
        </section>
      </div>
    </div>
  );
};

export default TermsConditions;
