import { Router } from 'express'
import { Paths } from '../lib/paths'
import { zmanimRouter } from './zmanim-route'
import { tefilotRouter } from './tefilot-route'
import { cityRouter } from './city-route'
import { imagesRouter } from './images-route'
import { systemRouter } from './system-route'

export const apiRouter = Router()

apiRouter.use(Paths.Zmanim.Base, zmanimRouter)
apiRouter.use(Paths.Tefilot.Base, tefilotRouter)
apiRouter.use(Paths.City.Base, cityRouter)
apiRouter.use(Paths.Images.Base, imagesRouter)
apiRouter.use(Paths.System.Base, systemRouter)
