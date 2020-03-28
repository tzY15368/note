// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, Tray} = require('electron')
const path = require('path')
let tray = null;
function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  let trayMenuTemplate = [
    {
      label:'显示主界面',
      click: function(){mainWindow.show();mainWindow.focus()}//,
      //click: function(){if (BrowserWindow.getAllWindows().length === 0) createWindow()}
    },
    {
      label:'退出',
      click: function () {
        tray.destroy();
        app.quit();
      }
    }
  ];
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  tray.setContextMenu(contextMenu);
  //let appTray = new Tray('./note_favicon.ico');
  //const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  //appTray.setToolTip('Notes');
  //appTray.setContextMenu(contextMenu);
  //appTray.on("double-click",()=>{mainWindow.show();mainWindow.focus()});
  // and load the index.html of the app.
  //mainWindow.loadFile('index.html');

  mainWindow.loadURL(`https://www.dutbit.com/note/index.html#/main/front`)
  mainWindow.on("close",(e)=>{
    e.preventDefault();
    mainWindow.hide()
  });
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  tray.on("double-click",()=>{mainWindow.show();mainWindow.focus()});

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)
app.on('ready', () => {
  tray = new Tray(path.join(__dirname, 'note_favicon.ico'));

  tray.setToolTip('This is my application.');


});
// Quit when all windows are closed.
app.on('window-all-closed', function (e) {
  console.log('all closed')
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  //if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
