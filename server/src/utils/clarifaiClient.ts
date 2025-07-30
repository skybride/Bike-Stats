import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const CLARIFAI_API_KEY = process.env.CLARIFAI_API_KEY!;
const USER_ID = process.env.CLARIFAI_USER_ID!;
const APP_ID = process.env.CLARIFAI_APP_ID!;
const WORKFLOW_ID = process.env.CLARIFAI_WORKFLOW_ID!;

export async function predictWithClarifaiBase64(base64: string) {
	return axios.post(
		`https://api.clarifai.com/v2/workflows/${WORKFLOW_ID}/results`,
		{
			user_app_id: {
				user_id: USER_ID,
				app_id: APP_ID,
			},
			inputs: [
				{
					data: {
						image: {
							base64,
						},
					},
				},
			],
		},
		{
			headers: {
				Authorization: `Key ${CLARIFAI_API_KEY}`,
				"Content-Type": "application/json",
			},
		}
	);
}
