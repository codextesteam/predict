import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mb-6 shadow-lg">
            <span className="text-2xl text-white font-bold">🎯</span>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            PredictNaija Validation
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Internal tool for testing prediction API accuracy. 
            Validate if third-party prediction APIs provide reliable data before building our full product.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8 text-left">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-yellow-600 text-xl">🎯</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-yellow-800">Success Metric</h3>
                <p className="text-yellow-700 mt-1">
                  If API achieves <span className="font-bold">≥65% accuracy</span> across <span className="font-bold">100+ matches</span>, 
                  we proceed with the full product.
                </p>
              </div>
            </div>
          </div>

          <Link 
            href="/admin" 
            className="inline-block bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold text-lg py-4 px-12 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            🚀 Go to Admin Dashboard →
          </Link>
        </div>
        

      </div>
    </div>
  );
}