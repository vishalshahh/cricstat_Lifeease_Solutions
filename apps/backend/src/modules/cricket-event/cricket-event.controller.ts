import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { CricketEventService } from './cricket-event.service'
import { CreateCricketEventDto } from './dto/create-cricket-event.dto'

@Controller('cricket-event')
export class CricketEventController {
  constructor(private readonly cricketEventService: CricketEventService) {}

  @Post('match/:matchId')
  async create(
    @Param('matchId') matchId: string,
    @Body() createCricketEventDto: CreateCricketEventDto,
  ) {
    return this.cricketEventService.create(matchId, createCricketEventDto)
  }

  @Get('match/:matchId')
  async findAll(@Param('matchId') matchId: string) {
    return this.cricketEventService.findAll(matchId)
  }
}
