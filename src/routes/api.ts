import { Router } from 'express'
import { Paths } from '../lib/paths'
import { zmanimRouter } from './zmanim-route'
import { tefilotRouter } from './tefilot-route'
import { cityRouter } from './city-route'

export const apiRouter = Router()

apiRouter.use(Paths.Zmanim.Base, zmanimRouter)
apiRouter.use(Paths.Tefilot.Base, tefilotRouter)
apiRouter.use(Paths.City.Base, cityRouter)
