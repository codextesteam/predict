'use client';

import { useMatches, useFetchFixtures, useLogResult } from '@/hooks/useMatches';

export default function AdminDashboard() {
  const { data: matches, isLoading, error } = useMatches();
  const fetchFixtures = useFetchFixtures();
  const logResult = useLogResult();

  const validatedMatches = matches?.filter(m => m.actual_result !== null) || [];
  const correctPredictions = validatedMatches.filter(m => m.is_correct).length;
  const accuracy = validatedMatches.length > 0 
    ? Math.round((correctPredictions / validatedMatches.length) * 100) 
    : 0;

  const handleFetchFixtures = async () => {
    try {
      await fetchFixtures.mutateAsync(39);
      alert('Fixtures fetched successfully!');
    } catch (err) {
      alert('Error fetching fixtures. Please check if the backend server is running.');
    }
  };

  const handleLogResult = async (matchId: number, result: string) => {
    try {
      await logResult.mutateAsync({ matchId, result });
    } catch (err) {
      alert('Error logging result. Please check if the backend server is running.');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-red-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-red-600">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Backend Connection Error</h2>
          <p className="text-gray-600 mb-6">
            Unable to connect to the backend server. Please ensure the backend is running.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-left">
            <p className="text-sm text-yellow-800">
              <strong>Development Tip:</strong> Backend APIs should be available at <code>/admin/api/</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full shadow-lg mb-4">
            <span className="text-2xl text-white font-bold">⚽</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
            PREDICTNAIJA VALIDATION
          </h1>
          <p className="text-lg text-gray-600">
            Test API Prediction Accuracy
          </p>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button 
            onClick={handleFetchFixtures}
            disabled={fetchFixtures.isPending}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-green-400 disabled:to-green-500 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2"
          >
            {fetchFixtures.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Fetching...
              </>
            ) : (
              <>
                <span>📥</span>
                Fetch New Fixtures
              </>
            )}
          </button>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2">
            <span>📊</span>
            Export Data
          </button>
        </div>

        {/* Analytics Dashboard */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-12 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
            <span>📊</span>
            Accuracy Dashboard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Accuracy Card */}
            <div className={`text-center p-6 rounded-2xl border-2 shadow-lg transition-all duration-300 hover:scale-105 ${
              accuracy >= 65 ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300' : 
              accuracy >= 50 ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300' : 
              'bg-gradient-to-br from-red-50 to-red-100 border-red-300'
            }`}>
              <div className={`text-4xl font-bold mb-2 ${
                accuracy >= 65 ? 'text-green-700' : 
                accuracy >= 50 ? 'text-yellow-700' : 'text-red-700'
              }`}>
                {accuracy}%
              </div>
              <div className="text-gray-700 font-semibold">Current Accuracy</div>
              {accuracy >= 65 && (
                <div className="text-green-600 text-sm mt-2 font-semibold">🎯 Target Achieved!</div>
              )}
            </div>
            
            {/* Progress Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 text-center p-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold text-blue-700 mb-2">
                {validatedMatches.length}/{matches?.length || 0}
              </div>
              <div className="text-gray-700 font-semibold">Validation Progress</div>
              {matches && matches.length > 0 && (
                <div className="w-full bg-blue-200 rounded-full h-3 mt-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${(validatedMatches.length / matches.length) * 100}%` }}
                  ></div>
                </div>
              )}
            </div>
            
            {/* Trend Card */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 text-center p-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold text-purple-700 mb-2">
                {validatedMatches.length > 0 ? '📈' : '--'}
              </div>
              <div className="text-gray-700 font-semibold">Recent Trend</div>
              {validatedMatches.length === 0 && (
                <div className="text-purple-600 text-sm mt-2 font-medium">Start validating matches</div>
              )}
            </div>
          </div>
        </div>

        {/* Match List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>⚽</span>
            Matches to Validate {matches && `(${matches.length})`}
          </h2>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full animate-pulse mb-4">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-600 text-lg font-medium">Loading matches...</p>
              <p className="text-gray-500 text-sm mt-2">Please wait while we fetch the latest fixtures</p>
            </div>
          ) : matches && matches.length > 0 ? (
            <div className="space-y-4">
              {matches.map((match) => (
                <div 
                  key={match.id} 
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                    match.actual_result ? 
                    (match.is_correct ? 
                      'bg-gradient-to-r from-green-50 to-green-100 border-green-300' : 
                      'bg-gradient-to-r from-red-50 to-red-100 border-red-300') : 
                    'bg-white border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-900 mb-2">
                        {match.home_team} vs {match.away_team}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-2">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">🏆 {match.league}</span>
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-medium">📅 {new Date(match.match_date).toLocaleDateString()}</span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">🎯 {match.api_prediction} ({match.api_confidence}%)</span>
                      </div>
                      {match.actual_result && (
                        <div className={`inline-flex items-center px-4 py-2 rounded-full font-semibold ${
                          match.is_correct ? 
                          'bg-green-100 text-green-800 border border-green-300' : 
                          'bg-red-100 text-red-800 border border-red-300'
                        }`}>
                          {match.is_correct ? '✅' : '❌'} Actual: {match.actual_result} • 
                          {match.is_correct ? ' Correct' : ' Incorrect'}
                        </div>
                      )}
                    </div>
                    
                    {!match.actual_result && (
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => handleLogResult(match.id, 'HOME_WIN')}
                          disabled={logResult.isPending}
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-green-300 disabled:to-green-400 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:shadow-none"
                        >
                          Home Won
                        </button>
                        <button
                          onClick={() => handleLogResult(match.id, 'DRAW')}
                          disabled={logResult.isPending}
                          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:from-yellow-300 disabled:to-yellow-400 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:shadow-none"
                        >
                          Draw
                        </button>
                        <button
                          onClick={() => handleLogResult(match.id, 'AWAY_WIN')}
                          disabled={logResult.isPending}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-blue-300 disabled:to-blue-400 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:shadow-none"
                        >
                          Away Won
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">⚽</span>
              </div>
              <p className="text-gray-600 text-lg font-medium mb-2">No matches loaded yet</p>
              <p className="text-gray-500 text-sm">
                Click "Fetch New Fixtures" to load matches from the prediction API
              </p>
            </div>
          )}
        </div>

       
      </div>
    </div>
  );
}