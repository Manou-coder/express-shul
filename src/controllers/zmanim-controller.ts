import { Request, Response } from 'express'
import { getZmaneiAyom } from '../services/kosher-zmanim'
import { Options } from 'kosher-zmanim'
import { ValidatedZmanimData } from '../schemas/zmanimSchema'
import { catchError } from '../lib/catch-error'

export const getAllZmanim = (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as ValidatedZmanimData

    const options: Options = {
      date: query.date || new Date(),
      locationName: query.locationName || '',
      latitude: Number(query.latitude),
      longitude: Number(query.longitude),
      timeZoneId: query.timeZoneId,
      elevation: Number(query.elevation),
      complexZmanim: query.complexZmanim === 'true' ? true : false,
    }

    const data = getZmaneiAyom(options)
    return res.status(200).json({ data })
  } catch (error) {
    catchError(error, res)
  }
}
