import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('file 1: ', file)
    // specify destination
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    console.log('file 2: ', file)
    // generate unique name
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const upload = multer({ storage: storage })

export const uploadMiddleware = upload.single('image')
