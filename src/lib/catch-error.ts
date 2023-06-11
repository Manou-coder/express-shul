import { Response } from 'express'

export const catchError = (error: unknown, res: Response) => {
  const CustomError = error as Error
  console.log('error: ', error)
  res.status(400).json({
    error: {
      name: CustomError.name,
      message: CustomError.message,
    },
  })
}
