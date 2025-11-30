// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create test user
  const passwordHash = await bcrypt.hash('password123', 12)
  
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      passwordHash,
      name: 'Test User',
      subscriptionStatus: 'ACTIVE'
    }
  })

  // Create sample matches
  const matches = [
    {
      id: '1',
      homeTeam: 'Manchester United',
      awayTeam: 'Liverpool',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: 'NS',
      league: 'Premier League',
      leagueId: 39,
      country: 'England'
    },
    {
      id: '2',
      homeTeam: 'Barcelona',
      awayTeam: 'Real Madrid',
      date: new Date(Date.now() + 48 * 60 * 60 * 1000),
      status: 'NS',
      league: 'La Liga',
      leagueId: 140,
      country: 'Spain'
    },
    {
      id: '3',
      homeTeam: 'Bayern Munich',
      awayTeam: 'Borussia Dortmund',
      date: new Date(Date.now() + 72 * 60 * 60 * 1000),
      status: 'NS',
      league: 'Bundesliga',
      leagueId: 78,
      country: 'Germany'
    }
  ]

  for (const matchData of matches) {
    await prisma.match.upsert({
      where: { id: matchData.id },
      update: {},
      create: matchData
    })
  }

  // Create sample prediction
  await prisma.prediction.upsert({
    where: { id: '1' },
    update: {},
    create: {
      userId: user.id,
      matchId: '1',
      predictionType: '1X2',
      predictionData: { prediction: '1', odds: 2.5 },
      confidenceScore: 0.75
    }
  })

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })