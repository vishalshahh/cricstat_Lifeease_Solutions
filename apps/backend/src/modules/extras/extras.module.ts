// extras.module.ts
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ExtrasController } from './extras.controller'
import { ExtrasService } from './extras.service'
import { Extras, ExtrasSchema } from 'schemas/Extras.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Extras.name, schema: ExtrasSchema }]),
  ],
  controllers: [ExtrasController],
  providers: [ExtrasService],
})
export class ExtrasModule {}
