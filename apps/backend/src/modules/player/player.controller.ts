// player.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { PlayerService } from './player.service'
import { CreatePlayerDto } from './dto/create-player.dto'

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create(createPlayerDto)
  }

  @Get(':id')
  async getStats(@Param('id') id: string) {
    return this.playerService.getPlayerStats(id)
  }
}
