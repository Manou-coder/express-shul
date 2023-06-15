import { Request, Response } from 'express'
import { orm } from '../database/orm'
import { catchError } from '../lib/catch-error'

export const getAllTefilot = async (req: Request, res: Response) => {
  try {
    const db = await orm.openDb()
    const tefilot = db?.tefilot || null
    console.log('tefilot: ', tefilot)
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

export const modifyTefila = async (req: Request, res: Response) => {
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
