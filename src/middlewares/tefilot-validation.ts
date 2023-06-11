import { NextFunction, Request, Response } from 'express'
import { ZodError, z } from 'zod'

const zmanimSchema = z.object({
  date: z.string().nullish(),
  timeZoneId: z.string(),
  locationName: z.string().nullish(),
  latitude: z.string(),
  longitude: z.string(),
  elevation: z.string().nullish(),
  complexZmanim: z.string().nullish(),
})

// type ValidatedZmanimData = z.infer<typeof zmanimSchema>

export const validateTefilot = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    zmanimSchema.parse(req.query)
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
