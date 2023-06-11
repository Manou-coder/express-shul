import { Router } from 'express'
import { Paths } from '../lib/paths'
import { zmanimRouter } from './zmanim'

export const apiRouter = Router()
apiRouter.use(Paths.Zmanim.Base, zmanimRouter)
apiRouter.use(Paths.Tefilot.Base, zmanimRouter)
