const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-green-100 via-white to-green-50 text-gray-800 pt-16 pb-8 px-6 border-t border-green-200 shadow-inner">
      <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-4 sm:grid-cols-2 grid-cols-1">

        {/* Branding */}
        <div>
          <h2 className="text-3xl font-extrabold text-green-800 tracking-wide mb-3">
            VoteNow
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-xs">
            Empowering democratic participation through modern and secure technology.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-800 uppercase tracking-wider">
            Explore
          </h3>
          <ul className="space-y-2 text-gray-700 text-sm font-medium">
            <li>
              <a href="/" className="hover:text-green-700 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/votinginfo" className="hover:text-green-700 transition">
                How to Vote
              </a>
            </li>
            <li>
              <a href="/livepolls" className="hover:text-green-700 transition">
                Voting Portal
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-800 uppercase tracking-wider">
            Resources
          </h3>
          <ul className="space-y-2 text-gray-700 text-sm font-medium">
            <li>
              <a href="/faq" className="hover:text-green-700 transition">
                FAQs
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-green-700 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-green-700 transition">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-800 uppercase tracking-wider">
            Connect
          </h3>
          <div className="flex gap-4 text-green-600">
            {[
              {
                href: '#',
                label: 'Facebook',
                svgPath:
                  'M22 12a10 10 0 10-11.62 9.87v-7H8v-2.87h2.38V9.6c0-2.34 1.4-3.63 3.54-3.63 1.02 0 2.09.18 2.09.18v2.3h-1.18c-1.17 0-1.54.73-1.54 1.48v1.77h2.63l-.42 2.87h-2.21v7A10 10 0 0022 12z',
              },
              {
                href: '#',
                label: 'Twitter',
                svgPath:
                  'M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.6 8.6 0 01-2.72 1.04A4.3 4.3 0 0015.5 4c-2.38 0-4.3 1.92-4.3 4.3 0 .34.04.66.11.97-3.57-.18-6.74-1.89-8.86-4.48a4.28 4.28 0 00-.58 2.17c0 1.5.76 2.82 1.9 3.6a4.3 4.3 0 01-1.95-.54v.06c0 2.1 1.5 3.86 3.48 4.26a4.3 4.3 0 01-1.94.07c.55 1.7 2.13 2.95 4.01 2.99A8.63 8.63 0 014 19.54a12.2 12.2 0 006.6 1.94c7.92 0 12.25-6.56 12.25-12.25 0-.19 0-.38-.01-.57A8.72 8.72 0 0024 5.6a8.6 8.6 0 01-2.54.7z',
              },
              {
                href: '#',
                label: 'Instagram',
                svgPath:
                  'M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.5a1 1 0 110 2 1 1 0 010-2z',
              },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                aria-label={social.label}
                className="hover:text-green-900 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.svgPath} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 text-center text-sm text-gray-600 font-semibold">
        &copy; {new Date().getFullYear()} VoteNow • Built with ❤️ 
      </div>
    </footer>
  );
};

export default Footer;
