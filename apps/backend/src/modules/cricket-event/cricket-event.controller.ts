import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { CricketEventService } from './cricket-event.service'
import { CreateCricketEventDto } from './dto/create-cricket-event.dto'

@Controller('cricket-event')
export class CricketEventController {
  constructor(private readonly cricketEventService: CricketEventService) {}

  @Post()
  async create(@Body() createCricketEventDto: CreateCricketEventDto) {
    return this.cricketEventService.create(createCricketEventDto)
  }

  @Get('match/:matchId')
  async getEvents(@Param('matchId') matchId: string) {
    return this.cricketEventService.getEventsForMatch(matchId)
  }
}
