import { Router } from 'express'
import { Paths } from '../lib/paths'
import { validateTefilot } from '../middlewares/tefilot-validation'
import {
  addOrUpdateAllTefilot,
  getAllTefilot,
} from '../controllers/tefilot-controller'

export const tefilotRouter = Router()

tefilotRouter.get(Paths.Tefilot.Get, validateTefilot, getAllTefilot)
tefilotRouter.post(Paths.Tefilot.Add, validateTefilot, addOrUpdateAllTefilot)
