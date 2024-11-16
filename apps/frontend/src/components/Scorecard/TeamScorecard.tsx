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
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">{teamName}</h3>
      <div className="text-3xl font-bold">
        {runs}/{wickets}
      </div>
      <div className="text-sm text-muted-foreground">
        Extras: Wide - {extras.wide}, No Ball - {extras.noBall}, Bye -{' '}
        {extras.bye}, Leg Bye - {extras.legBye}
      </div>
    </div>
  )
}
