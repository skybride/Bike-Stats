import express from "express";
import cors from "cors";
import uploadRoute from "./routes/upload";
import path from "path";

const app = express();

app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));
app.use(express.json());

app.use("/api", uploadRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
