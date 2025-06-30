import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-10 text-green-700">
          🔒 Privacy Policy
        </h1>
        <p className="text-lg text-center mb-12 text-gray-600">
          Your privacy is important to us. This policy explains how we collect,
          use, and protect your information when you use our online voting
          platform.
        </p>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="mb-4 leading-relaxed">
            We collect information you provide directly when registering, such
            as your name, email, date of birth, and any government-issued
            identification required for voter verification. We also collect
            technical data including your IP address, browser type, and device
            details for security and analytics purposes.
          </p>
          <p className="mb-4 leading-relaxed">
            Additionally, we use cookies and similar tracking technologies to
            enhance your user experience, remember your preferences, and
            improve site functionality.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="mb-4 leading-relaxed">
            Your data is used to:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Verify your identity for secure online voting</li>
            <li>Manage your voter registration and voting activity</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Enhance the security and performance of our platform</li>
            <li>Send important updates, including voting deadlines and results</li>
          </ul>
          <p className="leading-relaxed">
            We do <strong>not</strong> sell or rent your personal information to
            third parties.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">3. Data Security</h2>
          <p className="mb-4 leading-relaxed">
            We implement robust security measures including encryption,
            firewalls, and secure servers to protect your data against
            unauthorized access, alteration, or destruction.
          </p>
          <p className="mb-4 leading-relaxed">
            Access to personal data is restricted to authorized personnel who
            are bound by confidentiality obligations.
          </p>
          <p className="leading-relaxed">
            In the unlikely event of a data breach, we will notify affected
            users promptly and comply with applicable legal requirements.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">4. Your Rights</h2>
          <p className="mb-4 leading-relaxed">
            Depending on your jurisdiction, you may have the right to:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Access the personal data we hold about you</li>
            <li>Request correction or deletion of inaccurate data</li>
            <li>Restrict or object to certain types of processing</li>
            <li>Withdraw consent where applicable</li>
            <li>Request data portability</li>
          </ul>
          <p className="leading-relaxed">
            To exercise these rights, please contact our Data Protection Officer
            at privacy@onlinevote.com.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">5. Third-Party Services</h2>
          <p className="mb-4 leading-relaxed">
            We may use trusted third-party services for hosting, analytics,
            identity verification, and communication. These partners are
            obligated to protect your data and use it only for specified
            purposes.
          </p>
          <p className="leading-relaxed">
            We encourage you to review their privacy policies as well.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">6. Children’s Privacy</h2>
          <p className="leading-relaxed">
            Our platform is not intended for children under the age of 18.
            We do not knowingly collect personal information from minors.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">7. Changes to This Policy</h2>
          <p className="leading-relaxed">
            We may update this Privacy Policy occasionally to reflect changes in
            practices or legal requirements. We encourage you to review it
            periodically. Continued use of our platform after updates
            constitutes acceptance of those changes.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">8. Contact Us</h2>
          <p className="leading-relaxed">
            If you have questions or concerns about this policy or your data,
            please reach out to:
          </p>
          <p className="mt-4 font-semibold">Email:</p>
          <p className="mb-4">privacy@onlinevote.com</p>
          <p className="font-semibold">Mailing Address:</p>
          <p>OnlineVote Inc.<br />123 Democracy Lane<br />Suite 100<br />Cityville, Country</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
