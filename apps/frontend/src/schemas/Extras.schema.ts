/* eslint-disable @typescript-eslint/no-require-imports */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class Extras extends Document {
  @Prop({ default: () => require('uuid').v4() })
  id: string

  @Prop({ required: true, unique: true })
  teamId: string

  @Prop({ default: 0 })
  wides: number

  @Prop({ default: 0 })
  noBalls: number

  @Prop({ default: 0 })
  byes: number

  @Prop({ default: 0 })
  legByes: number
}

export const ExtrasSchema = SchemaFactory.createForClass(Extras)
