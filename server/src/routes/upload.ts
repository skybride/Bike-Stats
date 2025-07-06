import { Router } from "express";
import { upload } from "../middleware/upload";
import { analyzeImage } from "../controllers/imageController";

const router = Router();

router.post("/upload", upload.single("image"), analyzeImage);

export default router;
