import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();

export const analyzeImage = async (req: Request, res: Response) => {
	const image = req.file;

	if (!image) {
		return res.status(400).json({ error: "No image uploaded" });
	}

    try {
        const form = new FormData();
        form.append("file", fs.createReadStream(image.path));

        const hfResponse = await axios.post(
            "https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
            form,
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    ...form.getHeaders(),
                },
            }
        );
    

    const predictions = hfResponse.data;

	fs.unlinkSync(path.resolve(image.path));

    res.json(predictions.slice(0,2));

} catch (err: any) {
    console.error("AI prediction error:", err.message);
    res.status(500).json({ error: "Failed to analyze image" });
}
