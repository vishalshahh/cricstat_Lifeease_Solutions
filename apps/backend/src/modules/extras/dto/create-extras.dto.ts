import { IsInt, IsString } from 'class-validator'

export class CreateExtrasDto {
  @IsString()
  teamId: string // Foreign key for Team

  @IsInt()
  wides: number

  @IsInt()
  noBalls: number

  @IsInt()
  byes: number

  @IsInt()
  legByes: number
}
