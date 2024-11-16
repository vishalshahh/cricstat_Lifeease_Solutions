import { IsInt } from 'class-validator'

export class CreateMatchDto {
  @IsInt()
  totalOvers: number

  matchId: string
}
