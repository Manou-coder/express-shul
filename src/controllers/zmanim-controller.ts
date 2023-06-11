import { Request, Response } from 'express'
export const getAll = (req: Request, res: Response) => {
  return res.status(200).json({ data: 'zmanim' })
}
