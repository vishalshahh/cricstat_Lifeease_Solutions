interface PlayerSelectorProps {
  label: string
  players: string[]
  onSelect: (player: string) => void
}

export default function PlayerSelector({
  label,
  players,
  onSelect,
}: PlayerSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <select
        className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onSelect(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>
          Select player
        </option>
        {players.map((player) => (
          <option key={player} value={player}>
            {player}
          </option>
        ))}
      </select>
    </div>
  )
}
