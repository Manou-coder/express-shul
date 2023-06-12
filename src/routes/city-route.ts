import { Router } from 'express'
import { Paths } from '../lib/paths'
import {
  addOrUpadateCity,
  getAllCity,
  getZmanCity,
} from '../controllers/city-controller'
import { validateZmanim } from '../middlewares/zmanim-validation'

export const cityRouter = Router()

cityRouter.get(Paths.City.Get, getAllCity)
cityRouter.get(Paths.City.Zman, getZmanCity)
cityRouter.post(Paths.City.Add, validateZmanim, addOrUpadateCity)
