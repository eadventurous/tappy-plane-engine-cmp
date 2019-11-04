# 2D Web Game Engines Comparison

This repository is a collection of several examples of implementation of a **Flappy bird-like** **Tappy Plane** game. 

The purpose of the project is to compare features, performance and build sizes of popular *2D Web Game Engines* and the main focus is on the limitations imposed by [Facebook Instant Games](https://developers.facebook.com/docs/games/instant-games/) and [Lightweight Games](https://developers.facebook.com/docs/games/instant-games/guides/lightweight/).

## Detailed Comparison

[Comparison Table](https://docs.google.com/spreadsheets/d/1W30FdImkqsa17l4YUpKwYhSRcAETv9_xxv08b0LFRGY/edit?usp=sharing)

## How to run examples

1. Clone the repository to your local machine 
```bash
$ git clone https://github.com/eadventurous/tappy-plane-engine-cmp.git
```
2. (Optional) For these engines ([GDevelop](https://gdevelop-app.com/download/), ...) you have to download the engine and build the example first. Open the project from the corresponding engine UI and build the project for web to the `Build` folder of the project directory.

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

## Special Thanks
To Kenney.nl for [Tappy Plane Assets](https://www.kenney.nl/assets/tappy-plane)