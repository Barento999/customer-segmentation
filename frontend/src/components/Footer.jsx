/**
 * Footer component
 */
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-text-primary mt-auto shadow-2xl border-t border-white/10">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-xl">
                <span className="text-text-primary font-bold text-sm">CS</span>
              </div>
              <span className="font-bold text-lg drop-shadow-lg">
                Customer Segmentation AI
              </span>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary drop-shadow">
              © 2024 Built with ❤️ using React & FastAPI
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a
              href="/about"
              className="text-text-secondary hover:text-text-primary transition-all transform hover:scale-110 text-sm font-semibold drop-shadow">
              📖 About
            </a>
            <a
              href="/documentation"
              className="text-text-secondary hover:text-text-primary transition-all transform hover:scale-110 text-sm font-semibold drop-shadow">
              📚 Docs
            </a>
            <a
              href="/history"
              className="text-text-secondary hover:text-text-primary transition-all transform hover:scale-110 text-sm font-semibold drop-shadow">
              🕐 History
            </a>
            <a
              href="/settings"
              className="text-text-secondary hover:text-text-primary transition-all transform hover:scale-110 text-sm font-semibold drop-shadow">
              ⚙️ Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
