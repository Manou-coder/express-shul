import { NextFunction, Request, Response } from 'express'
import { ZodError, z } from 'zod'

const imagesSchema = z.object({}).nonstrict()

const allImagesSchema = z.array(imagesSchema)

type ValidatedImagesData = z.infer<typeof allImagesSchema>

export const validateImages = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    imagesSchema.parse(req.query)
    next()
  } catch (error) {
    const zodError = error as ZodError
    res.status(400).json({
      error: {
        message: zodError.message,
        name: zodError.name,
      },
    })
  }
}
