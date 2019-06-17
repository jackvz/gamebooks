# [Project Aon Gamebooks](https://gamebooks.indecorous.tk/)

Web, desktop and mobile apps for the [1980s game books by Joe Dever](https://www.projectaon.org/en/Main/Home). The app keeps track of players' progress, and saves their statistics and items as they read through the choose-your-own-adventure titles.

## Built with

- [Angular](https://angular.io/)
- [Ionic](https://ionicframework.com/)
- [Electron](https://electronjs.org/)

## Showcase

- [Web](https://gamebooks.indecorous.tk/)
- [iOS](https://appetize.io/app/g9cbzzmjy7vuj4ugtu0z70hxkr)

## Setup

### Install [Node](https://nodejs.org/)

### Install dependencies

```shell
npm install -g cordova
npm install -g ionic
npm install
```

## Run

Development:
```shell
npm run start --livereload
```

Browser:
```shell
ionic cordova run browser
```

iOS:
```shell
ionic cordova run ios
```

Android:
```shell
ionic cordova run android
```

Desktop:
```shell
ionic cordova run electron
```

### Build

#### Browser, iOS and Android:
```shell
ionic cordova build --prod --release browser
ionic cordova build --prod --release ios
ionic cordova build --prod --release android
```

#### Windows, macOS and Linux:
```shell
ionic cordova build --prod --release electron
```

```shell
electron-builder build --mac --project=platforms/electron/www -c.directories.buildResources=resources
electron-builder build --windows project=platforms/electron/www -c.directories.buildResources=resources
electron-builder build --linux project=platforms/electron/www -c.directories.buildResources=resources
```
