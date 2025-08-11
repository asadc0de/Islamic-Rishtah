import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
       {/* Footer */}
    <footer className="bg-gray-900 text-white py-8 md:py-12">
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mt-12 mr-5">
          <img 
              src="./images/nMM.png" 
              alt="Logo" 
              className="w-50 sm:w-32 md:w-48 h-auto mb-4 object-contain" 
            />
          {/* Logo Section - mobile: left, big image; desktop: normal */}
          <div className="flex flex-col items-start mb-6 md:mb-0 px-4 sm:px-6 md:px-0">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            <h3 className='text-xl font-bold'>Wife<span className="text-red-500 font-bold text-xl">4</span>Life</h3>
            </div>
            <p className="text-gray-400 text-left text-sm leading-relaxed max-w-xs">
              Connecting Muslim hearts worldwide with dignity and respect.
            </p>
          </div>
          {/* Quick Links */}
          <div className="flex flex-col items-start px-4 sm:px-6 md:px-0">
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#howitworks" className="text-gray-400 hover:text-white text-base transition-colors">How It Works</a></li>
              <li><a href="#successstories" className="text-gray-400 hover:text-white text-base transition-colors">Success Stories</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white text-base transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-start px-4 sm:px-6 md:px-0">
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link to={'/privacy-policy'} className="text-gray-400 hover:text-white text-base transition-colors">Privacy Policy</Link></li>
              <li><Link to={'/termsandconditions'} className="text-gray-400 hover:text-white text-base transition-colors">Terms & Conditions</Link></li>
              <li><Link to={'/cookie-policy'} className="text-gray-400 hover:text-white text-base transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-start px-4 sm:px-6 md:px-0">
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <div className="space-y-1 text-base text-gray-400 text-left w-full">
              <a className='mb-4' href="mailto:wife4life@mail.co.uk">wife4life@mail.co.uk</a>
               <h3 className="text-white font-semibold ">Address:</h3>
              <p>JPJ7+7GM,At-Thamiri street</p>
              <p>Ad-Dirah,Riyadh</p>
              <p>Kingdom of Saudi Arabia (KSA)</p>
            </div>
          </div>
        </div>

  {/* Copyright */}
  <div className="border-t border-gray-800 mt-8 pt-6 text-center px-4 sm:px-6 md:px-0">
          <p className="text-gray-400 text-xs sm:text-sm">© 2025 MYFLEXLIFE. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer