import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreatePlayerDto } from './dto/create-player.dto'

@Injectable()
export class PlayerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPlayerDto: CreatePlayerDto) {
    return this.prisma.player.create({
      data: createPlayerDto,
    })
  }

  async getPlayerStats(playerId: string) {
    return this.prisma.player.findUnique({
      where: { id: playerId },
    })
  }
}
