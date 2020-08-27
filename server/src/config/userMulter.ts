import multer from "multer";
import path from "path";
import { randomBytes } from "crypto";

const config = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/))
      return cb(new Error("Invalid image format."));

    cb(null, true);
  },
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "images", "user"),
    filename(req, file, cb) {
      const hash = randomBytes(6).toString("hex");

      const filename = hash + file.originalname;

      cb(null, filename);
    },
  }),
});

export default config;
