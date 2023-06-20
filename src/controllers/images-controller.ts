import { Request, Response } from 'express'
import { orm } from '../database/orm'
import { catchError } from '../lib/catch-error'
import { getZmaneiAyom } from '../services/kosher-zmanim'
import { Options } from 'kosher-zmanim'
import multer, { Multer } from 'multer'
import { convertPDFtoIMG } from '@m-coder/pdftoimage'
import fs from 'fs'

export const getAllImages = async (req: Request, res: Response) => {
  try {
    const db = await orm.openDb()
    const city = db.city
    return res.status(200).json({ data: 'hello' })
  } catch (error) {
    catchError(error, res)
  }
}

// export const addOrUpadateImages = async (req: Request, res: Response) => {
//   console.log('req: ', req)
//   try {
//     const body = req.body
//     console.log('body: ', body)
//     return res.status(200).json({ data: 'papa' })
//   } catch (error) {
//     catchError(error, res)
//   }
// }

export const addOrUpadateImages = async (req: Request, res: Response) => {
  const uploadedFile = req.file
  const pdfPath = `public/uploads/${uploadedFile?.filename}`
  const imagePath = `public/images/${uploadedFile?.filename}`

  console.log('uploadedFile: ', uploadedFile)

  // convert pdf to image
  await convertPDFtoIMG({
    pdfPath: pdfPath,
    imagePath: imagePath,
    scale: 10,
  })
  console.log('Conversion successful!')

  // delete file
  if (fs.existsSync(pdfPath)) {
    fs.unlink(pdfPath, (err) => {
      if (err) {
        console.error('Erreur lors de la suppression du fichier :', err)
        return
      }

      console.log('Le fichier a été supprimé avec succès')
    })
  } else {
    console.error("Le fichier spécifié n'existe pas")
  }
  res.json({ success: true })
}
