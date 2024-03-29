import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import os from "os";
import Store from 'electron-store'; // Import electron-store

// Initialize electron-store
const store = new Store();

// Define global reference to mainWindow to prevent garbage collection
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 300,
        useContentSize: true,
        x: 100,
        y: 50,
        transparent: true,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            backgroundThrottling: false,
            preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
        },
    });

    mainWindow.loadURL(process.env.APP_URL);
    mainWindow.setMenu(null);
    mainWindow.setAlwaysOnTop(true, "normal");

    if (process.env.DEBUGGING) {
        // if on DEV or Production with debug enabled
        mainWindow.webContents.openDevTools();
    } else {
        // we're on production; no access to devtools pls
        mainWindow.webContents.on("devtools-opened", () => {
            mainWindow.webContents.closeDevTools();
        });
    }

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    // Send plans to renderer after window is ready
    mainWindow.webContents.on('did-finish-load', () => {
        const plans = store.get('plans', []); // Load plans from store, defaulting to an empty array
        mainWindow.webContents.send('load-plans', plans);
    });
}


// IPC events for window control
ipcMain.on('minimize-window', (event) => {
    mainWindow.minimize();
});

ipcMain.on('close-window', (event) => {
    mainWindow.close();
});

// IPC event for saving plans
ipcMain.on('save-plans', (event, plans) => {
    store.set('plans', plans); // Save plans to store
});

const platform = process.platform || os.platform();

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
