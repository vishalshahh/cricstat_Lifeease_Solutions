import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'GET') {
      const commentary = await prisma.commentary.findMany()
      return res.status(200).json(commentary)
    } else if (req.method === 'POST') {
      const { ball, outcome } = req.body
      const newCommentary = await prisma.commentary.create({
        data: { ball, outcome },
      })
      return res.status(201).json(newCommentary)
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
