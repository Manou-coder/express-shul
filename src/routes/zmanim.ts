import { Router } from 'express'
import { Paths } from '../lib/paths'
import { getAll } from '../controllers/zmanim-controller'

export const zmanimRouter = Router()
zmanimRouter.get(Paths.Zmanim.Get, getAll)
