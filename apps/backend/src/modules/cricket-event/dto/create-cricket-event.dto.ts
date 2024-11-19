// cricket-event/dto/create-cricket-event.dto.ts
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
  @IsOptional()
  normalRuns?: number

  @IsInt()
  @IsOptional()
  overthrowRuns?: number

  @IsInt()
  @IsOptional()
  byeRuns?: number

  @IsInt()
  @IsOptional()
  legbyeRuns?: number

  @IsBoolean()
  @IsOptional()
  isNoBall?: boolean

  @IsBoolean()
  @IsOptional()
  isWide?: boolean

  @IsBoolean()
  @IsOptional()
  isBye?: boolean

  @IsBoolean()
  @IsOptional()
  isLegBye?: boolean

  @IsBoolean()
  @IsOptional()
  isWicket?: boolean

  @IsString()
  @IsOptional()
  wicketType?: string

  @IsUUID()
  @IsOptional()
  fielderId?: string

  @IsString()
  @IsOptional()
  comment?: string

  @IsString()
  @IsOptional()
  description?: string
}
