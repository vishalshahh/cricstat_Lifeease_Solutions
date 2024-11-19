import { useState, useEffect } from 'react'
import { api } from '@/lib/api'

const Scorecard = ({
  type,
  playerId,
}: {
  type: 'batsman' | 'bowler'
  playerId: string
}) => {
  const [score, setScore] = useState({ runs: 0, balls: 0, overs: 0 })

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const playerStats = await api.getPlayerStats(playerId)
        if (type === 'batsman') {
          setScore({
            runs: playerStats.runs,
            balls: playerStats.ballsFaced,
            overs: 0,
          })
        } else {
          setScore({
            overs:
              Math.floor(playerStats.ballsBowled / 6) +
              (playerStats.ballsBowled % 6) / 10,
            runs: playerStats.runsConceded,
            balls: 0,
          })
        }
      } catch (error) {
        console.error('Failed to fetch player stats:', error)
      }
    }

    fetchScore()
  }, [type, playerId])

  return (
    <div className="bg-white p-5 rounded-lg shadow-md mb-5">
      <h3 className="text-xl font-semibold">
        {type === 'batsman' ? 'Batsman' : 'Bowler'} Scorecard
      </h3>
      <p>Runs: {score.runs}</p>
      <p>Balls: {score.balls}</p>
      <p>Overs: {score.overs}</p>
    </div>
  )
}

export default Scorecard
