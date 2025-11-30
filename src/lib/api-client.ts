import axios from 'axios'

const FOOTBALL_API_KEY = "fa884ba0984cc6d29d0988658f94720f"
const FOOTBALL_API_BASE_URL = "https://v3.football.api-sports.io"

// Set to true to use mock data instead of making real API calls
const USE_MOCK_DATA = false;

const apiClient = axios.create({
  baseURL: FOOTBALL_API_BASE_URL,
  headers: {
    'x-rapidapi-key': FOOTBALL_API_KEY,
    'x-rapidapi-host': 'v3.football.api-sports.io'
  },
  timeout: 10000
})

type ApiMatch = {
  fixture: {
    id: number;
    date: string;
    status: { short: string };
    venue?: { name?: string };
    referee?: string;
  };
  teams: {
    home: { name: string };
    away: { name: string };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  league: {
    name: string;
    id: number;
    country: string;
  };
};

// Example mock data for matches
const mockMatches = [
  {
    id: "1",
    homeTeam: "Manchester United",
    awayTeam: "Chelsea",
    date: "2024-10-13T15:00:00Z",
    status: "NS",
    score: null,
    league: "Premier League",
    leagueId: 39,
    country: "England"
  },
  {
    id: "2",
    homeTeam: "Arsenal",
    awayTeam: "Liverpool",
    date: "2024-10-13T17:30:00Z",
    status: "NS",
    score: null,
    league: "Premier League",
    leagueId: 39,
    country: "England"
  }
];

export class FootballApiClient {
  async getMatches(leagueId?: number, date?: string) {
    try {
      console.log(`🔍 API Call: league=${leagueId}, date=${date}, key=${FOOTBALL_API_KEY.substring(0, 10)}...`)
      
      const response = await apiClient.get('/fixtures', {
        params: {
          league: leagueId || 39,
          season: 2024,
          date: date || '2024-10-13' // Use a specific date that has matches
        }
      })

      console.log(`✅ API Response:`, response.data)
      
      if (!response.data.response) {
        console.log('❌ No response data')
        return []
      }

      return response.data.response.map((match: ApiMatch) => ({
        id: match.fixture.id.toString(),
        homeTeam: match.teams.home.name,
        awayTeam: match.teams.away.name,
        date: match.fixture.date,
        status: match.fixture.status.short,
        score: match.goals.home !== null ? `${match.goals.home}-${match.goals.away}` : null,
        league: match.league.name,
        leagueId: match.league.id,
        country: match.league.country
      }))
      
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('❌ Football API error:', error.response?.data || error.message)
      } else if (error instanceof Error) {
        console.error('❌ Football API error:', error.message)
      } else {
        console.error('❌ Football API error:', error)
      }
      return []
    }
  }

  async getMatchDetails(matchId: string) {
    if (USE_MOCK_DATA || !FOOTBALL_API_KEY || FOOTBALL_API_KEY === 'fa884ba0984cc6d29d0988658f94720f') {
      await new Promise(resolve => setTimeout(resolve, 300))
      const match = mockMatches.find(m => m.id === matchId) || mockMatches[0]
      return {
        ...match,
        venue: 'Old Trafford',
        referee: 'Michael Oliver'
      }
    }

    try {
      const response = await apiClient.get('/fixtures', {
        params: { id: matchId }
      })

      const matchData = response.data.response[0]
      return {
        id: matchData.fixture.id.toString(),
        homeTeam: matchData.teams.home.name,
        awayTeam: matchData.teams.away.name,
        date: matchData.fixture.date,
        status: matchData.fixture.status.short,
        score: matchData.goals.home !== null ? `${matchData.goals.home}-${matchData.goals.away}` : null,
        league: matchData.league.name,
        venue: matchData.fixture.venue?.name,
        referee: matchData.fixture.referee
      }
    } catch (error) {
      console.error('Football API error:', error)
      const match = mockMatches.find(m => m.id === matchId) || mockMatches[0]
      return { ...match, venue: 'Unknown', referee: 'Unknown' }
    }
  }

  async getMatchStatistics(matchId: string) {
    if (USE_MOCK_DATA || !FOOTBALL_API_KEY || FOOTBALL_API_KEY === 'fa884ba0984cc6d29d0988658f94720f') {
      await new Promise(resolve => setTimeout(resolve, 300))
      return {
        possession: { home: 48, away: 52 },
        totalShots: { home: 14, away: 12 },
        shotsOnTarget: { home: 5, away: 4 }
      }
    }

  try {
    // Use matchId to fetch statistics for the specific match
    const response = await apiClient.get('/fixtures/statistics', {
      params: {
        fixture: matchId
      }
    })
    return response.data.response
  } catch (error) {
    console.error('Football API error:', error)
    return {
      possession: { home: 48, away: 52 },
      totalShots: { home: 14, away: 12 },
      shotsOnTarget: { home: 5, away: 4 }
    }
  }
}
}

export const footballApi = new FootballApiClient()