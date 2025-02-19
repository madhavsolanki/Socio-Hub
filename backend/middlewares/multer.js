// import multer from 'multer';

// const upload = multer({
//   storage: multer.memoryStorage(),
// });

// export default upload;



import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter,
});

export default upload;
