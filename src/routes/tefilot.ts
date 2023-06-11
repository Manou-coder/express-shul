import { Router } from 'express'
import { Paths } from '../lib/paths'
import { validateTefilot } from '../middlewares/tefilot-validation'
import { getAllTefilot } from '../controllers/tefilot-controller'

export const tefilotRouter = Router()
tefilotRouter.get(Paths.Tefilot.Get, validateTefilot, getAllTefilot)
