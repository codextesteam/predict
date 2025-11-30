// src/app/api/matches/[id]/route.ts
import { NextRequest } from 'next/server'
import { footballApi } from '@/lib/api-client'
import { ApiResponse } from '@/lib/utils'

interface Context {
  params: { id: string }
}

export async function GET(request: NextRequest, context: Context) {
  try {
    const matchId = context.params.id
    const matchDetails = await footballApi.getMatchDetails(matchId)

    return Response.json(ApiResponse.success(
      matchDetails,
      'Match details fetched successfully'
    ))
  } catch (error) {
    console.error('Match details error:', error)
    return Response.json(ApiResponse.error('Failed to fetch match details'), { status: 500 })
  }
}