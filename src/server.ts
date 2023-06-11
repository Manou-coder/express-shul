/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express'
import { Paths } from './lib/paths'
import { apiRouter } from './routes/api'

// Configure server
export const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Add APIs, must be after middleware
app.use(Paths.Base, apiRouter)

// Error handling middleware
app.use(
  (
    err: Error,
    _: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) => {
    console.log('err: ', err)
    res.status(500).json({ error: err.message })
  }
)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})
