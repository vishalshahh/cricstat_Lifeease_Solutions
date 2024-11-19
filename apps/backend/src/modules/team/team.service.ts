// team.service.ts
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Team } from 'schemas/Team.schema'
import { CreateTeamDto } from './dto/create-team.dto'

@Injectable()
export class TeamService {
  constructor(@InjectModel(Team.name) private teamModel: Model<Team>) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const createdTeam = new this.teamModel(createTeamDto)
    return createdTeam.save()
  }

  async getTeamStats(teamId: string): Promise<Team> {
    return this.teamModel
      .findById(teamId)
      .populate('players')
      .populate('extras')
      .exec()
  }
}
