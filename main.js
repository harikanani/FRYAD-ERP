const { app, BrowserWindow, Menu, ipcMain, screen } = require("electron");
const electron = require("electron");
const url = require("url");
const path = require("path");

let mainWindow;

const createMainWindow = () => {
	mainWindow = new BrowserWindow({
		title: "Fryad ERP",
		width: 670,
		height: 640,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: true,
			// preload: path.join(__dirname, "./preload.js"),
		},
	});

	//custom menu bar
	const menu = Menu.buildFromTemplate(MenuTemplate);
	Menu.setApplicationMenu(menu);

	mainWindow.openDevTools();

	// mainWindow.loadURL(path.join(__dirname, "build/index.html"));
	mainWindow.loadURL("http://localhost:3000");
	// Load the index.html of the app from build folder
	const indexPath = path.join(__dirname, "build", "index.html");
	// mainWindow.loadURL(
	// 	url.format({
	// 		pathname: indexPath,
	// 		protocol: "file:",
	// 		slashes: true,
	// 	}),
	// );
};

app.whenReady().then(async () => {
	try {
		createMainWindow();
	} catch (error) {
		console.error(error);
		app.quit();
	}
});

const MenuTemplate = [
	{
		label: "File",
		submenu: [
			{
				label: "Quit",
				click: app.quit,
				accelerator: "CmdOrCtrl+W",
			},
		],
	},
	{
		label: "Option",
		submenu: [
			{
				label: "Open DevTools",
				click: () => mainWindow.openDevTools(),
			},
			{
				label: "Close DevTools",
				click: () => mainWindow.closeDevTools(),
			},
		],
	},
];
