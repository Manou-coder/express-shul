import os from 'os'
import { Request, Response } from 'express'

export const getIPv4 = (req: Request, res: Response) => {
  const networkInterfaces = os.networkInterfaces()

  const IPv4 = networkInterfaces['Wi-Fi']?.find(
    (element) => element.family === 'IPv4'
  )?.address

  return res.json({ data: IPv4 })
}
