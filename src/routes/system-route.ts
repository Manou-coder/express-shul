import { Router } from 'express'
import { Paths } from '../lib/paths'
import { getIPv4 } from '../controllers/system-controller'

export const systemRouter = Router()

systemRouter.get(Paths.System.Get, getIPv4)
