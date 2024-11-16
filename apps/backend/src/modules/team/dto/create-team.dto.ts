import { IsInt, IsString } from 'class-validator'

export class CreateTeamDto {
  @IsString()
  matchId: string // Foreign key for Match

  @IsInt()
  runs: number

  @IsInt()
  wickets: number
}
