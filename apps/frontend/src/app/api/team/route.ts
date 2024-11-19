import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Team } from '@/schemas/Team.schema'

export async function POST(request: Request) {
  try {
    await connectDB()
    const { matchId } = await request.json()
    const team = new Team({ matchId })
    await team.save()
    return NextResponse.json(team)
  } catch (error) {
    console.error('Error creating team:', error)
    return NextResponse.json(
      { error: 'Failed to create team' },
      { status: 500 },
    )
  }
}

export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const teamId = searchParams.get('teamId')

    if (!teamId) {
      return NextResponse.json(
        { error: 'Team ID is required' },
        { status: 400 },
      )
    }

    const team = await Team.findById(teamId)
    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 })
    }

    return NextResponse.json(team)
  } catch (error) {
    console.error('Error fetching team:', error)
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const teamId = searchParams.get('teamId')
    const updateData = await request.json()

    if (!teamId) {
      return NextResponse.json(
        { error: 'Team ID is required' },
        { status: 400 },
      )
    }

    const team = await Team.findByIdAndUpdate(teamId, updateData, { new: true })
    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 })
    }

    return NextResponse.json(team)
  } catch (error) {
    console.error('Error updating team:', error)
    return NextResponse.json(
      { error: 'Failed to update team' },
      { status: 500 },
    )
  }
}
