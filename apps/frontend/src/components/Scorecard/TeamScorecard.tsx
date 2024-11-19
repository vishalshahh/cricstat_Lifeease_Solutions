import React from 'react'

interface TeamScorecardProps {
  teamName: string
  runs: number
  wickets: number
  extras: {
    wide: number
    noBall: number
    bye: number
    legBye: number
  }
}

export default function TeamScorecard({
  teamName,
  runs,
  wickets,
  extras,
}: TeamScorecardProps) {
  const totalExtras = extras.wide + extras.noBall + extras.bye + extras.legBye

  return (
    <div className="space-y-2">
      <h4 className="text-lg font-semibold">{teamName}</h4>
      <p className="text-3xl font-bold">
        {runs}/{wickets}
      </p>
      <div className="text-sm text-muted-foreground">
        <p>
          Extras: {totalExtras} (Wd {extras.wide}, NB {extras.noBall}, B{' '}
          {extras.bye}, LB {extras.legBye})
        </p>
      </div>
    </div>
  )
}
