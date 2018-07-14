# Multiplayer Tic-Tac-Toe

## Notes

- React and Typescript Frontend

- NodeJS Backend

- WebSockets for comm

## Try it out!

Demo: http://multiplay-tictactoe.appspot.com/

## Quick Start

### Develop

- `npm install`
- `npm run dev-app`
- `npm run dev-server`
- Go to `localhost:3000`

### Build and run locally

- `npm run build-all`
- run built server: `npm start`

### Deploy manually to a server

Option 1:
- Copy `dist/`, `package.json`, and `package-lock.json` to target VM
- `npm install --production`
- `npm start`

Option 2:
- Clone repo to targer VM
- `npm install`
- `npm start`

## Reference

Tic-tac-toe inspired by the intro to React tutorial: https://reactjs.org/tutorial/tutorial.html

## To-do list

### Micro
- Handle 'other player left' in Game screen
- User aliases and session scoring

### Future
- User accounts and persistent scoring
- Game handling in an Elixir app
- Separate, more robust memory storage for game states (e.g. Redis)
