import { app, BrowserWindow } from "electron";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
	app.quit();
}

const createWindow = (): void => {
	const mainWindow = new BrowserWindow({
		webPreferences: {
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	});

	mainWindow.maximize();

	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

app.on("ready", () => {
	createWindow();
	require("./server.ts");
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
