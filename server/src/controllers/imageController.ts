import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import axios from "axios";
import mime from "mime-types"; // npm install mime-types
import dotenv from "dotenv";

dotenv.config();

export const analyzeImage = async (
	req: Request,
	res: Response
): Promise<void> => {
	const image = req.file;

	if (!image) {
		res.status(400).json({ error: "No image uploaded" });
		return;
	}

	try {
		// Read the file buffer
		const imageBuffer = fs.readFileSync(image.path);

		// Determine mime type based on file extension
		const mimeType = mime.lookup(image.path) || "application/octet-stream";

		const hfResponse = await axios.post(
			"https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
			imageBuffer,
			{
				headers: {
					Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
					"Content-Type": mimeType,
				},
			}
		);

		fs.unlinkSync(image.path); // clean up

		res.json(hfResponse.data.slice(0, 2));
	} catch (err: any) {
		if (err.response) {
			console.error("Hugging Face API error status:", err.response.status);
			console.error("Hugging Face API error data:", err.response.data);
		} else {
			console.error("Error:", err.message);
		}
		res.status(500).json({ error: "Failed to analyze image" });
	}
};
