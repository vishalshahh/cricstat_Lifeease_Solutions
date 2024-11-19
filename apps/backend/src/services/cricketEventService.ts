import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { processCricketEvent } from '../events/cricketEventHandler'
import { CricketEvent } from 'schemas/CricketEvent.schema'
import { Match } from 'schemas/Match.schema'
import { Team } from 'schemas/Team.schema'
import { Player } from 'schemas/Player.schema'
import { Extras } from 'schemas/Extras.schema'

@Injectable()
export class CricketEventService {
  constructor(
    @InjectModel(CricketEvent.name)
    private cricketEventModel: Model<CricketEvent>,
    @InjectModel(Match.name) private matchModel: Model<Match>,
    @InjectModel(Team.name) private teamModel: Model<Team>,
    @InjectModel(Player.name) private playerModel: Model<Player>,
    @InjectModel(Extras.name) private extrasModel: Model<Extras>,
  ) {}

  async processCricketEvent(eventData: any) {
    try {
      await processCricketEvent(eventData, {
        CricketEvent: this.cricketEventModel,
        Match: this.matchModel,
        Team: this.teamModel,
        Player: this.playerModel,
        Extras: this.extrasModel,
      })
    } catch (error) {
      console.error('Error processing cricket event:', error)
      throw error // Re-throw the error to be handled by the caller
    }
  }
}
