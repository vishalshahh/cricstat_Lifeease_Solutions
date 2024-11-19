import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { CricketEvent } from '@/schemas/CricketEvent.schema'
import { Match } from '@/schemas/Match.schema'
import { Team } from '@/schemas/Team.schema'
import { Player } from '@/schemas/Player.schema'
import { Extras } from '@/schemas/Extras.schema'
import { processCricketEvent } from './src/events/cricketEventHandler'

export async function POST(request: Request) {
  try {
    await connectDB()
    const data = await request.json()

    const models = {
      CricketEvent,
      Match,
      Team,
      Player,
      Extras,
    }

    const result = await processCricketEvent(data, models)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error processing cricket event:', error)
    return NextResponse.json(
      { error: 'Failed to process cricket event' },
      { status: 500 },
    )
  }
}

export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const matchId = searchParams.get('matchId')

    const events = await CricketEvent.find({ matchId })
      .populate('match')
      .populate('bowler')
      .populate('batsman')
      .sort({ eventTime: 1 })

    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching cricket events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cricket events' },
      { status: 500 },
    )
  }
}
