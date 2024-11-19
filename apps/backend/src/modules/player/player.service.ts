// player.service.ts
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Player } from 'schemas/Player.schema'
import { CreatePlayerDto } from './dto/create-player.dto'

@Injectable()
export class PlayerService {
  constructor(@InjectModel(Player.name) private playerModel: Model<Player>) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const createdPlayer = new this.playerModel(createPlayerDto)
    return createdPlayer.save()
  }

  async getPlayerStats(playerId: string): Promise<Player> {
    return this.playerModel.findById(playerId).exec()
  }
}
