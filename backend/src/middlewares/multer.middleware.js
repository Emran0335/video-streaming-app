import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage: storage,
});

// multer helps to upload file smoothly from body from of the frontend
// npm i --save-dev @types/multer must be installed along with multer
// http request from the client site
// http response from the server site
// leetcode for logic
// bclick for logic