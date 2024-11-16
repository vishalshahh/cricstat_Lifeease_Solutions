import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateExtrasDto } from './dto/create-extras.dto'

@Injectable()
export class ExtrasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createExtrasDto: CreateExtrasDto) {
    return this.prisma.extras.create({
      data: createExtrasDto,
    })
  }

  async getExtrasStats(teamId: string) {
    return this.prisma.extras.findUnique({
      where: { teamId },
    })
  }
}
