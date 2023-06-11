import { NextFunction, Request, Response } from 'express'
import { ZodError, z } from 'zod'

const tefilotSchema = z.object({}).nonstrict()

const allTefilotSchema = z.array(tefilotSchema)

type ValidatedTefilotData = z.infer<typeof allTefilotSchema>

export const validateTefilot = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    tefilotSchema.parse(req.query)
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
