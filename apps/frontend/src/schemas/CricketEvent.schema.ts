/* eslint-disable @typescript-eslint/no-require-imports */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'

@Schema({ timestamps: true })
export class CricketEvent extends Document {
  static find(p0: { matchId: string | null }) {
    throw new Error('Method not implemented.')
  }
  @Prop({ default: () => require('uuid').v4() })
  id: string

  @Prop({ required: true })
  matchId: string

  @Prop({ required: true })
  eventType: string

  @Prop({ required: true })
  eventTime: Date

  @Prop({ required: true })
  over: number

  @Prop({ required: true })
  ball: number

  @Prop({ required: true })
  batsmanId: string

  @Prop({ required: true })
  bowlerId: string

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

  @Prop({ default: null })
  wicketType?: string

  @Prop({ default: null })
  fielderId?: string

  @Prop({ default: null })
  comment?: string

  @Prop({ default: null })
  description?: string

  // References
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Player' })
  batsman: string

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Player' })
  bowler: string

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Player', default: null })
  fielder?: string

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Match' })
  match: string
}

export const CricketEventSchema = SchemaFactory.createForClass(CricketEvent)
