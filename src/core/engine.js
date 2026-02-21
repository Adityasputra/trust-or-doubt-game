import { gameState } from "./state.js";

export function goToNode(id, dialogData) {
  gameState.node = id;
  const node = dialogData[id];

  // renderNode(node);
  // saveGame()
}
