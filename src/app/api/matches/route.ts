// src/app/api/matches/route.ts
import { NextRequest } from 'next/server'
import { ApiResponse } from '@/lib/utils'

// Mock data for testing
const mockMatches = [
  {
    id: '1',
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    status: 'NS',
    score: null,
    league: 'Premier League',
    leagueId: 39,
    country: 'England'
  },
  {
    id: '2', 
    homeTeam: 'Barcelona',
    awayTeam: 'Real Madrid',
    date: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    status: 'NS',
    score: null,
    league: 'La Liga',
    leagueId: 140,
    country: 'Spain'
  }
]

export async function GET(request: NextRequest) {
  try {
    // Simple test response
    return Response.json({
      success: true,
      data: mockMatches,
      message: 'Matches fetched successfully'
    })
  } catch (error) {
    console.error('Matches fetch error:', error)
    return Response.json({
      success: false,
      data: null,
      message: 'Failed to fetch matches'
    }, { status: 500 })
  }
}