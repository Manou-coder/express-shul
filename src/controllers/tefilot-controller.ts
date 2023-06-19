import { Request, Response } from 'express'
import { orm } from '../database/orm'
import { catchError } from '../lib/catch-error'
import { getZmaneiAyom } from '../services/kosher-zmanim'
import { Zmanim } from '../models/Zmanim'
import { RoundDirection, RoundDirections } from '../lib/round-dirextions'

export const getAllTefilot = async (req: Request, res: Response) => {
  try {
    const db = await orm.openDb()
    const tefilot = db?.tefilot || null
    const city = db?.city || null
    if (!city || !tefilot) throw new Error('no city or tefilot')
    const zmanimData = getZmaneiAyom(city)
    // console.log('zmanimData: ', typeof zmanimData)
    const zmanim = zmanimData.Zmanim as { [key: string]: string }
    // console.log('zmanim: ', zmanim)
    tefilot?.forEach((yom) => {
      yom.tefilot.forEach((tefila) => {
        // console.log('tefila: ', tefila)
        if (tefila?.schedule.match(/^\D/)) {
          // console.log('commmence par une lettre')
          const scheduleArr = tefila.schedule.split(',')
          // console.log('scheduleArr: ', scheduleArr)
          const zman = zmanim[scheduleArr[0]]
          // console.log('zman: ', zman)
          const newSchedule = calculateModifiedZmanTime(
            zman,
            scheduleArr[1],
            scheduleArr[2]
          )
          // console.log('newSchedule: ', newSchedule)
          tefila.schedule = newSchedule.toISOString()
          // console.log('tefila.schedule: ', tefila.schedule)
        }
      })
    })
    return res.status(200).json({ data: tefilot })
  } catch (error) {
    catchError(error, res)
  }
}

export const addOrUpdateAllTefilot = async (req: Request, res: Response) => {
  try {
    const body = req.body
    const db = await orm.openDb()
    db.tefilot = body
    await orm.saveDb(db)
    return res.status(200).json({ data: body })
  } catch (error) {
    catchError(error, res)
  }
}

const calculateModifiedZmanTime = (
  date: string,
  addOrRemove: string,
  nearest: string
) => {
  let zmanTime = new Date(date)
  // console.log('zmanTime: ', zmanTime)
  // console.log('addOrRemove: ', addOrRemove)
  // console.log('nearest: ', nearest)
  if (addOrRemove !== null || addOrRemove !== undefined) {
    zmanTime = manipulateDateByMinutes(zmanTime, addOrRemove)
  }
  if (nearest === RoundDirections.Down || nearest === RoundDirections.Up) {
    zmanTime = roundToNearestFiveMinutes(zmanTime, nearest)
  }
  return zmanTime
}

function manipulateDateByMinutes(date: Date, minutesStr: string) {
  const minutes = Number(minutesStr)
  return new Date(date.getTime() + minutes * 60000)
}

function roundToNearestFiveMinutes(
  time: Date,
  direction: RoundDirection
): Date {
  const minutes = time.getMinutes()
  let roundedMinutes = 0

  if (direction === RoundDirections.Down) {
    roundedMinutes = Math.floor(minutes / 5) * 5
  } else if (direction === RoundDirections.Up) {
    roundedMinutes = Math.ceil(minutes / 5) * 5
  }

  time.setMinutes(roundedMinutes)
  time.setSeconds(0)
  time.setMilliseconds(0)
  return time
}
