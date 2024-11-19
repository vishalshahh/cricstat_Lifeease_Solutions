import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CricketEventController } from './cricket-event.controller'
import { CricketEventService } from './cricket-event.service'
import { CricketEvent, CricketEventSchema } from 'schemas/CricketEvent.schema'
import { Match, MatchSchema } from 'schemas/Match.schema'
import { Team, TeamSchema } from 'schemas/Team.schema'
import { Player, PlayerSchema } from 'schemas/Player.schema'
import { Extras, ExtrasSchema } from 'schemas/Extras.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CricketEvent.name, schema: CricketEventSchema },
      { name: Match.name, schema: MatchSchema },
      { name: Team.name, schema: TeamSchema },
      { name: Player.name, schema: PlayerSchema },
      { name: Extras.name, schema: ExtrasSchema },
    ]),
  ],
  controllers: [CricketEventController],
  providers: [CricketEventService],
})
export class CricketEventModule {}
