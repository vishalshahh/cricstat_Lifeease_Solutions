import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Batsman {
  name: string
  runs: number
}

interface Bowler {
  name: string
  overs: number
  maidens: number
  runs: number
}

interface PlayerScorecardProps {
  batsmen: Batsman[]
  bowlers: Bowler[]
}

export default function PlayerScorecard({
  batsmen,
  bowlers,
}: PlayerScorecardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold mb-2">Batting</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Batsman</TableHead>
              <TableHead className="text-right">Runs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {batsmen.map((batsman) => (
              <TableRow key={batsman.name}>
                <TableCell>{batsman.name}</TableCell>
                <TableCell className="text-right">{batsman.runs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2">Bowling</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bowler</TableHead>
              <TableHead className="text-right">Overs</TableHead>
              <TableHead className="text-right">Maidens</TableHead>
              <TableHead className="text-right">Runs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bowlers.map((bowler) => (
              <TableRow key={bowler.name}>
                <TableCell>{bowler.name}</TableCell>
                <TableCell className="text-right">{bowler.overs}</TableCell>
                <TableCell className="text-right">{bowler.maidens}</TableCell>
                <TableCell className="text-right">{bowler.runs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
