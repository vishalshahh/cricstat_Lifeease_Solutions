import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'GET') {
      const team = await prisma.team.findFirst()
      return res.status(200).json(team)
    } else if (req.method === 'POST') {
      const { runs, wickets, extras } = req.body
      const team = await prisma.team.update({
        where: { id: 1 }, // Assuming you have one team record
        data: { runs, wickets, extras },
      })
      return res.status(200).json(team)
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
