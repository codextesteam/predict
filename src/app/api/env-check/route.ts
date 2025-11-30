import { NextRequest } from 'next/server'
import { ApiResponse } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const envCheck = {
    footballApiKey: {
      exists: !!process.env.FOOTBALL_API_KEY,
      value: process.env.FOOTBALL_API_KEY ? 
        `${process.env.FOOTBALL_API_KEY.substring(0, 10)}...` : 
        'Not found',
      length: process.env.FOOTBALL_API_KEY?.length
    },
    footballApiBaseUrl: process.env.FOOTBALL_API_BASE_URL,
    useMockData: process.env.USE_MOCK_DATA,
    databaseUrl: process.env.DATABASE_URL ? 'Exists' : 'Not found',
    nextAuthSecret: process.env.NEXTAUTH_SECRET ? 'Exists' : 'Not found'
  }

  return Response.json(ApiResponse.success(envCheck, 'Environment check'))
}