import { Model } from 'mongoose'
import { CricketEvent } from 'schemas/CricketEvent.schema'
import { Match } from 'schemas/Match.schema'
import { Team } from 'schemas/Team.schema'
import { Player } from 'schemas/Player.schema'
import { Extras } from 'schemas/Extras.schema'
import {
  handleWideEvent,
  handleNoBallRunsEvent,
  handleByeEvent,
  handleLegByeEvent,
  handleNormalRunsEvent,
} from './eventEffects'

export async function processCricketEvent(
  eventData: CricketEvent,
  models: {
    CricketEvent: Model<CricketEvent>
    Match?: Model<Match>
    Team?: Model<Team>
    Player?: Model<Player>
    Extras?: Model<Extras>
  },
) {
  const { isWide, isNoBall, isBye, isLegBye, normalRuns } = eventData

  if (isWide) {
    await handleWideEvent(eventData.id, models)
  } else if (isNoBall) {
    await handleNoBallRunsEvent(eventData.id, normalRuns, models)
  } else if (isBye) {
    await handleByeEvent(eventData.id, normalRuns, models)
  } else if (isLegBye) {
    await handleLegByeEvent(eventData.id, normalRuns, models)
  } else if (normalRuns > 0) {
    await handleNormalRunsEvent(eventData.id, normalRuns, models)
  }
}
