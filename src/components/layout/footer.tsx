export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          {/* Company Info */}
          <div className="sm:col-span-2">
            <h3 className="text-sm font-bold mb-1 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              PredictNaija
            </h3>
            <p className="text-gray-300 text-xs mb-2 max-w-md leading-tight">
              AI-powered football predictions platform.
            </p>
            <div className="flex space-x-2">
              {/* Twitter/X */}
              <a 
                href="https://twitter.com/predictnaija" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 p-1.5 rounded transition-colors cursor-pointer"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="https://facebook.com/predictnaija" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 p-1.5 rounded transition-colors cursor-pointer"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com/predictnaija" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 p-1.5 rounded transition-colors cursor-pointer"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C8.396 0 7.987 0.011 6.765 0.06 2.772 0.227 0.227 2.772 0.06 6.765 0.011 7.985 0 8.394 0 12.017c0 3.621 0.011 4.029 0.06 5.251 0.167 3.993 2.712 6.538 6.705 6.705 1.221 0.049 1.63 0.06 5.251 0.06 3.621 0 4.029 -0.011 5.251 -0.06 3.993 -0.167 6.538 -2.712 6.705 -6.705 0.049 -1.221 0.06 -1.63 0.06 -5.251 0 -3.621 -0.011 -4.029 -0.06 -5.251 -0.167 -3.993 -2.712 -6.538 -6.705 -6.705 -1.221 -0.049 -1.63 -0.06 -5.251 -0.06zM12.017 2.16c3.579 0 3.96 0.009 5.167 0.057 2.788 0.119 4.309 1.64 4.428 4.428 0.048 1.207 0.057 1.588 0.057 5.167 0 3.579 -0.009 3.96 -0.057 5.167 -0.119 2.788 -1.64 4.309 -4.428 4.428 -1.207 0.048 -1.588 0.057 -5.167 0.057 -3.579 0 -3.96 -0.009 -5.167 -0.057 -2.788 -0.119 -4.309 -1.64 -4.428 -4.428 -0.048 -1.207 -0.057 -1.588 -0.057 -5.167 0 -3.579 0.009 -3.96 0.057 -5.167 0.119 -2.788 1.64 -4.309 4.428 -4.428 1.207 -0.048 1.588 -0.057 5.167 -0.057z"/>
                  <path d="M12.017 5.838c-3.416 0 -6.182 2.766 -6.182 6.182 0 3.416 2.766 6.182 6.182 6.182 3.416 0 6.182 -2.766 6.182 -6.182 0 -3.416 -2.766 -6.182 -6.182 -6.182zM12.017 15.028c-1.66 0 -3.008 -1.348 -3.008 -3.008 0 -1.66 1.348 -3.008 3.008 -3.008 1.66 0 3.008 1.348 3.008 3.008 0 1.66 -1.348 3.008 -3.008 3.008z"/>
                  <circle cx="18.406" cy="5.595" r="1.439"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
        <h3 className="text-sm font-bold mb-1 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                    Links
            </h3>            <ul className="space-y-0.5 text-xs">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/admin" className="text-gray-300 hover:text-white transition-colors">Admin</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Docs</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-2 flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0">
          <div className="text-gray-400 text-xs">
            © {currentYear} CodeX Team
          </div>
          <div className="flex space-x-3 text-xs text-gray-300">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}