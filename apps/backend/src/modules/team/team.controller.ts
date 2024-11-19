// team.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { TeamService } from './team.service'
import { CreateTeamDto } from './dto/create-team.dto'

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto)
  }

  @Get(':id')
  async getStats(@Param('id') id: string) {
    return this.teamService.getTeamStats(id)
  }
}
