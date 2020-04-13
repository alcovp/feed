import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.FILE_STORAGE_PATH || '/var/www/feed')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
export const upload = multer({
    dest: 'uploads/',
    storage
});