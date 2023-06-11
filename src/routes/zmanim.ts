import { Router } from 'express'
import { Paths } from '../lib/paths'
import { getAll } from '../controllers/zmanim-controller'
import { validateZmanim } from '../middlewares/zmanim-validation'

export const zmanimRouter = Router()
zmanimRouter.get(Paths.Zmanim.Get, validateZmanim, getAll)
