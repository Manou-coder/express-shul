import { NextFunction, Request, Response } from 'express'
import { ZodError, z } from 'zod'
import { zmanimSchema } from '../schemas/zmanimSchema'

export const validateZmanim = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.method === 'POST') {
      zmanimSchema.parse(req.body)
    } else {
      zmanimSchema.parse(req.query)
    }

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
