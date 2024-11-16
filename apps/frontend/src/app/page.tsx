'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ChevronDown,
  ChevronUp,
  BirdIcon as Cricket,
  Shield,
} from 'lucide-react'
import PlayerSelector from '../components/Commentary/PlayerSelector'
import TeamScorecard from '../components/Scorecard/TeamScorecard'
import PlayerScorecard from '../components/Scorecard/PlayerScorecard'
import BallLog from '../components/CommentaryLog/BallLog'

type CommentaryEvent = {
  ball: number
  outcome: string
}

const Home = () => {
  const [team, setTeam] = useState({
    name: 'Team A',
    runs: 0,
    wickets: 0,
    extras: { wide: 0, noBall: 0, bye: 0, legBye: 0 },
  })
  const [players] = useState(['Sachin', 'Dravid', 'Ganguly', 'Dhoni'])
  const [commentary, setCommentary] = useState<CommentaryEvent[]>([])

  const handleEvent = (event: string) => {
    if (event === '6') {
      setTeam((prev) => ({ ...prev, runs: prev.runs + 6 }))
    } else if (event === 'Wicket') {
      setTeam((prev) => ({ ...prev, wickets: prev.wickets + 1 }))
    }
    setCommentary((prev) => [
      ...prev,
      { ball: prev.length + 1, outcome: event },
    ])
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState({
    scoring: false,
    teamScore: false,
    batsmen: false,
    bowlers: false,
  })

  type Section = 'scoring' | 'teamScore' | 'batsmen' | 'bowlers'

  const toggleSection = (section: Section) => {
    setMobileMenuOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Cricket className="h-8 w-8 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
            Cricket Scoring Panel
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Scoring Controls */}
          <div className="space-y-6">
            {/* Commentary Buttons */}
            <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Player Selection
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => toggleSection('scoring')}
                >
                  {mobileMenuOpen.scoring ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <PlayerSelector
                  label="Striker"
                  players={players}
                  onSelect={(player) => console.log(`Striker: ${player}`)}
                />
                <PlayerSelector
                  label="Non-Striker"
                  players={players}
                  onSelect={(player) => console.log(`Non-Striker: ${player}`)}
                />
              </div>
            </Card>

            {/* Run Buttons */}
            <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Cricket className="h-5 w-5 text-primary" />
                  Scoring
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => toggleSection('scoring')}
                >
                  {mobileMenuOpen.scoring ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {[0, 1, 2, 3, 4, 6].map((runs) => (
                    <Button
                      key={runs}
                      onClick={() => handleEvent(runs.toString())}
                      variant="outline"
                      className="h-14 text-xl font-semibold hover:scale-105 transition-transform duration-200"
                    >
                      {runs}
                    </Button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleEvent('Wide')}
                    variant="secondary"
                    className="h-12 font-semibold"
                  >
                    Wide
                  </Button>
                  <Button
                    onClick={() => handleEvent('No Ball')}
                    variant="secondary"
                    className="h-12 font-semibold"
                  >
                    No Ball
                  </Button>
                  <Button
                    onClick={() => handleEvent('Bye')}
                    variant="secondary"
                    className="h-12 font-semibold"
                  >
                    Bye
                  </Button>
                  <Button
                    onClick={() => handleEvent('Leg Bye')}
                    variant="secondary"
                    className="h-12 font-semibold"
                  >
                    Leg Bye
                  </Button>
                </div>
                <Button
                  onClick={() => handleEvent('Wicket')}
                  className="w-full h-14 bg-red-500 hover:bg-red-600 text-white font-bold text-lg hover:scale-105 transition-transform duration-200"
                >
                  Wicket
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column - Scorecards */}
          <div className="space-y-6">
            {/* Team Scorecard */}
            <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Team Scorecard
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => toggleSection('teamScore')}
                >
                  {mobileMenuOpen.teamScore ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <TeamScorecard
                  teamName={team.name}
                  runs={team.runs}
                  wickets={team.wickets}
                  extras={team.extras}
                />
              </div>
            </Card>

            {/* Player Scorecard */}
            <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Cricket className="h-5 w-5 text-primary" />
                  Player Statistics
                </h3>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <PlayerScorecard
                  batsmen={[{ name: 'Sachin', runs: 50 }]}
                  bowlers={[{ name: 'Dhoni', overs: 5, maidens: 1, runs: 30 }]}
                />
              </div>
            </Card>
          </div>
        </div>

        {/* Ball-by-Ball Commentary */}
        <Card className="mt-8 p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-6">
            <Cricket className="h-5 w-5 text-primary" />
            Ball by Ball Commentary
          </h3>
          <div className="space-y-3 bg-muted/50 rounded-lg p-4 max-h-[300px] overflow-y-auto">
            {commentary.map((ball, index) => (
              <BallLog key={index} commentary={[ball]} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Home
