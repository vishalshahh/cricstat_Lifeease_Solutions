// components/admin/Scorecard.tsx
import { useState, useEffect } from 'react'

const Scorecard = ({ type }: { type: 'batsman' | 'bowler' }) => {
  const [score, setScore] = useState({ runs: 0, balls: 0, overs: 0 })

  useEffect(() => {
    const fetchScore = async () => {
      const response = await fetch('/api/scorecard')
      const data = await response.json()
      if (type === 'batsman') {
        setScore({
          runs: data.batsman.runs,
          balls: data.batsman.balls,
          overs: 0,
        })
      } else {
        setScore({ overs: data.bowler.overs, runs: data.bowler.runs, balls: 0 })
      }
    }

    fetchScore()
  }, [type])

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
