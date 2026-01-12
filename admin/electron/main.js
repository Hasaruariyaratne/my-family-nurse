const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        title: "Visiting Nurse Admin",
        icon: path.join(__dirname, 'assets/icon.png'), // We will need an icon
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // In production, load the built index.html
    // In development, load the vite localhost URL
    const isDev = !app.isPackaged;

    if (isDev) {
        mainWindow.loadURL('http://localhost:3002');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
