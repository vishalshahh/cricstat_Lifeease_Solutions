// extras/dto/create-extras.dto.ts
import { IsInt, IsString } from 'class-validator'

export class CreateExtrasDto {
  @IsString()
  teamId: string

  @IsInt()
  wides: number

  @IsInt()
  noBalls: number

  @IsInt()
  byes: number

  @IsInt()
  legByes: number
}
