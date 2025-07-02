import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const analyzeImage = async (req: Request, res: Response) => {
	const image = req.file;

	if (!image) {
		return res.status(400).json({ error: "No image uploaded" });
	}

	// You will replace this with real AI model logic
	const dummyPrediction = {
		year: "2021",
		model: "Trek Domane",
		groupset: "Shimano Ultegra",
	};

	// Delete temp file (cleanup)
	fs.unlinkSync(path.resolve(image.path));

	return res.json(dummyPrediction);
};
