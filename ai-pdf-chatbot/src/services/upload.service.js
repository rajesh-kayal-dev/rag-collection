import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniquename = Date.now() + '_' + file.originalname;
        cb(null, uniquename);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files allowed'), false);
    }
};

export const upload = multer({
    storage,
    fileFilter
});