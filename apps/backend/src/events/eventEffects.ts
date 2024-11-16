import { prisma } from '../prisma/prismaClient'
import { EventType } from './eventTypes'

// Function to handle Wide Event
export async function handleWideEvent(cricketEventId: string) {
  const cricketEvent = await prisma.cricketEvent.update({
    where: { id: cricketEventId },
    data: {
      normalRuns: 0,
      isWide: true,
      match: {
        update: {
          teamStats: {
            updateMany: {
              where: { id: { not: '' } },
              data: {
                runs: { increment: 1 },
              },
            },
          },
        },
      },
      bowler: {
        update: {
          runsConceded: { increment: 1 },
        },
      },
    },
    include: {
      match: {
        include: {
          teamStats: {
            include: {
              extras: true,
            },
          },
        },
      },
      bowler: true,
    },
  })

  // Update extras separately
  await prisma.extras.updateMany({
    where: {
      teamId: { in: cricketEvent.match.teamStats.map((team) => team.id) },
    },
    data: {
      wides: { increment: 1 },
    },
  })

  return cricketEvent
}

// Function to handle NoBall + Bye Event
export async function handleNoBallByeEvent(
  cricketEventId: string,
  byeRuns: number,
) {
  const cricketEvent = await prisma.cricketEvent.update({
    where: { id: cricketEventId },
    data: {
      normalRuns: 0,
      isNoBall: true,
      isBye: true,
      match: {
        update: {
          teamStats: {
            updateMany: {
              where: { id: { not: '' } },
              data: {
                runs: { increment: byeRuns },
              },
            },
          },
        },
      },
      bowler: {
        update: {
          runsConceded: { increment: 1 },
        },
      },
      batsman: {
        update: {
          ballsFaced: { increment: 1 },
        },
      },
    },
    include: {
      match: {
        include: {
          teamStats: {
            include: {
              extras: true,
            },
          },
        },
      },
      bowler: true,
      batsman: true,
    },
  })

  // Update extras separately
  await prisma.extras.updateMany({
    where: {
      teamId: { in: cricketEvent.match.teamStats.map((team) => team.id) },
    },
    data: {
      noBalls: { increment: 1 },
      byes: { increment: byeRuns - 1 },
    },
  })

  return cricketEvent
}

// Function to handle NoBall + Runs Event
export async function handleNoBallRunsEvent(
  cricketEventId: string,
  runs: number,
) {
  const cricketEvent = await prisma.cricketEvent.update({
    where: { id: cricketEventId },
    data: {
      normalRuns: runs - 1,
      isNoBall: true,
      match: {
        update: {
          teamStats: {
            updateMany: {
              where: { id: { not: '' } },
              data: {
                runs: { increment: runs },
              },
            },
          },
        },
      },
      batsman: {
        update: {
          runs: { increment: runs - 1 },
          ballsFaced: { increment: 1 },
        },
      },
      bowler: {
        update: {
          runsConceded: { increment: runs },
        },
      },
    },
    include: {
      match: {
        include: {
          teamStats: {
            include: {
              extras: true,
            },
          },
        },
      },
      batsman: true,
      bowler: true,
    },
  })

  // Update extras separately
  await prisma.extras.updateMany({
    where: {
      teamId: { in: cricketEvent.match.teamStats.map((team) => team.id) },
    },
    data: {
      noBalls: { increment: 1 },
    },
  })

  return cricketEvent
}

// Function to handle NoBall + LegBye Event
export async function handleNoBallLegByeEvent(
  cricketEventId: string,
  legByeRuns: number,
) {
  const cricketEvent = await prisma.cricketEvent.update({
    where: { id: cricketEventId },
    data: {
      normalRuns: 0,
      isNoBall: true,
      isLegBye: true,
      match: {
        update: {
          teamStats: {
            updateMany: {
              where: { id: { not: '' } },
              data: {
                runs: { increment: legByeRuns },
              },
            },
          },
        },
      },
      bowler: {
        update: {
          runsConceded: { increment: 1 },
        },
      },
      batsman: {
        update: {
          ballsFaced: { increment: 1 },
        },
      },
    },
    include: {
      match: {
        include: {
          teamStats: {
            include: {
              extras: true,
            },
          },
        },
      },
      bowler: true,
      batsman: true,
    },
  })

  // Update extras separately
  await prisma.extras.updateMany({
    where: {
      teamId: { in: cricketEvent.match.teamStats.map((team) => team.id) },
    },
    data: {
      noBalls: { increment: 1 },
      legByes: { increment: legByeRuns - 1 },
    },
  })

  return cricketEvent
}

// Function to handle LegBye/Bye + Overthrow Event
export async function handleByeLegByeOverthrowEvent(
  cricketEventId: string,
  runs: number,
  type: EventType,
) {
  const cricketEvent = await prisma.cricketEvent.update({
    where: { id: cricketEventId },
    data: {
      normalRuns: runs,
      isBye: type === EventType.BYE,
      isLegBye: type === EventType.LEGBYE,
      match: {
        update: {
          teamStats: {
            updateMany: {
              where: { id: { not: '' } },
              data: {
                runs: { increment: runs },
              },
            },
          },
        },
      },
    },
    include: {
      match: {
        include: {
          teamStats: {
            include: {
              extras: true,
            },
          },
        },
      },
    },
  })

  // Update extras separately
  await prisma.extras.updateMany({
    where: {
      teamId: { in: cricketEvent.match.teamStats.map((team) => team.id) },
    },
    data: {
      byes: type === EventType.BYE ? { increment: runs } : undefined,
      legByes: type === EventType.LEGBYE ? { increment: runs } : undefined,
    },
  })

  return cricketEvent
}

// Function to handle Runs + Overthrow Event
export async function handleRunsOverthrowEvent(
  cricketEventId: string,
  runs: number,
) {
  const cricketEvent = await prisma.cricketEvent.update({
    where: { id: cricketEventId },
    data: {
      normalRuns: runs,
      match: {
        update: {
          teamStats: {
            updateMany: {
              where: { id: { not: '' } },
              data: {
                runs: { increment: runs },
              },
            },
          },
        },
      },
      batsman: {
        update: {
          runs: { increment: runs },
        },
      },
    },
    include: {
      match: {
        include: {
          teamStats: true,
        },
      },
      batsman: true,
    },
  })

  return cricketEvent
}
