import { app, BrowserWindow, Menu } from "electron";
import path from "path";
import os from "os";

const { ipcMain } = require('electron');

ipcMain.on('minimize-window', (event) => {
    mainWindow.minimize();
});

ipcMain.on('close-window', (event) => {
    mainWindow.close();
});


const platform = process.platform || os.platform();

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        // icon: path.resolve(__dirname, "icons/icon.png"),
        width: 400,
        height: 300,
        useContentSize: true,
        x: 100,
        y: 50,
        transparent: true,
        frame: false,
        resizable: false,
        webPreferences: {
            contextIsolation: true,
            backgroundThrottling: false,
            preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
        },
    });
    

    mainWindow.loadURL(process.env.APP_URL);
    mainWindow.setMenu(null);
    mainWindow.setAlwaysOnTop(true, "normal");
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});