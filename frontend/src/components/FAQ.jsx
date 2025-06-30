import React from 'react';

const FAQs = [
  {
    question: "What is online voting?",
    answer:
      "Online voting is a method of casting votes via the internet, allowing eligible voters to participate in elections without physically attending polling stations. It is often used for organizational elections, shareholder votes, and, in some regions, governmental elections.",
  },
  {
    question: "Who can vote online?",
    answer:
      "Any registered voter who meets the eligibility criteria for the specific election can vote online. Verification methods such as ID checks, email, SMS OTP, or biometric authentication may be required.",
  },
  {
    question: "Is my vote secure and private?",
    answer:
      "Yes, our system uses military-grade encryption, secure authentication, and anonymized data handling to ensure your vote is both secure and confidential. Votes are recorded without linking them to personal identity.",
  },
  {
    question: "How do I register for online voting?",
    answer:
      "You must complete the registration process through our portal or be pre-registered by the organization conducting the vote. Once registered, you will receive a unique login credential to access the voting platform.",
  },
  {
    question: "Can I vote using my phone?",
    answer:
      "Absolutely! Our platform is optimized for mobile devices, so you can vote using your smartphone or tablet, in addition to laptops and desktops.",
  },
  {
    question: "What browsers are supported?",
    answer:
      "We support all modern browsers, including Chrome, Firefox, Safari, Edge, and Opera. Make sure your browser is updated for the best experience.",
  },
  {
    question: "How do I know my vote was counted?",
    answer:
      "After you cast your vote, you will receive a confirmation message along with a unique tracking code. You can use this code to verify that your vote was recorded (without revealing your vote contents).",
  },
  {
    question: "Can I vote more than once?",
    answer:
      "No. The system ensures that each verified user can vote only once. Attempts to vote multiple times are automatically blocked and logged.",
  },
  {
    question: "What should I do if I forget my password?",
    answer:
      "Click the 'Forgot Password' link on the login page. You’ll be asked to verify your identity before being allowed to reset your password securely.",
  },
  {
    question: "What happens if I lose internet connection during voting?",
    answer:
      "If your connection drops before you complete voting, your session will time out for security. You'll need to log in again. Your vote is only recorded once you confirm submission.",
  },
  {
    question: "Can I see the results live?",
    answer:
      "Some elections allow real-time result viewing while others only release results after voting ends. Please check with your election organizer for specific timelines.",
  },
  {
    question: "What makes this platform trustworthy?",
    answer:
      "We use tamper-proof technologies like blockchain for vote logging, independent third-party audits, and real-time monitoring to ensure full transparency and security.",
  },
  {
    question: "How is voter identity verified?",
    answer:
      "Depending on your election, we may use national ID numbers, email OTPs, biometric login, or organizational credentials to verify your identity before voting.",
  },
  {
    question: "Is online voting legal?",
    answer:
      "Yes, online voting is legal in many jurisdictions and is widely used by corporations, unions, and government agencies. However, regulations vary by country and election type.",
  },
  {
    question: "Can I vote anonymously?",
    answer:
      "Yes. While we authenticate your identity before voting, the vote itself is anonymized so your choices are not linked to your personal information.",
  },
  {
    question: "What if I voted for the wrong candidate?",
    answer:
      "Votes cannot be changed after submission. Please review your selections carefully before hitting 'Submit'.",
  },
  {
    question: "How do you prevent vote tampering?",
    answer:
      "We use end-to-end encryption, secure hosting, blockchain records, and intrusion detection systems. Additionally, our system is regularly audited by independent cybersecurity firms.",
  },
  {
    question: "What if I suspect fraud?",
    answer:
      "If you suspect voting fraud, please contact us immediately at security@onlinevote.com. We will investigate the issue promptly.",
  },
  {
    question: "Can multiple users vote from the same device?",
    answer:
      "Yes, but each user must log in with their own credentials. Make sure to fully log out after voting to prevent unauthorized access.",
  },
  {
    question: "Is there a deadline for voting?",
    answer:
      "Yes, each election has a clearly defined start and end time. Make sure to cast your vote before the deadline. Votes submitted afterward will not be counted.",
  },
  {
    question: "How can I get support?",
    answer:
      "You can reach out to our support team via live chat, email at support@onlinevote.com, or through the 'Help Center' on our website. We're available 24/7 during voting periods.",
  },
  {
    question: "What if the site is down on voting day?",
    answer:
      "Our platform is built for 99.99% uptime and has failover backups in place. In the rare event of downtime, we will notify all users and extend voting time as needed.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-10 text-blue-700">🗳️ Frequently Asked Questions</h1>
        <p className="text-lg text-center mb-12 text-gray-600">
          Everything you need to know about voting online — clearly explained.
        </p>

        <div className="space-y-10">
          {FAQs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{faq.question}</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
