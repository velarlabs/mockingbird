import express from "express";
import cors from "cors";
import Store from "electron-store";

const app = express();

app.use(cors());

export const store = new Store();

const router = express.Router();

type AddRouteArgs = {
	prevEndpoint?: string;
	endpoint: string;
	method: string;
	mockResponse: any;
	status: number;
};

export const addAndSaveRoute = (config: AddRouteArgs) => {
	addRoute(config);
	const existingRoutes: any = store.get("routes") ?? [];
	store.set("routes", [...existingRoutes, config]);
};

export const addRoute = ({
	prevEndpoint,
	endpoint,
	method,
	mockResponse,
	status,
}: AddRouteArgs) => {
	const routeBody = (req: any, res: any) => {
		res.status(status).json(mockResponse);
	};

	router.stack = router.stack.filter(
		(i) => i.route.path !== endpoint && i.route.path !== prevEndpoint
	);

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
	}
};

<<<<<<< Updated upstream
export const deleteRoute = ({
	endpoint
}: {
	endpoint: string;
}) => {
	router.stack = router.stack.filter(
		(i) => i.route.path !== endpoint
	);

};

app.use((req, res, next) => {
	router(req, res, next);
});
=======
const initializeRoutes = () => {
	const existingRoutes: any = store.get("routes") ?? [];
	existingRoutes.forEach((route: AddRouteArgs) => addRoute(route));
};

initializeRoutes();
app.use(router);
>>>>>>> Stashed changes

const port = 3005;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
