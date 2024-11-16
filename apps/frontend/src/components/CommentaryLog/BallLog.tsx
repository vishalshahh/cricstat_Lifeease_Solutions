interface BallLogProps {
  commentary: Array<{
    ball: number
    outcome: string
  }>
}

export default function BallLog({ commentary }: BallLogProps) {
  return (
    <div className="space-y-2">
      {commentary.map((entry, index) => (
        <div
          key={index}
          className="p-2 bg-muted/50 rounded-lg flex justify-between items-center"
        >
          <span className="font-medium">Ball {entry.ball}</span>
          <span>{entry.outcome}</span>
        </div>
      ))}
    </div>
  )
}
