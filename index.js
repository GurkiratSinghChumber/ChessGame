import { initGame } from "./Data/data.js";

import { initGameRendrer } from "./Rendrer/main.js";

import { globalEvent } from "./Events/global.js";

//is accessible till end
const globalState = initGame();

initGameRendrer(globalState);

let keySquareMapper = {};
globalState.flat().forEach((square) => {
  keySquareMapper[square.id] = square;
});

globalEvent();

export { globalState, keySquareMapper };
