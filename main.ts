import express from "express"
import multer from "multer"
import fs from "fs"
import cors from "cors"
export const app = express()


app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow all methods
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post("/upload", upload.single("file"), async (req: any, res: any) => {
  log("Logging", req.file)
  res.send({ filename: req.file.filename })
})

app.get("/files", (req, res) => {
  const files = fs.readdirSync("uploads/")
  res.send({ files })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})

const log = (...args: any[]) => {
  if (process.env.NODE_ENV === "development") {
    console.log(...args)
  } else {
    console.log("SENTRY", ...args)
  }
}
