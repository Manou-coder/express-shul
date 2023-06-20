import { Request, Response } from 'express'
import { catchError } from '../lib/catch-error'
import { convertPDFtoIMG } from '@m-coder/pdftoimage'
import fs from 'fs'

export const getAllImages = async (req: Request, res: Response) => {
  try {
    const images = await readImagesDirectory()
    const imagesPath = images?.map((image) => `/images/${image}`)
    return res.status(200).json({ data: imagesPath })
  } catch (error) {
    catchError(error, res)
  }
}

export const addOrUpadateImages = async (req: Request, res: Response) => {
  const uploadedFile = req.file
  const filename = uploadedFile?.filename
  const newFilename = filename?.replace(/.pdf/g, '.png')

  const pdfPath = `public/uploads/${filename}`
  const imagePath = `public/images/${newFilename}`

  console.log('uploadedFile: ', uploadedFile)

  // convert pdf to image
  await convertPDFtoIMG({
    pdfPath: pdfPath,
    imagePath: imagePath,
    scale: 10,
  })

  // delete pdf
  deleteFile(pdfPath)

  // if more than 20 images, delete the oldest
  clearOldestImage()

  res.json({ data: `/images/${newFilename}` })
}

const clearOldestImage = () => {
  const directoryImagePath = 'public/images/'
  // read directory
  fs.readdir(directoryImagePath, (err, files) => {
    console.log('files: ', files)
    if (err) {
      console.error('Erreur lors de la lecture du dossier :', err)
      return
    }
    // delete file if more than 20
    if (files.length > 20) {
      deleteFile(directoryImagePath + files[0])
    }
  })
}

const deleteFile = (path: string) => {
  fs.unlink(path, (err) => {
    if (err) {
      throw new Error(err.message)
    }
  })
  console.log('File deleted: ', path)
}

const readImagesDirectory = async () => {
  const directoryImagePath = 'public/images/'
  try {
    const files = await new Promise((resolve, reject) => {
      fs.readdir(directoryImagePath, (err, files) => {
        if (err) {
          reject(err)
        } else {
          resolve(files)
        }
      })
    })
    return files as string[]
  } catch (error) {
    console.log('error: ', error)
    return null
  }
}
