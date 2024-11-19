import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Match } from '@/schemas/Match.schema'

export async function POST(request: Request) {
  try {
    await connectDB()
    const { totalOvers } = await request.json()
    const match = new Match({ totalOvers })
    await match.save()
    return NextResponse.json(match)
  } catch (error) {
    console.error('Error creating match:', error)
    return NextResponse.json(
      { error: 'Failed to create match' },
      { status: 500 },
    )
  }
}

export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const matchId = searchParams.get('matchId')

    if (!matchId) {
      return NextResponse.json(
        { error: 'Match ID is required' },
        { status: 400 },
      )
    }

    const match = await Match.findById(matchId)
    if (!match) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 })
    }

    return NextResponse.json(match)
  } catch (error) {
    console.error('Error fetching match:', error)
    return NextResponse.json(
      { error: 'Failed to fetch match' },
      { status: 500 },
    )
  }
}
