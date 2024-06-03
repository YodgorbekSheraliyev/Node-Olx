const multer = require('multer');
const path = require('path')

// Set storage
const storage = multer.diskStorage({
    destination: path.join('./public/uploads'),
    filename: function(req, file, cb){
        cb(null, file.fieldname +"-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
    limits: {fileSize: 100000000, files: 5},
    fileFilter: function(req, file, cb){
        const filetypes = /jpg|jpeg|png|gif/
        const extname = filetypes.test(path.extname(file.originalname.toLowerCase()))
        const mimetype = filetypes.test(file.mimetype)

        if(extname && mimetype){
           return cb(null, true)
        }
        else{
            cb("File cannot be uploaded", false)
        }

    }
})

module.exports = upload