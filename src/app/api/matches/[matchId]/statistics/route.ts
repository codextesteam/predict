// src/app/api/matches/[matchId]/statistics/route.ts
import { NextRequest } from 'next/server'
import { footballApi } from '@/lib/api-client'
import { ApiResponse } from '@/lib/utils'

interface Context {
  params: { matchId: string }
}

export async function GET(request: NextRequest, context: Context) {
  try {
    const matchId = context.params.matchId
    const statistics = await footballApi.getMatchStatistics(matchId)

    return Response.json(ApiResponse.success(statistics, 'Statistics fetched successfully'))
  } catch (error) {
    console.error('Statistics fetch error:', error)
    return Response.json(ApiResponse.error('Failed to fetch statistics'), { status: 500 })
  }
}