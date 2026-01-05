/**
 * Footer component
 */
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white mt-auto shadow-2xl">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">CS</span>
              </div>
              <span className="font-bold text-lg">
                Customer Segmentation AI
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300">
              © 2024 Built with ❤️ using React & FastAPI
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a
              href="/about"
              className="text-gray-300 hover:text-white transition-all transform hover:scale-110 text-sm font-semibold">
              📖 About
            </a>
            <a
              href="/documentation"
              className="text-gray-300 hover:text-white transition-all transform hover:scale-110 text-sm font-semibold">
              📚 Docs
            </a>
            <a
              href="/history"
              className="text-gray-300 hover:text-white transition-all transform hover:scale-110 text-sm font-semibold">
              🕐 History
            </a>
            <a
              href="/settings"
              className="text-gray-300 hover:text-white transition-all transform hover:scale-110 text-sm font-semibold">
              ⚙️ Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
