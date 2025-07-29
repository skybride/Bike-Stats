// src/utils/clarifaiClient.ts
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const CLARIFAI_URL = "https://api.clarifai.com/v2/models";

export async function predictWithClarifaiBase64(imageUrl: string) {
	const { CLARIFAI_PAT, CLARIFAI_USER_ID, CLARIFAI_APP_ID, CLARIFAI_MODEL_ID } =
		process.env;

	const body = {
		user_app_id: {
			user_id: CLARIFAI_USER_ID,
			app_id: CLARIFAI_APP_ID,
		},
		inputs: [
			{
				data: {
					image: {
						url: imageUrl,
					},
				},
			},
		],
	};

	try {
		const response = await axios.post(
			`${CLARIFAI_URL}/${CLARIFAI_MODEL_ID}/outputs`,
			body,
			{
				headers: {
					Authorization: `Key ${CLARIFAI_PAT}`,
					"Content-Type": "application/json",
				},
			}
		);

		return response.data;
	} catch (error: any) {
		console.error("Clarifai API error:", error.response?.data || error.message);
		throw error;
	}
}
