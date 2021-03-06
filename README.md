# 2D Web Game Engines Comparison

This repository is a collection of several examples of implementation of a **Flappy bird-like** **Tappy Plane** game. 

The purpose of the project is to compare features, performance and build sizes of popular *2D Web Game Engines* and the main focus is on the limitations imposed by [Facebook Instant Games](https://developers.facebook.com/docs/games/instant-games/) and [Lightweight Games](https://developers.facebook.com/docs/games/instant-games/guides/lightweight/).

## Detailed Comparison

[Comparison Table](https://docs.google.com/spreadsheets/d/1W30FdImkqsa17l4YUpKwYhSRcAETv9_xxv08b0LFRGY/edit?usp=sharing)

[Comments on engines](https://docs.google.com/document/d/1c_0vt13B78yYAp2FsCcT8ybn3gK0bErY7afc3zGzUNQ/edit?usp=sharing)

## How to run examples

### Dependencies

To run these examples you should have **npm** (Node.js Package Manager) installed.

### Guide

1. Clone the repository to your local machine 
```bash
$ git clone https://github.com/eadventurous/tappy-plane-engine-cmp.git
```
2. **Additional steps for some engines** 

For [GDevelop](https://gdevelop-app.com/download/) you have to download the engine and build the example first. Open the project from the corresponding engine UI and build the project for web to the `Build` folder of the project directory.

For **MelonJS** run `npm install` in the MelonJS project folder. Then install *grunt* globally and run it in the MelonJS project forlder from the terminal.

For **LayaBox** download [LayaAir IDE](https://ldc2.layabox.com/layadownload/?language=en&type=layaairide-LayaAir%20IDE%202.3.0beta). Open the `LayaBox` folder with it and build the project for web.

For **Phaser** navigate to the phaser directory. Run `npm install` in the console and build with `npm run-script build`.

3. Navigate to the cloned repository folder
```bash
$ cd tappy-plane-engine-cmp
```
4. Install an http server (if you don't have one installed). You can use [live-server](https://www.npmjs.com/package/live-server) for example. To install it:
```bash
$ npm install -g live-server
```
5. Start an http server in the project folder. For **live server**:
```bash
$ live-server
```
6. Open the url corresponding to the example of the engine you would like to try. *Note, for some of the engines you might have to download the engine and build the example first.* 

Example urls: 

- **CreateJS** `http://127.0.0.1:8080/CreateJS/`
- **GDevelop** `http://127.0.0.1:8080/GDevelop/Build/`
- **MelonJS** `http://127.0.0.1:8080/MelonJS/build/`
- **PixiJS** `http://127.0.0.1:8080/PixiJS/`
- **LayaBox** `http://127.0.0.1:8080/LayaBox/release/web/`
- **Phaser** `http://127.0.0.1:8080/Phaser/`

## Special Thanks
To Kenney.nl for [Tappy Plane Assets](https://www.kenney.nl/assets/tappy-plane)
