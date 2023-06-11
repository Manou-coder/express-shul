import { Router } from 'express'
import { Paths } from '../lib/paths'
import { validateZmanim } from '../middlewares/zmanim-validation'
import {
  addOrUpadateCity,
  getAllZmanim,
} from '../controllers/zmanim-controller'

export const zmanimRouter = Router()
zmanimRouter.get(Paths.Zmanim.Get, validateZmanim, getAllZmanim)
zmanimRouter.post(Paths.Zmanim.Add, validateZmanim, addOrUpadateCity)
