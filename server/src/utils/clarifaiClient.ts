import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const CLARIFAI_API_KEY = process.env.CLARIFAI_API_KEY!;
const USER_ID = process.env.CLARIFAI_USER_ID!;
const APP_ID = process.env.CLARIFAI_APP_ID!;
const WORKFLOW_ID = process.env.CLARIFAI_WORKFLOW_ID!;

export async function predictWithClarifaiBase64({
	base64,
	userId,
	appId,
	workflowId,
	apiKey,
}: {
	base64: string;
	userId: string;
	appId: string;
	workflowId: string;
	apiKey: string;
}) {
	try {
		const response = await axios.post(
			`https://api.clarifai.com/v2/workflows/${workflowId}/results`,
			{
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
					Authorization: `Key ${apiKey}`,
					"Content-Type": "application/json",
				},
			}
		);

		const outputs = response.data.results?.[0]?.outputs ?? [];
		const classifierOutput = outputs.find((o: any) => o.data?.concepts);

		if (!classifierOutput) return [];

		const concepts = classifierOutput.data.concepts;

		return concepts.map((c: any) => ({
			label: c.name,
			score: c.value,
		}));
	} catch (error: any) {
		console.error("Clarifai API error:", error.response?.data || error.message);
		throw new Error("Failed to get prediction from Clarifai");
	}
}
