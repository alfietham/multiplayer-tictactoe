# Multiplayer Tic-Tac-Toe

## Notes

- React and Typescript Frontend

- NodeJS Backend

- WebSockets for comm

## Quick Start

Install webpack
- `npm install -g webpack webpack-cli`

### Develop

- `npm install`
- `npm run dev-app`
- `npm run dev-server`
- Go to `localhost:3000`

### Build and run locally

- `npm run build-all`
- run built server: `npm start`

### Deploy to GCP

- `npm run deploy`

### Deploy manually to a server

- Copy `dist/`, `package.json`, and `package-lock.json` to target server
- `npm install`
- `npm start`

## Reference

Tic-tac-toe inspired by the intro to React tutorial: https://reactjs.org/tutorial/tutorial.html

## To-do list

### Next release
- Complete endgame MP WS handling (rematch)
- Handle 'other player left' in Game screen

### Future
- Game handling in an Elixir app
- Separate, more robust memory storage for game states (e.g. Redis)
