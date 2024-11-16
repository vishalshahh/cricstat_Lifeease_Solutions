import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'GET') {
      const players = await prisma.player.findMany()
      return res.status(200).json(players)
    } else if (req.method === 'POST') {
      const { name, runs, balls, status } = req.body
      const player = await prisma.player.create({
        data: { name, runs, balls, status },
      })
      return res.status(201).json(player)
    } else if (req.method === 'PUT') {
      const { id } = req.query
      const { runs, balls, status } = req.body
      const player = await prisma.player.update({
        where: { id: Number(id) },
        data: { runs, balls, status },
      })
      return res.status(200).json(player)
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
