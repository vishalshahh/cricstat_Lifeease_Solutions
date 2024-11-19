import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Player = {
  id: string
  name: string
}

type PlayerSelectorProps = {
  label: string
  players: Player[]
  selectedPlayer?: Player | null
  onSelect: (player: Player) => void
}

const PlayerSelector: React.FC<PlayerSelectorProps> = ({
  label,
  players,
  selectedPlayer,
  onSelect,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Select
        value={selectedPlayer?.id}
        onValueChange={(value) => {
          console.log(`${label} - Selection made:`, value)
          const player = players.find((p) => p.id === value)
          if (player) {
            console.log(`${label} - Found player:`, player)
            onSelect(player)
          }
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`Select ${label}`}>
            {selectedPlayer?.name || `Select ${label}`}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {players.map((player) => (
            <SelectItem key={player.id} value={player.id}>
              {player.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default PlayerSelector
