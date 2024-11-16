import { IsInt, IsString } from 'class-validator'

export class CreatePlayerDto {
  @IsString()
  teamId: string // Foreign key for Team

  @IsString()
  name: string

  @IsInt()
  runs: number

  @IsInt()
  ballsFaced: number

  @IsInt()
  ballsBowled: number

  @IsInt()
  runsConceded: number

  @IsInt()
  wicketsTaken: number
}
