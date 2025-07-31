import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { analyzeImage } from "./controllers/imageController";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.post("/api/upload", upload.single("image"), analyzeImage);

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});
