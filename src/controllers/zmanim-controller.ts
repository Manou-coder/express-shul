import { Request, Response } from 'express'
import { getZmaneiAyom } from '../services/kosher-zmanim'
import { Options } from 'kosher-zmanim'

export const getAll = (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as Options

    const options: Options = {
      date: query.date || new Date(),
      locationName: query.locationName || '',
      latitude: query.latitude,
      longitude: query.longitude,
      timeZoneId: query.timeZoneId,
      elevation: query.elevation,
      complexZmanim: query.complexZmanim || false,
    }

    const data = getZmaneiAyom(options)
    return res.status(200).json({ data })
  } catch (error) {
    const CustomError = error as Error
    console.log('error: ', error)
    res.status(400).json({
      error: {
        name: CustomError.name,
        message: CustomError.message,
      },
    })
  }
}
