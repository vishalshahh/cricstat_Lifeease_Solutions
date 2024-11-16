import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create Match
  const match = await prisma.match.create({
    data: {
      totalOvers: 20,
    },
  })

  // Create Teams
  const team1 = await prisma.team.create({
    data: {
      matchId: match.id,
      runs: 100,
      wickets: 5,
      extras: {
        create: {
          wides: 2,
          noBalls: 1,
          byes: 4,
          legByes: 3,
        },
      },
    },
  })

  const team2 = await prisma.team.create({
    data: {
      matchId: match.id,
      runs: 95,
      wickets: 7,
      extras: {
        create: {
          wides: 1,
          noBalls: 0,
          byes: 2,
          legByes: 1,
        },
      },
    },
  })

  // Create Players for Team 1
  const player1 = await prisma.player.create({
    data: {
      teamId: team1.id,
      name: 'Player 1',
      runs: 40,
      ballsFaced: 30,
      ballsBowled: 0,
      runsConceded: 0,
      wicketsTaken: 0,
    },
  })

  const player2 = await prisma.player.create({
    data: {
      teamId: team1.id,
      name: 'Player 2',
      runs: 20,
      ballsFaced: 15,
      ballsBowled: 4,
      runsConceded: 20,
      wicketsTaken: 2,
    },
  })

  // Create Players for Team 2
  await prisma.player.create({
    data: {
      teamId: team2.id,
      name: 'Player 3',
      runs: 50,
      ballsFaced: 35,
      ballsBowled: 0,
      runsConceded: 0,
      wicketsTaken: 0,
    },
  })

  const player4 = await prisma.player.create({
    data: {
      teamId: team2.id,
      name: 'Player 4',
      runs: 30,
      ballsFaced: 20,
      ballsBowled: 4,
      runsConceded: 18,
      wicketsTaken: 1,
    },
  })

  // Create Cricket Events
  await prisma.cricketEvent.create({
    data: {
      matchId: match.id,
      eventType: 'Wide',
      eventTime: new Date(),
      over: 1,
      ball: 1,
      batsmanId: player1.id,
      bowlerId: player4.id,
      isWide: true,
      normalRuns: 0,
      overthrowRuns: 0,
      byeRuns: 0,
      legbyeRuns: 0,
    },
  })

  await prisma.cricketEvent.create({
    data: {
      matchId: match.id,
      eventType: 'NoBall',
      eventTime: new Date(),
      over: 2,
      ball: 3,
      batsmanId: player2.id,
      bowlerId: player4.id,
      isNoBall: true,
      normalRuns: 4,
      overthrowRuns: 1,
      byeRuns: 0,
      legbyeRuns: 0,
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
