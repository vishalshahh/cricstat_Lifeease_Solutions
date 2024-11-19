// team/dto/create-team.dto.ts
import { IsInt, IsString } from 'class-validator'

export class CreateTeamDto {
  @IsString()
  matchId: string

  @IsInt()
  runs: number

  @IsInt()
  wickets: number
}
