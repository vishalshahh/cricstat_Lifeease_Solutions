// match.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { MatchService } from './match.service'
import { CreateMatchDto } from './dto/create-match.dto'

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  async create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchService.create(createMatchDto)
  }

  @Get(':id')
  async getStats(@Param('id') id: string) {
    return this.matchService.getMatchStats(id)
  }
}
