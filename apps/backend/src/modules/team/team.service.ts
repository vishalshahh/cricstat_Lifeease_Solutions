import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateTeamDto } from './dto/create-team.dto'

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTeamDto: CreateTeamDto) {
    return this.prisma.team.create({
      data: createTeamDto,
    })
  }

  async getTeamStats(teamId: string) {
    return this.prisma.team.findUnique({
      where: { id: teamId },
      include: {
        players: true,
        extras: true,
      },
    })
  }
}
