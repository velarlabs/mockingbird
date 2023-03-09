import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/api", (req, res) => {
	const data = {
		message: "Hello from the server!",
	};
	res.json(data);
});

const port = 3005;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
