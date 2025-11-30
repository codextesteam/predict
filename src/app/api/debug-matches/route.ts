// src/app/api/debug-matches/route.ts
import { NextRequest } from 'next/server'
import { footballApi } from '@/lib/api-client'
import { ApiResponse } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const leagueId = searchParams.get('leagueId') || '39'
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0]
    
    console.log(`Debug: Fetching matches for league ${leagueId} on ${date}`)
    
    const matches = await footballApi.getMatches(parseInt(leagueId), date)
    
    const analysis = {
      totalMatches: matches.length,
      dateQueried: date,
      leagueId: leagueId,
      matchesByStatus: {
        finished: matches.filter(m => ['FT', 'PEN', 'AET'].includes(m.status)),
        live: matches.filter(m => m.status === 'LIVE'),
        upcoming: matches.filter(m => m.status === 'NS'),
        other: matches.filter(m => !['FT', 'PEN', 'AET', 'LIVE', 'NS'].includes(m.status))
      },
      sampleMatches: matches.slice(0, 5).map(m => ({
        id: m.id,
        homeTeam: m.homeTeam,
        awayTeam: m.awayTeam,
        status: m.status,
        score: m.score,
        date: m.date
      }))
    }
    
    return Response.json(ApiResponse.success(analysis, 'Match debug information'))
    
  } catch (error) {
    console.error('Debug matches error:', error)
    return Response.json(ApiResponse.error('Debug failed: ' + error.message), { status: 500 })
  }
}