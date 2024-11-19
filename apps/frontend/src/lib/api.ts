import axios from 'axios'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export interface CricketEvent {
  id: string
  matchId: string
  eventType: string
  eventTime: Date
  over: number
  ball: number
  batsmanId: string
  bowlerId: string
  normalRuns: number
  overthrowRuns: number
  byeRuns: number
  legbyeRuns: number
  isNoBall: boolean
  isWide: boolean
  isBye: boolean
  isLegBye: boolean
  isWicket: boolean
  wicketType?: string
  fielderId?: string
  comment?: string
}

export interface Player {
  id: string
  teamId: string
  name: string
  runs: number
  ballsFaced: number
  ballsBowled: number
  runsConceded: number
  wicketsTaken: number
}

export interface Team {
  id: string
  matchId: string
  runs: number
  wickets: number
  extras: {
    wides: number
    noBalls: number
    byes: number
    legByes: number
  }
}

export const api = {
  // Match related APIs
  createMatch: async (totalOvers: number) => {
    const response = await axios.post(`${API_BASE_URL}/match`, { totalOvers })
    return response.data
  },

  getMatchStats: async (matchId: string) => {
    const response = await axios.get(`${API_BASE_URL}/match/${matchId}`)
    return response.data
  },

  // Team related APIs
  createTeam: async (matchId: string) => {
    const response = await axios.post(`${API_BASE_URL}/team`, { matchId })
    return response.data
  },

  updateTeamScore: async (teamId: string, data: Partial<Team>) => {
    const response = await axios.patch(`${API_BASE_URL}/team/${teamId}`, data)
    return response.data
  },

  getTeamStats: async (teamId: string) => {
    const response = await axios.get(`${API_BASE_URL}/team/${teamId}`)
    return response.data
  },

  // Player related APIs
  createPlayer: async (data: Partial<Player>) => {
    const response = await axios.post(`${API_BASE_URL}/player`, data)
    return response.data
  },

  getPlayerStats: async (playerId: string) => {
    const response = await axios.get(`${API_BASE_URL}/player/${playerId}`)
    return response.data
  },

  // Cricket Event related APIs
  createEvent: async (matchId: string, eventData: Partial<CricketEvent>) => {
    const response = await axios.post(
      `${API_BASE_URL}/cricket-event/match/${matchId}`,
      eventData,
    )
    return response.data
  },

  getMatchEvents: async (matchId: string) => {
    const response = await axios.get(
      `${API_BASE_URL}/cricket-event/match/${matchId}`,
    )
    return response.data
  },
}
