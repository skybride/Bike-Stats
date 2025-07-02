import express from "express";
import multer from "multer";
import { analyzeImage } from "../controllers/imageController";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Save images temporarily

router.post("/upload", upload.single("image"), analyzeImage);

export default router;
