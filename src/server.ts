import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

const router = express.Router();

export const addRoute = ({
	prevEndpoint,
	endpoint,
	method,
	mockResponse,
	status
}: { prevEndpoint?: string, endpoint: string, method: string, mockResponse: any, status: number }) => {

	// Route Body ( mock response )
	const routeBody = (req: any, res: any) => {
		const data = mockResponse;
		res.status(status).json({
			data
		});
	}

	// Since can't delete a route, we need to filter it out
	router.stack = router.stack.filter(i => i.route.path !== endpoint || i.route.path !== prevEndpoint);

	// Different methods
	switch (method) {
		case "GET":
			router.get(endpoint, routeBody);
			break;
		case "POST":
			router.post(endpoint, routeBody);
			break;
		case "PUT":
			router.put(endpoint, routeBody);
			break;
		case "DELETE":
			router.delete(endpoint, routeBody);
			break;
		default:
			break;
	}

}

app.use((req, res, next) => {
	router(req, res, next)
})

const port = 3005;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
1