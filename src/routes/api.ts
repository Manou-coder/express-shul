import { Router } from 'express'
import { Paths } from '../lib/paths'
import { zmanimRouter } from './zmanim-route'
import { tefilotRouter } from './tefilot-route'

export const apiRouter = Router()
apiRouter.use(Paths.Zmanim.Base, zmanimRouter)
apiRouter.use(Paths.Tefilot.Base, tefilotRouter)
