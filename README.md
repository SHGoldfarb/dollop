# Dollop

PWA made for **IIC3585 - Diseño Avanzado de Aplicaciones Web** in **Pontifica Universidad Católica de Chile**

It can currently (September 24, 2018) be seen working in https://dollop-d2503.firebaseapp.com.

## Local setup

You will need [yarn](https://yarnpkg.com/en/).

Clone the repository into your computer. Cd into the repository folder and install packages with `yarn`. Cd into `public` folder and start the server with `yarn http-server`. The app will be available in `localhost:8080`.

## Deploy

Login into firebase with `yarn firebase login`. Get colaborator permissions from firebase proyect owner (shgoldfarb@uc.cl) and `yarn firebase deploy`.

## Disclaimer

Developed by intially following [this guide](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp), contains code that is not mine, and there is some leftover code that is unused.

It also uses code from [OneSignal](https://onesignal.com) to receive push notifications.