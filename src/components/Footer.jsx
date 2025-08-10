import React from 'react'

const Footer = () => {
  return (
    <div>
       {/* Footer */}
    <footer className="bg-gray-900 text-white py-8 md:py-12">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo Section - mobile: left, big image; desktop: normal */}
          <div className="flex flex-col items-start mb-6 md:mb-0">
            <img 
              src="./images/wife4life.png" 
              alt="Logo" 
              className="w-40 sm:w-32 md:w-28 h-auto mb-4 object-contain" 
            />
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <span className="text-red-500 font-bold text-lg">MYFLEXLIFE</span>
            </div>
            <p className="text-gray-400 text-left text-sm leading-relaxed max-w-xs">
              Connecting Muslim hearts worldwide with dignity and respect.
            </p>
          </div>
          {/* Quick Links */}
          <div className="flex flex-col items-start">
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#howitworks" className="text-gray-400 hover:text-white text-base transition-colors">How It Works</a></li>
              <li><a href="#successstories" className="text-gray-400 hover:text-white text-base transition-colors">Success Stories</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white text-base transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-start">
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-base transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-base transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-base transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-start">
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <div className="space-y-1 text-base text-gray-400 text-left w-full">
              <a href="mailto:hello@myflexlife.co.uk">hello@myflexlife.co.uk</a>
              <p>MYFLEXLIFE Limited</p>
              <p>Office 7, 35-37 Ludgate Hill</p>
              <p>All Saints, Slough</p>
              <p>Kingdom of Saudi Arabia (KSA)</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">© 2025 MYFLEXLIFE. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer
