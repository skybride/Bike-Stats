import { Request, Response } from "express";
import fs from "fs";
import { predictWithClarifaiBase64 } from "../utils/clarifaiClient";

export const analyzeImage = async (
	req: Request,
	res: Response
): Promise<void> => {
	const file = req.file;

	if (!file) {
		res.status(400).json({ error: "No image uploaded." });
		return;
	}

	try {
		const base64Image = fs.readFileSync(file.path, { encoding: "base64" });

		const predictions = await predictWithClarifaiBase64({
			base64: base64Image,
			userId: process.env.CLARIFAI_USER_ID!,
			appId: process.env.CLARIFAI_APP_ID!,
			workflowId: process.env.CLARIFAI_WORKFLOW_ID!,
			apiKey: process.env.CLARIFAI_API_KEY!,
		});

		res.json(predictions);
	} catch (err) {
		console.error("Prediction error:", err);
		res.status(500).json({ error: "Failed to analyze image." });
	}
};
