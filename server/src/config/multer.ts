import multer from "multer";
import path from "path";

const config = multer({
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "images"),
    filename(request, file, callback) {
      callback(null, file.originalname);
    },
  }),
});

export default config;
