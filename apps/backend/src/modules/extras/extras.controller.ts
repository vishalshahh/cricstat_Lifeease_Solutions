import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { ExtrasService } from './extras.service'
import { CreateExtrasDto } from './dto/create-extras.dto'

@Controller('extras')
export class ExtrasController {
  constructor(private readonly extrasService: ExtrasService) {}

  @Post()
  async create(@Body() createExtrasDto: CreateExtrasDto) {
    return this.extrasService.create(createExtrasDto)
  }

  @Get(':teamId')
  async getStats(@Param('teamId') teamId: string) {
    return this.extrasService.getExtrasStats(teamId)
  }
}
