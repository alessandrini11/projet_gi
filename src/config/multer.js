const multer = require('multer')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/files')
    },
    filename: (req, file, cb) => {
        cb(null, randomNumber(0, 1000) + 'x' + randomNumber(0, 1000) + file.originalname)
    }
})

const randomNumber = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min) + min)
}
const fileUpload = multer({storage: fileStorage}).single('list')

module.exports = {
    fileUpload
}