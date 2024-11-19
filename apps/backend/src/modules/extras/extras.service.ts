// extras.service.ts
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Extras } from 'schemas/Extras.schema'
import { CreateExtrasDto } from './dto/create-extras.dto'

@Injectable()
export class ExtrasService {
  constructor(@InjectModel(Extras.name) private extrasModel: Model<Extras>) {}

  async create(createExtrasDto: CreateExtrasDto): Promise<Extras> {
    const createdExtras = new this.extrasModel(createExtrasDto)
    return createdExtras.save()
  }

  async getExtrasStats(teamId: string): Promise<Extras> {
    return this.extrasModel.findOne({ teamId }).exec()
  }
}
