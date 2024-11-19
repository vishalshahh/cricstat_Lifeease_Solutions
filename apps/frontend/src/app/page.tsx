'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ChevronDown,
  ChevronUp,
  BirdIcon as Cricket,
  Shield,
  User,
  Activity,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import BallLog from '@/components/CommentaryLog/BallLog'

// Types
type CommentaryEvent = {
  ball: number
  outcome: string
  batsmanId?: string
  bowlerId?: string
}

// Player & Team Types
type Player = {
  id: string
  name: string
}

type Team = {
  id: string
  name: string
  runs: number
  wickets: number
  overs: number
  balls: number
  extras: {
    wides: number
    noBalls: number
    byes: number
    legByes: number
  }
}

// Components
const PlayerSelector: React.FC<{
  label: string
  players: Player[]
  selectedPlayer: Player | null
  onSelect: (player: Player) => void
}> = ({ label, players, selectedPlayer, onSelect }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium">{label}</label>
    <select
      className="w-full p-2 border rounded-md bg-background"
      value={selectedPlayer?.id || ''}
      onChange={(e) => {
        const player = players.find((p) => p.id === e.target.value)
        if (player) onSelect(player)
      }}
    >
      <option value="">Select {label}</option>
      {players.map((player) => (
        <option key={player.id} value={player.id}>
          {player.name}
        </option>
      ))}
    </select>
  </div>
)

const TeamScorecard: React.FC<{
  runs: number
  wickets: number
  overs: number
  balls: number
  extras: Team['extras']
}> = ({ runs, wickets, overs, balls, extras }) => (
  <div className="space-y-4">
    <div className="text-4xl font-bold text-center">
      {runs}/{wickets}
    </div>
    <div className="text-lg text-center">
      Overs: {overs}.{balls}
    </div>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>Wides: {extras.wides}</div>
      <div>No Balls: {extras.noBalls}</div>
      <div>Byes: {extras.byes}</div>
      <div>Leg Byes: {extras.legByes}</div>
    </div>
  </div>
)

// Default players
const DEFAULT_PLAYERS: Player[] = [
  { id: '1', name: 'Sachin' },
  { id: '2', name: 'Dravid' },
  { id: '3', name: 'Ganguly' },
  { id: '4', name: 'Dhoni' },
  { id: '5', name: 'Kohli' },
  { id: '6', name: 'Rohit' },
]

// Main Component
const Page: React.FC = () => {
  const { toast } = useToast()

  const [team, setTeam] = useState<Team>({
    id: 'default-team',
    name: 'Team A',
    runs: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
    extras: { wides: 0, noBalls: 0, byes: 0, legByes: 0 },
  })
  const [players] = useState<Player[]>(DEFAULT_PLAYERS)
  const [selectedPlayers, setSelectedPlayers] = useState<{
    striker: Player | null
    nonStriker: Player | null
    bowler: Player | null
  }>({
    striker: null,
    nonStriker: null,
    bowler: null,
  })
  const [commentary, setCommentary] = useState<CommentaryEvent[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState({
    scoring: true,
    teamScore: true,
    batsmen: true,
  })

  const handleEvent = (event: string) => {
    if (!selectedPlayers.striker || !selectedPlayers.bowler) {
      toast({
        title: 'Selection Required',
        description: 'Please select striker and bowler before scoring',
        variant: 'destructive',
      })
      return
    }

    setTeam((prev) => {
      const updatedTeam = { ...prev }
      const isNumeric = !isNaN(Number(event))

      if (isNumeric) {
        updatedTeam.runs += Number(event)
        updatedTeam.balls += 1
        if (updatedTeam.balls === 6) {
          updatedTeam.balls = 0
          updatedTeam.overs += 1
        }
      } else if (event === 'Wide') {
        updatedTeam.runs += 1
        updatedTeam.extras.wides += 1
      } else if (event === 'No Ball') {
        updatedTeam.runs += 1
        updatedTeam.extras.noBalls += 1
      } else if (event === 'Bye') {
        updatedTeam.extras.byes += 1
      } else if (event === 'Leg Bye') {
        updatedTeam.extras.legByes += 1
      } else if (event === 'Wicket') {
        updatedTeam.wickets += 1
        updatedTeam.balls += 1
        if (updatedTeam.balls === 6) {
          updatedTeam.balls = 0
          updatedTeam.overs += 1
        }
      }

      return updatedTeam
    })

    setCommentary((prev) => [
      ...prev,
      {
        ball: prev.length + 1,
        outcome: event,
        batsmanId: selectedPlayers.striker.id,
        bowlerId: selectedPlayers.bowler.id,
      },
    ])
  }

  const toggleSection = (section: keyof typeof mobileMenuOpen) => {
    setMobileMenuOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Cricket className="h-8 w-8 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
            Cricket Scoring Panel
          </h1>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="p-6">
              <div
                className="flex justify-between items-center mb-6 cursor-pointer"
                onClick={() => toggleSection('scoring')}
              >
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Player Selection
                </h3>
                {mobileMenuOpen.scoring ? <ChevronUp /> : <ChevronDown />}
              </div>
              {mobileMenuOpen.scoring && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <PlayerSelector
                    label="Striker"
                    players={players}
                    selectedPlayer={selectedPlayers.striker}
                    onSelect={(player) =>
                      setSelectedPlayers((prev) => ({
                        ...prev,
                        striker: player,
                      }))
                    }
                  />
                  <PlayerSelector
                    label="Non-Striker"
                    players={players}
                    selectedPlayer={selectedPlayers.nonStriker}
                    onSelect={(player) =>
                      setSelectedPlayers((prev) => ({
                        ...prev,
                        nonStriker: player,
                      }))
                    }
                  />
                  <PlayerSelector
                    label="Bowler"
                    players={players}
                    selectedPlayer={selectedPlayers.bowler}
                    onSelect={(player) =>
                      setSelectedPlayers((prev) => ({
                        ...prev,
                        bowler: player,
                      }))
                    }
                  />
                </div>
              )}
            </Card>
            <Card className="p-6">
              <div
                className="flex justify-between items-center mb-6 cursor-pointer"
                onClick={() => toggleSection('teamScore')}
              >
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Scoring Controls
                </h3>
                {mobileMenuOpen.teamScore ? <ChevronUp /> : <ChevronDown />}
              </div>
              {mobileMenuOpen.teamScore && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {[0, 1, 2, 3, 4, 6].map((run) => (
                      <Button
                        key={run}
                        onClick={() => handleEvent(run.toString())}
                      >
                        {run === 0 ? 'Dot Ball' : run}
                      </Button>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      'Wide',
                      'No Ball',
                      'Bye',
                      'Leg Bye',
                      'Wicket',
                      'New Ball',
                    ].map((event) => (
                      <Button
                        key={event}
                        onClick={() => handleEvent(event)}
                        className={
                          event === 'Wicket' ? 'bg-red-500 text-white' : ''
                        }
                      >
                        {event}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="p-6">
              <div
                className="flex justify-between items-center mb-6 cursor-pointer"
                onClick={() => toggleSection('batsmen')}
              >
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Team Scorecard
                </h3>
                {mobileMenuOpen.batsmen ? <ChevronUp /> : <ChevronDown />}
              </div>
              {mobileMenuOpen.batsmen && (
                <TeamScorecard
                  runs={team.runs}
                  wickets={team.wickets}
                  overs={team.overs}
                  balls={team.balls}
                  extras={team.extras}
                />
              )}
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-6">
                <Activity className="h-5 w-5 text-primary" />
                Commentary Log
              </h3>
              <BallLog commentary={commentary} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
