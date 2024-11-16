import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateMatchDto } from './dto/create-match.dto'

@Injectable()
export class MatchService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMatchDto: CreateMatchDto) {
    return this.prisma.match.create({
      data: createMatchDto,
    })
  }

  async getMatchStats(matchId: string) {
    return this.prisma.match.findUnique({
      where: { id: matchId },
      include: {
        teamStats: true,
        events: true,
      },
    })
  }
}
