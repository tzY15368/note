# built with the electron scaffold
## basic implementation of system tray
# Reference:
[Electron docs](https://www.electronjs.org/docs/tutorial/first-app#installing-electron)
## Clone Repo
`$ git clone https://github.com/electron/electron-quick-start`
## Change Directory
`$ cd electron-quick-start`
## Install dependencies
`$ npm install`
## RUN APP
`$ npm start`
## Install packaging tools
`npm install electron-packager -g`
## Packaging
`electron-packager . 'HelloWorld' --platform=win32 --arch=x64 --icon=icon.ico --out=./out --asar --app-version=0.0.1`