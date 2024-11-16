import { Module } from '@nestjs/common'
import { MatchModule } from './modules/match/match.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [MatchModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
