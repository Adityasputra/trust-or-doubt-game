import { gameState } from "../core/state.js";

export function evaluateEmotion() {
  const p = gameState.pressure;
  const t = gameState.trust;

  console.log("Evaluating emotion - Pressure:", p, "Trust:", t);

  if (p >= 60) gameState.emotion = "angry";
  else if (p >= 40) gameState.emotion = "afraid";
  else if (p >= 20) gameState.emotion = "nervous";
  else if (p >= 10) gameState.emotion = "anxious";
  else if (t >= 70) gameState.emotion = "happy";
  else if (t <= 20) gameState.emotion = "sad";
  else gameState.emotion = "calm";

  console.log("New emotion:", gameState.emotion);
}
