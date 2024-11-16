import { processCricketEvent } from '../events/cricketEventHandler'

export async function cricketEventService(eventData: any) {
  try {
    await processCricketEvent(eventData) // Call the event handler to process the event
  } catch (error) {
    console.error('Error processing cricket event:', error)
  }
}
