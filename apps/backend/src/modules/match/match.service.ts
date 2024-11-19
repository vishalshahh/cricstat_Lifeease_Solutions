// match.service.ts
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Match } from 'schemas/Match.schema'
import { CreateMatchDto } from './dto/create-match.dto'

@Injectable()
export class MatchService {
  constructor(@InjectModel(Match.name) private matchModel: Model<Match>) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const createdMatch = new this.matchModel(createMatchDto)
    return createdMatch.save()
  }

  async getMatchStats(matchId: string): Promise<Match> {
    return this.matchModel
      .findById(matchId)
      .populate('teamStats')
      .populate('events')
      .exec()
  }
}
