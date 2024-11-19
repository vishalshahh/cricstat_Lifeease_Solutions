// match/dto/create-match.dto.ts
import { IsInt, IsString } from 'class-validator'

export class CreateMatchDto {
  @IsInt()
  totalOvers: number

  @IsString()
  matchId: string
}
