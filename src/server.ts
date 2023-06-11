/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express'

// Configure server
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

export default app
