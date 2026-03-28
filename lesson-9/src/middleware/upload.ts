import path from "node:path";
import { randomUUID } from "node:crypto";

import multer from "multer";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const destination = path.resolve("src", "tmp");
    console.log({ destination });
    cb(null, destination);
  },
  filename: (_req, file, cb) => {
    console.log({ file });
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    const uuid = randomUUID();
    console.log({ extname, basename, uuid });
    const filename = `${basename}.${uuid}${extname}`;
    console.log(filename);

    cb(null, filename);
  },
});

export const upload = multer({ storage });
