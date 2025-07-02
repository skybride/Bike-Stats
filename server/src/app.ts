import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import uploadRoute from "./routes/upload";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api", uploadRoute);

app.get("/", (_req, res) => {
	res.send("Bike AI backend is running!");
});

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
