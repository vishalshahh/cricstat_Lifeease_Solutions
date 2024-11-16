import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  IsDate,
  IsUUID,
} from 'class-validator'

export class CreateCricketEventDto {
  @IsUUID()
  matchId: string

  @IsString()
  eventType: string

  @IsDate()
  eventTime: Date

  @IsInt()
  over: number

  @IsInt()
  ball: number

  @IsUUID()
  batsmanId: string

  @IsUUID()
  bowlerId: string

  @IsInt()
  normalRuns?: number

  @IsInt()
  overthrowRuns?: number

  @IsInt()
  byeRuns?: number

  @IsInt()
  legbyeRuns?: number

  @IsBoolean()
  isNoBall?: boolean

  @IsBoolean()
  isWide?: boolean

  @IsBoolean()
  isBye?: boolean

  @IsBoolean()
  isLegBye?: boolean

  @IsBoolean()
  isWicket?: boolean

  @IsOptional()
  @IsString()
  wicketType?: string

  @IsOptional()
  @IsUUID()
  fielderId?: string

  @IsOptional()
  @IsString()
  comment?: string

  @IsOptional()
  @IsString()
  description?: string
}
