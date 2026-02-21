import { gameState } from "../core/state.js";

export function evaluateEmotion() {
  const p = gameState.pressure;

  if (p >= 80) gameState.emotion = "angry";
  else if (p >= 60) gameState.emotion = "afraid";
  else if (p >= 40) gameState.emotion = "nervous";
  else if (p >= 20) gameState.emotion = "anxious";
  else if (gameState.trust >= 80) gameState.emotion = "happy";
  else gameState.emotion = "calm";
}
