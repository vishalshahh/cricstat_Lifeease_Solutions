// cricket-event.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateCricketEventDto } from './dto/create-cricket-event.dto'

@Injectable()
export class CricketEventService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCricketEventDto: CreateCricketEventDto) {
    return this.prisma.cricketEvent.create({
      data: createCricketEventDto, // The data passed here should match the Prisma model input
    })
  }

  async getEventsForMatch(matchId: string) {
    return this.prisma.cricketEvent.findMany({
      where: { matchId },
    })
  }
}
