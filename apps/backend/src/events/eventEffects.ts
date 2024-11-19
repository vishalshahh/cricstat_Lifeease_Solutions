import { Model } from 'mongoose'
import { CricketEvent } from 'schemas/CricketEvent.schema'
import { Match } from 'schemas/Match.schema'
import { Team } from 'schemas/Team.schema'
import { Player } from 'schemas/Player.schema'
import { Extras } from 'schemas/Extras.schema'

type Models = {
  CricketEvent: Model<CricketEvent>
  Match?: Model<Match>
  Team?: Model<Team>
  Player?: Model<Player>
  Extras?: Model<Extras>
}

export async function handleWideEvent(eventId: string, models: Models) {
  const event = await models.CricketEvent.findById(eventId).exec()
  if (!event) throw new Error('Event not found')

  // Update match score
  await models.Match.findByIdAndUpdate(event.matchId, {
    $inc: { totalRuns: 1 },
  }).exec()

  // Update team score
  await models.Team.findOneAndUpdate(
    { matchId: event.matchId },
    { $inc: { runs: 1, 'extras.wides': 1 } },
  ).exec()

  // Update bowler stats
  await models.Player.findByIdAndUpdate(event.bowlerId, {
    $inc: { runsConceded: 1 },
  }).exec()
}

export async function handleNoBallRunsEvent(
  eventId: string,
  runs: number,
  models: Models,
) {
  const event = await models.CricketEvent.findById(eventId).exec()
  if (!event) throw new Error('Event not found')

  // Update match score
  await models.Match.findByIdAndUpdate(event.matchId, {
    $inc: { totalRuns: runs + 1 },
  }).exec()

  // Update team score
  await models.Team.findOneAndUpdate(
    { matchId: event.matchId },
    { $inc: { runs: runs + 1, 'extras.noBalls': 1 } },
  ).exec()

  // Update batsman stats
  await models.Player.findByIdAndUpdate(event.batsmanId, {
    $inc: { runs, ballsFaced: 1 },
  }).exec()

  // Update bowler stats
  await models.Player.findByIdAndUpdate(event.bowlerId, {
    $inc: { runsConceded: runs + 1 },
  }).exec()
}

export async function handleByeEvent(
  eventId: string,
  runs: number,
  models: Models,
) {
  const event = await models.CricketEvent.findById(eventId).exec()
  if (!event) throw new Error('Event not found')

  // Update match score
  await models.Match.findByIdAndUpdate(event.matchId, {
    $inc: { totalRuns: runs },
  }).exec()

  // Update team score
  await models.Team.findOneAndUpdate(
    { matchId: event.matchId },
    { $inc: { runs, 'extras.byes': runs } },
  ).exec()

  // Update batsman stats (only balls faced, not runs)
  await models.Player.findByIdAndUpdate(event.batsmanId, {
    $inc: { ballsFaced: 1 },
  }).exec()

  // Update bowler stats (only balls bowled, not runs conceded)
  await models.Player.findByIdAndUpdate(event.bowlerId, {
    $inc: { ballsBowled: 1 },
  }).exec()
}

export async function handleLegByeEvent(
  eventId: string,
  runs: number,
  models: Models,
) {
  const event = await models.CricketEvent.findById(eventId).exec()
  if (!event) throw new Error('Event not found')

  // Update match score
  await models.Match.findByIdAndUpdate(event.matchId, {
    $inc: { totalRuns: runs },
  }).exec()

  // Update team score
  await models.Team.findOneAndUpdate(
    { matchId: event.matchId },
    { $inc: { runs, 'extras.legByes': runs } },
  ).exec()

  // Update batsman stats (only balls faced, not runs)
  await models.Player.findByIdAndUpdate(event.batsmanId, {
    $inc: { ballsFaced: 1 },
  }).exec()

  // Update bowler stats (only balls bowled, not runs conceded)
  await models.Player.findByIdAndUpdate(event.bowlerId, {
    $inc: { ballsBowled: 1 },
  }).exec()
}

export async function handleNormalRunsEvent(
  eventId: string,
  runs: number,
  models: Models,
) {
  const event = await models.CricketEvent.findById(eventId).exec()
  if (!event) throw new Error('Event not found')

  // Update match score
  await models.Match.findByIdAndUpdate(event.matchId, {
    $inc: { totalRuns: runs },
  }).exec()

  // Update team score
  await models.Team.findOneAndUpdate(
    { matchId: event.matchId },
    { $inc: { runs } },
  ).exec()

  // Update batsman stats
  await models.Player.findByIdAndUpdate(event.batsmanId, {
    $inc: { runs, ballsFaced: 1 },
  }).exec()

  // Update bowler stats
  await models.Player.findByIdAndUpdate(event.bowlerId, {
    $inc: { runsConceded: runs, ballsBowled: 1 },
  }).exec()
}
