// filepath: /c:/Users/Hammad/Documents/podcast-app/server/middleware/multer.js
// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${path.extname(file.originalname)}`);
//   },
// });

// const upload = multer({ storage });

// export default upload;

// middleware/multer.js
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/') // Temporary storage directory
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  // Accept audio and image files
  if (file.fieldname === 'audio' && file.mimetype.startsWith('audio/')) {
    cb(null, true);
  } else if (file.fieldname === 'image' && file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

export default upload;

// // filepath: /c:/Users/Hammad/Documents/podcast-app/server/middleware/multer.js
// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${path.extname(file.originalname)}`);
//   },
// });

// const upload = multer({ storage });

// export default upload;

