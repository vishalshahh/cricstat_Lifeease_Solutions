interface PlayerScorecardProps {
  batsmen: Array<{
    name: string
    runs: number
  }>
  bowlers: Array<{
    name: string
    overs: number
    maidens: number
    runs: number
  }>
}

export default function PlayerScorecard({
  batsmen,
  bowlers,
}: PlayerScorecardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Batsmen</h3>
        <div className="space-y-2">
          {batsmen.map((batsman) => (
            <div
              key={batsman.name}
              className="flex justify-between items-center p-2 bg-muted/50 rounded-lg"
            >
              <span>{batsman.name}</span>
              <span className="font-medium">{batsman.runs}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Bowlers</h3>
        <div className="space-y-2">
          {bowlers.map((bowler) => (
            <div
              key={bowler.name}
              className="flex justify-between items-center p-2 bg-muted/50 rounded-lg"
            >
              <span>{bowler.name}</span>
              <span className="font-medium">
                {bowler.overs}-{bowler.maidens}-{bowler.runs}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
