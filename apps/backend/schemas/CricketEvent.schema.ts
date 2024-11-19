import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema()
export class CricketEvent extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Match', required: true })
  matchId: Types.ObjectId

  @Prop({ required: true })
  eventType: string

  @Prop({ required: true })
  eventTime: Date

  @Prop({ required: true })
  over: number

  @Prop({ required: true })
  ball: number

  @Prop({ type: Types.ObjectId, ref: 'Player', required: true })
  batsmanId: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: 'Player', required: true })
  bowlerId: Types.ObjectId

  @Prop({ default: 0 })
  normalRuns: number

  @Prop({ default: 0 })
  overthrowRuns: number

  @Prop({ default: 0 })
  byeRuns: number

  @Prop({ default: 0 })
  legbyeRuns: number

  @Prop({ default: false })
  isNoBall: boolean

  @Prop({ default: false })
  isWide: boolean

  @Prop({ default: false })
  isBye: boolean

  @Prop({ default: false })
  isLegBye: boolean

  @Prop({ default: false })
  isWicket: boolean

  @Prop()
  wicketType?: string

  @Prop({ type: Types.ObjectId, ref: 'Player' })
  fielderId?: Types.ObjectId

  @Prop()
  comment?: string
}

export const CricketEventSchema = SchemaFactory.createForClass(CricketEvent)
