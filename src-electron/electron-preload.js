const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    // Existing window control methods
    minimize: () => ipcRenderer.send('minimize-window'),
    close: () => ipcRenderer.send('close-window'),
    
    // Method to save plans
    savePlans: (plans) => ipcRenderer.send('save-plans', plans),
    
    // Setup listener for loading plans
    onPlansLoaded: (callback) => {
        // Remove any existing listener to avoid duplicates
        ipcRenderer.removeAllListeners('load-plans');
        ipcRenderer.on('load-plans', (event, plans) => {
            callback(plans);
        });
    },
});
