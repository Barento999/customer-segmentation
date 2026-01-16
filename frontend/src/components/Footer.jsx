/**
 * Footer component
 */
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-text-primary mt-auto shadow-lg relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 via-accent-purple/5 to-accent-green/5 pointer-events-none"></div>

      <div className="container mx-auto px-4 py-6 sm:py-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2 group">
              <div className="w-10 h-10 bg-gradient-cool rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <span className="text-white font-bold text-base">CS</span>
              </div>
              <span className="font-bold text-lg gradient-text">
                Customer Segmentation AI
              </span>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary">
              © 2024 Built with ❤️ using React & FastAPI
            </p>
            <p className="text-xs text-text-secondary mt-1">
              Powered by Machine Learning & K-Means Clustering
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a
                href="/about"
                className="text-text-secondary hover:text-accent-blue transition-all transform hover:scale-110 text-sm font-semibold flex items-center gap-1">
                <span>📖</span> About
              </a>
              <a
                href="/documentation"
                className="text-text-secondary hover:text-accent-purple transition-all transform hover:scale-110 text-sm font-semibold flex items-center gap-1">
                <span>📚</span> Docs
              </a>
              <a
                href="/history"
                className="text-text-secondary hover:text-accent-green transition-all transform hover:scale-110 text-sm font-semibold flex items-center gap-1">
                <span>🕐</span> History
              </a>
              <a
                href="/settings"
                className="text-text-secondary hover:text-accent-purple transition-all transform hover:scale-110 text-sm font-semibold flex items-center gap-1">
                <span>⚙️</span> Settings
              </a>
            </div>

            {/* Tech Stack Badges */}
            <div className="flex gap-2 flex-wrap justify-center">
              <span className="px-3 py-1 bg-accent-blue/10 text-accent-blue rounded-full text-xs font-semibold border border-accent-blue/20">
                React
              </span>
              <span className="px-3 py-1 bg-accent-purple/10 text-accent-purple rounded-full text-xs font-semibold border border-accent-purple/20">
                FastAPI
              </span>
              <span className="px-3 py-1 bg-accent-green/10 text-accent-green rounded-full text-xs font-semibold border border-accent-green/20">
                ML
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
