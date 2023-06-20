import { Router } from 'express'
import { Paths } from '../lib/paths'
import {
  addOrUpadateImages,
  getAllImages,
} from '../controllers/images-controller'
import { uploadMiddleware } from '../middlewares/upload-middleware'

export const imagesRouter = Router()

imagesRouter.get(Paths.Images.Get, getAllImages)
imagesRouter.post(Paths.Images.Add, uploadMiddleware, addOrUpadateImages)
