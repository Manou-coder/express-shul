import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('file 1: ', file)
    // Spécifier le dossier de destination pour les fichiers téléchargés
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    console.log('file 2: ', file)
    // Générer un nom de fichier unique
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const upload = multer({ storage: storage })

export const uploadMiddleware = upload.single('image')
