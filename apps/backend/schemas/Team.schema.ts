/* eslint-disable @typescript-eslint/no-require-imports */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { Player } from './Player.schema'
import { Extras } from './Extras.schema'

@Schema({ timestamps: true })
export class Team extends Document {
  @Prop({ default: () => require('uuid').v4() })
  id: string

  @Prop({ required: true })
  matchId: string

  @Prop({ default: 0 })
  runs: number

  @Prop({ default: 0 })
  wickets: number

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Extras' })
  extras: Extras

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Player' }] })
  players: Player[]
}

export const TeamSchema = SchemaFactory.createForClass(Team)
