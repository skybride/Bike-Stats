// server/src/controllers/imageController.ts
import { Request, Response } from "express";
import fs from "fs";
import { predictWithClarifaiBase64 } from "../utils/clarifaiClient";

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
		const imageBuffer = fs.readFileSync(image.path);
		const base64Image = imageBuffer.toString("base64");

		const clarifaiResponse = await predictWithClarifaiBase64(base64Image);

		const predictions =
			clarifaiResponse.data.outputs?.[0]?.data?.concepts?.slice(0, 3) || [];

		fs.unlinkSync(image.path);
		res.json(predictions);
	} catch (err: any) {
		if (err.response) {
			console.error("API error status:", err.response.status);
			console.error("error data:", err.response.data);
			res.status(err.response.status).json(err.response.data);
		} else {
			console.error("Error:", err.message);
			res.status(500).json({ error: "Failed to analyze image" });
		}
	}
};
