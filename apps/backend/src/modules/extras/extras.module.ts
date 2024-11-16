import { Module } from '@nestjs/common'
import { PrismaModule } from '../../prisma/prisma.module'
import { ExtrasController } from './extras.controller'
import { ExtrasService } from './extras.service'

@Module({
  imports: [PrismaModule],
  controllers: [ExtrasController],
  providers: [ExtrasService],
})
export class ExtrasModule {}
