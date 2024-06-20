const path = require('path');
const { app, BrowserWindow } = require('electron');

if (process.env.NODE_ENV === 'development') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    awaitWriteFinish: true,
  });
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL('http://localhost:3000'); // Adjust as needed

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

function startBackend() {
  const { exec } = require('child_process');
  exec('node ./backend/index.js', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error starting backend: ${err}`);
      return;
    }
    console.log(`Backend stdout: ${stdout}`);
    console.error(`Backend stderr: ${stderr}`);
    createWindow();  // Create window after backend is ready
  });
}

app.whenReady().then(startBackend);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});