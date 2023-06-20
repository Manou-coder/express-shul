import { Request, Response } from 'express'

export const getIPV4 = (req: Request, res: Response) => {
  const IPV4 = req.ip
  return res.json({ data: IPV4 })
}
