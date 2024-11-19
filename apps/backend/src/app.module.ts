// app.module.ts
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { MatchModule } from './modules/match/match.module'
import { ExtrasModule } from './modules/extras/extras.module'
import { PlayerModule } from './modules/player/player.module'
import { TeamModule } from './modules/team/team.module'
import { CricketEventModule } from './modules/cricket-event/cricket-event.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MatchModule,
    ExtrasModule,
    PlayerModule,
    TeamModule,
    CricketEventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
