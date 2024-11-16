import { EventType } from './eventTypes'
import {
  handleWideEvent,
  handleNoBallByeEvent,
  handleNoBallRunsEvent,
  handleNoBallLegByeEvent,
  handleByeLegByeOverthrowEvent,
  handleRunsOverthrowEvent,
} from './eventEffects'

// This function will receive event data and process the effects accordingly
export async function processCricketEvent(eventData: any) {
  const { eventType, cricketEventId, runs, byeRuns, legByeRuns } = eventData

  switch (eventType) {
    case EventType.WIDE:
      await handleWideEvent(cricketEventId)
      break
    case EventType.NOBALL:
      if (runs > 0) {
        await handleNoBallRunsEvent(cricketEventId, runs)
      } else if (byeRuns > 0) {
        await handleNoBallByeEvent(cricketEventId, byeRuns)
      } else if (legByeRuns > 0) {
        await handleNoBallLegByeEvent(cricketEventId, legByeRuns)
      }
      break
    case EventType.LEGBYE:
    case EventType.BYE:
      await handleByeLegByeOverthrowEvent(cricketEventId, runs, eventType)
      break
    case EventType.OVERTHROW:
      await handleRunsOverthrowEvent(cricketEventId, runs)
      break
    default:
      throw new Error('Unknown event type')
  }
}
