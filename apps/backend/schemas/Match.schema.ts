/* eslint-disable @typescript-eslint/no-require-imports */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { CricketEvent } from './CricketEvent.schema'

@Schema({ timestamps: true })
export class Match extends Document {
  @Prop({ default: () => require('uuid').v4() })
  id: string

  @Prop({ required: true })
  totalOvers: number

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'CricketEvent' }],
  })
  events: CricketEvent[]
}

export const MatchSchema = SchemaFactory.createForClass(Match)
