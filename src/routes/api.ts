import { Router } from 'express'
import { Paths } from '../lib/paths'
import { zmanimRouter } from './zmanim'
import { tefilotRouter } from './tefilot'

export const apiRouter = Router()
apiRouter.use(Paths.Zmanim.Base, zmanimRouter)
apiRouter.use(Paths.Tefilot.Base, tefilotRouter)
