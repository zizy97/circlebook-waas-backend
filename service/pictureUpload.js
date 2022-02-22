const multer = require('multer');

const imageUploadPath = './uploads';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, imageUploadPath)
  },
  filename: function(req, file, cb) {
    console.log(file.originalname)
    const name = `${file.originalname}-${Date.now()}`
    req.name = name
    cb(null, name)
  }
})

const imageUpload = multer({storage: storage})

module.exports = imageUpload