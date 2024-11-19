import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Player } from '@/schemas/Player.schema'

export async function POST(request: Request) {
  try {
    await connectDB()
    const playerData = await request.json()
    const player = new Player(playerData)
    await player.save()
    return NextResponse.json(player)
  } catch (error) {
    console.error('Error creating player:', error)
    return NextResponse.json(
      { error: 'Failed to create player' },
      { status: 500 },
    )
  }
}

export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const playerId = searchParams.get('playerId')

    if (!playerId) {
      return NextResponse.json(
        { error: 'Player ID is required' },
        { status: 400 },
      )
    }

    const player = await Player.findById(playerId)
    if (!player) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 })
    }

    return NextResponse.json(player)
  } catch (error) {
    console.error('Error fetching player:', error)
    return NextResponse.json(
      { error: 'Failed to fetch player' },
      { status: 500 },
    )
  }
}

export async function PATCH(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const playerId = searchParams.get('playerId')
    const updateData = await request.json()

    if (!playerId) {
      return NextResponse.json(
        { error: 'Player ID is required' },
        { status: 400 },
      )
    }

    const player = await Player.findByIdAndUpdate(playerId, updateData, {
      new: true,
    })
    if (!player) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 })
    }

    return NextResponse.json(player)
  } catch (error) {
    console.error('Error updating player:', error)
    return NextResponse.json(
      { error: 'Failed to update player' },
      { status: 500 },
    )
  }
}
