import multer from "multer";
import path from "path";
import { randomBytes } from "crypto";

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "productImages"),
    filename(request, file, callback) {
      const hash = randomBytes(3).toString("hex");

      const filname = "-" + hash + file.originalname;

      callback(null, filname)
    }
  })
}