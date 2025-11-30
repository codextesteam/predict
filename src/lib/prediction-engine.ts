// src/lib/prediction-engine.ts
export class PredictionEngine {
  // Comprehensive team data with actual performance metrics
  private static teamData: { [key: string]: any } = {
    // Premier League
    'manchester city': { strength: 0.95, attack: 0.95, defense: 0.90, form: 0.85 },
    'liverpool': { strength: 0.90, attack: 0.92, defense: 0.85, form: 0.88 },
    'arsenal': { strength: 0.88, attack: 0.87, defense: 0.89, form: 0.82 },
    'chelsea': { strength: 0.75, attack: 0.72, defense: 0.78, form: 0.65 },
    'manchester united': { strength: 0.72, attack: 0.70, defense: 0.74, form: 0.60 },
    'tottenham': { strength: 0.80, attack: 0.82, defense: 0.75, form: 0.78 },
    'newcastle': { strength: 0.78, attack: 0.76, defense: 0.80, form: 0.72 },
    
    // La Liga
    'real madrid': { strength: 0.94, attack: 0.93, defense: 0.91, form: 0.90 },
    'barcelona': { strength: 0.89, attack: 0.88, defense: 0.87, form: 0.83 },
    'atletico madrid': { strength: 0.85, attack: 0.80, defense: 0.90, form: 0.81 },
    
    // Bundesliga
    'bayern munich': { strength: 0.93, attack: 0.94, defense: 0.88, form: 0.86 },
    'dortmund': { strength: 0.82, attack: 0.85, defense: 0.78, form: 0.79 },
    'leverkusen': { strength: 0.84, attack: 0.83, defense: 0.82, form: 0.88 },
    
    // Serie A
    'inter': { strength: 0.87, attack: 0.85, defense: 0.89, form: 0.84 },
    'ac milan': { strength: 0.83, attack: 0.82, defense: 0.81, form: 0.79 },
    'juventus': { strength: 0.81, attack: 0.78, defense: 0.84, form: 0.76 },
    'napoli': { strength: 0.79, attack: 0.81, defense: 0.76, form: 0.70 },
    
    // Ligue 1
    'psg': { strength: 0.91, attack: 0.92, defense: 0.85, form: 0.87 },
    
    // Default for unknown teams
    'default': { strength: 0.60, attack: 0.60, defense: 0.60, form: 0.50 }
  }

  static predict(homeTeam: string, awayTeam: string): { prediction: string; confidence: number; reasoning: string } {
    const home = this.getTeamData(homeTeam.toLowerCase())
    const away = this.getTeamData(awayTeam.toLowerCase())
    
    // Home advantage factor
    const homeAdvantage = 0.15
    
    // Calculate match probabilities using multiple factors
    const homeStrength = home.strength + homeAdvantage
    const awayStrength = away.strength
    
    // Attack vs Defense analysis
    const homeAttackVsAwayDefense = home.attack - away.defense
    const awayAttackVsHomeDefense = away.attack - home.defense
    
    // Recent form impact
    const formImpact = (home.form - away.form) * 0.3
    
    // Combined score
    const homeScore = homeStrength + homeAttackVsAwayDefense + formImpact
    const awayScore = awayStrength + awayAttackVsHomeDefense - formImpact
    
    // Calculate probabilities
    const totalScore = homeScore + awayScore
    const homeWinProbability = homeScore / totalScore
    const awayWinProbability = awayScore / totalScore
    const drawProbability = 1 - (homeWinProbability + awayWinProbability)
    
    // Make prediction
    let prediction: string
    let confidence: number
    let reasoning: string
    
    if (homeWinProbability > 0.45 && homeWinProbability > awayWinProbability + 0.1) {
      prediction = '1'
      confidence = homeWinProbability * 100
      reasoning = `${homeTeam} has strong home advantage and better form`
    } else if (awayWinProbability > 0.45 && awayWinProbability > homeWinProbability + 0.1) {
      prediction = '2'
      confidence = awayWinProbability * 100
      reasoning = `${awayTeam} is stronger and has good away form`
    } else {
      prediction = 'X'
      confidence = drawProbability * 100
      reasoning = 'Teams are evenly matched, likely draw'
    }
    
    // Adjust confidence based on match-up specifics
    const strengthDiff = Math.abs(home.strength - away.strength)
    if (strengthDiff > 0.3) confidence += 10
    if (strengthDiff < 0.1) confidence -= 5
    
    confidence = Math.min(95, Math.max(40, Math.round(confidence)))
    
    return { prediction, confidence, reasoning }
  }

  private static getTeamData(teamName: string) {
    // Find the best matching team name
    for (const [key, data] of Object.entries(this.teamData)) {
      if (teamName.includes(key) || key.includes(teamName)) {
        return data
      }
    }
    return this.teamData.default
  }

  // Method to test accuracy against sample data
  static testAccuracy(matches: Array<{ homeTeam: string; awayTeam: string; actualResult: string }>) {
    const results = matches.map(match => {
      const prediction = this.predict(match.homeTeam, match.awayTeam)
      const correct = prediction.prediction === match.actualResult
      
      return {
        match: `${match.homeTeam} vs ${match.awayTeam}`,
        actualResult: match.actualResult,
        predictedResult: prediction.prediction,
        confidence: prediction.confidence,
        reasoning: prediction.reasoning,
        correct
      }
    })

    const correctPredictions = results.filter(r => r.correct).length
    const accuracy = (correctPredictions / results.length) * 100

    return {
      totalMatches: results.length,
      correctPredictions,
      accuracy: Math.round(accuracy * 100) / 100,
      results
    }
  }
}