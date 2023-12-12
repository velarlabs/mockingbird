import { app, BrowserWindow, ipcMain } from "electron";
import { addRoute, deleteRoute } from "./server";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
	app.quit();
}

const createWindow = (): void => {
	const mainWindow = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	});

	mainWindow.maximize();

	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

app.on("ready", () => {
	createWindow();

	// Listening to create endpoint & calling addRoute
	ipcMain.handle('create-endpoint', async (event, arg) => {
		addRoute({
			prevEndpoint: arg.prevEndpoint || "",
			endpoint: arg.endpoint,
			method: arg.method,
			mockResponse: arg.mockResponse,
			status: arg.status
		})
		return { msg: "Successfully created an endpoint: " + arg.endpoint };
	})

	// Listening to delete endpoint & calling deleteRoute
	ipcMain.handle('delete-endpoint', async (event, arg) => {
		deleteRoute({
			endpoint: arg.endpoint
		})
		return { msg: "Successfully deleted an endpoint: " + arg.endpoint };
	})
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
