import { footballApi } from './api-client'

export interface AccuracyTestResult {
  totalMatches: number
  correctPredictions: number
  accuracy: number
  matches: Array<{
    matchId: string
    homeTeam: string
    awayTeam: string
    actualResult: string
    predictedResult: string
    correct: boolean
    confidence?: number
  }>
}

export class AccuracyTester {
  // Improved prediction algorithm
  static async predictMatch(homeTeam: string, awayTeam: string, matchId: string) {
    try {
      // Get detailed match data
      const matchDetails = await footballApi.getMatchDetails(matchId)
      
      let homeAdvantage = 0.15 // Home teams typically have advantage
      let homeScore = 0.5 + homeAdvantage // Start with neutral + home advantage
      let awayScore = 0.5
      
      // Factor 1: Recent form (simplified - use team names as proxy)
      const homeForm = this.getTeamFormFactor(homeTeam)
      const awayForm = this.getTeamFormFactor(awayTeam)
      homeScore += homeForm * 0.2
      awayScore += awayForm * 0.2
      
      // Factor 2: Head-to-head (simplified)
      const h2h = this.getHeadToHeadFactor(homeTeam, awayTeam)
      homeScore += h2h.home * 0.15
      awayScore += h2h.away * 0.15
      
      // Factor 3: League position (simplified - using team reputation)
      const homeReputation = this.getTeamReputation(homeTeam)
      const awayReputation = this.getTeamReputation(awayTeam)
      homeScore += homeReputation * 0.1
      awayScore += awayReputation * 0.1
      
      // Make prediction with confidence
      const diff = homeScore - awayScore
      
      if (diff > 0.3) return { prediction: '1', confidence: Math.min(0.85, 0.5 + diff) }
      if (diff < -0.3) return { prediction: '2', confidence: Math.min(0.85, 0.5 - diff) }
      if (Math.abs(diff) < 0.15) return { prediction: 'X', confidence: 0.6 }
      
      return { 
        prediction: diff > 0 ? '1' : '2', 
        confidence: 0.5 + Math.abs(diff) 
      }
      
    } catch (error) {
      // Fallback prediction
      return { prediction: '1', confidence: 0.5 }
    }
  }

  // Simplified team form based on team name (replace with real data)
  static getTeamFormFactor(teamName: string): number {
    const strongTeams = ['manchester city', 'liverpool', 'arsenal', 'real madrid', 'barcelona', 'bayern']
    const weakTeams = ['sheffield', 'burnley', 'luton', 'mainz', 'almeria']
    
    const lowerName = teamName.toLowerCase()
    
    if (strongTeams.some(team => lowerName.includes(team))) return 0.3
    if (weakTeams.some(team => lowerName.includes(team))) return -0.3
    return 0
  }

  // Simplified head-to-head (replace with real historical data)
  static getHeadToHeadFactor(homeTeam: string, awayTeam: string) {
    // This is a simplified version - in reality, you'd query historical matches
    const classicRivalries = [
      { teams: ['manchester united', 'liverpool'], homeAdvantage: 0.1 },
      { teams: ['barcelona', 'real madrid'], homeAdvantage: 0.15 },
      { teams: ['arsenal', 'tottenham'], homeAdvantage: 0.1 }
    ]
    
    for (const rivalry of classicRivalries) {
      if (rivalry.teams.includes(homeTeam.toLowerCase()) && rivalry.teams.includes(awayTeam.toLowerCase())) {
        return { home: rivalry.homeAdvantage, away: -rivalry.homeAdvantage }
      }
    }
    
    return { home: 0.05, away: -0.05 } // Default slight home advantage
  }

  // Simplified team reputation
  static getTeamReputation(teamName: string): number {
    const eliteTeams = ['manchester city', 'real madrid', 'bayern', 'barcelona', 'psg']
    const goodTeams = ['arsenal', 'liverpool', 'dortmund', 'atletico', 'napoli']
    
    const lowerName = teamName.toLowerCase()
    
    if (eliteTeams.some(team => lowerName.includes(team))) return 0.3
    if (goodTeams.some(team => lowerName.includes(team))) return 0.15
    return 0
  }

  static async testAccuracy(daysBack: number = 7): Promise<AccuracyTestResult> {
    const results: AccuracyTestResult = {
      totalMatches: 0,
      correctPredictions: 0,
      accuracy: 0,
      matches: []
    }

    try {
      // Get recent completed matches
      const testDate = new Date()
      testDate.setDate(testDate.getDate() - daysBack)
      
      const dateString = testDate.toISOString().split('T')[0]
      const matches = await footballApi.getMatches(39, dateString) // Premier League

      // Filter only completed matches with scores
      const completedMatches = matches.filter(match => 
        match.status === 'FT' && match.score && match.score.includes('-')
      )

      results.totalMatches = completedMatches.length

      for (const match of completedMatches) {
        // Get actual result from score
        const [homeGoals, awayGoals] = match.score!.split('-').map(Number)
        let actualResult: string
        
        if (homeGoals > awayGoals) actualResult = '1'
        else if (awayGoals > homeGoals) actualResult = '2'
        else actualResult = 'X'

        // Make prediction
        const prediction = await this.predictMatch(match.homeTeam, match.awayTeam, match.id)
        const correct = prediction.prediction === actualResult
        
        if (correct) results.correctPredictions++

        results.matches.push({
          matchId: match.id,
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam,
          actualResult,
          predictedResult: prediction.prediction,
          correct,
          confidence: prediction.confidence
        })
      }

      results.accuracy = results.totalMatches > 0 
        ? (results.correctPredictions / results.totalMatches) * 100 
        : 0

      return results

    } catch (error) {
      console.error('Accuracy test error:', error)
      throw new Error('Failed to test accuracy')
    }
  }
}