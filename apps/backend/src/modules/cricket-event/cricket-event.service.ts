import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CricketEvent } from 'schemas/CricketEvent.schema'
import { CreateCricketEventDto } from './dto/create-cricket-event.dto'
import { processCricketEvent } from '../../events/cricketEventHandler'

@Injectable()
export class CricketEventService {
  constructor(
    @InjectModel(CricketEvent.name)
    private cricketEventModel: Model<CricketEvent>,
  ) {}

  async create(matchId: string, createCricketEventDto: CreateCricketEventDto) {
    const createdEvent = new this.cricketEventModel({
      ...createCricketEventDto,
      matchId,
    })
    await createdEvent.save()

    // Process the event
    await processCricketEvent(createdEvent, {
      CricketEvent: this.cricketEventModel,
      Match: undefined,
      Team: undefined,
      Player: undefined,
      Extras: undefined,
    })

    return createdEvent
  }

  async findAll(matchId: string) {
    return this.cricketEventModel.find({ matchId }).exec()
  }
}
