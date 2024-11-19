/* eslint-disable @typescript-eslint/no-require-imports */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { CricketEvent } from './CricketEvent.schema'

@Schema({ timestamps: true })
export class Player extends Document {
  static findById(playerId: string) {
    throw new Error('Method not implemented.')
  }
  static findByIdAndUpdate(playerId: string, updateData: any, arg2: { new: boolean }) {
    throw new Error('Method not implemented.')
  }
  @Prop({ default: () => require('uuid').v4() })
  id: string

  @Prop({ required: true })
  teamId: string

  @Prop({ required: true })
  name: string

  @Prop({ default: 0 })
  runs: number

  @Prop({ default: 0 })
  ballsFaced: number

  @Prop({ default: 0 })
  ballsBowled: number

  @Prop({ default: 0 })
  runsConceded: number

  @Prop({ default: 0 })
  wicketsTaken: number

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'CricketEvent' }],
  })
  cricketEventsAsBatsman: CricketEvent[]

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'CricketEvent' }],
  })
  cricketEventsAsBowler: CricketEvent[]

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'CricketEvent' }],
  })
  cricketEventsAsFielder: CricketEvent[]
}

export const PlayerSchema = SchemaFactory.createForClass(Player)
