import { Router } from 'express'
import { Paths } from '../lib/paths'
import { validateZmanim } from '../middlewares/zmanim-validation'
import { getAllZmanim } from '../controllers/zmanim-controller'

export const zmanimRouter = Router()

zmanimRouter.get(Paths.Zmanim.Get, validateZmanim, getAllZmanim)
