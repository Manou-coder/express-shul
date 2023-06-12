import { Request, Response } from 'express'
import { orm } from '../database/orm'
import { catchError } from '../lib/catch-error'
import { getZmaneiAyom } from '../services/kosher-zmanim'
import { Options } from 'kosher-zmanim'

export const getAllCity = async (req: Request, res: Response) => {
  try {
    const db = await orm.openDb()
    const city = db.city
    return res.status(200).json({ data: city })
  } catch (error) {
    catchError(error, res)
  }
}

export const getZmanCity = async (req: Request, res: Response) => {
  try {
    const db = await orm.openDb()
    const city = db.city
    if (!city) throw new Error('city not found')
    const zmanCity = getZmaneiAyom(city)
    return res.status(200).json({ data: zmanCity })
  } catch (error) {
    catchError(error, res)
  }
}

export const addOrUpadateCity = async (req: Request, res: Response) => {
  try {
    const body = req.body

    const options: Options = {
      date: body.date || new Date(),
      locationName: body.locationName || '',
      latitude: Number(body.latitude),
      longitude: Number(body.longitude),
      timeZoneId: body.timeZoneId,
      elevation: Number(body.elevation),
      complexZmanim: body.complexZmanim === 'true' ? true : false,
    }

    const data = getZmaneiAyom(options)
    const db = await orm.openDb()
    db.city = options
    await orm.saveDb(db)
    return res.status(200).json({ data })
  } catch (error) {
    catchError(error, res)
  }
}
