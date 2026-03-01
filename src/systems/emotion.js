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

export function getEmotionModifier() {
  switch (gameState.emotion) {
    case "angry":
      return { trust: -10, pressure: +15 };
    case "afraid":
      return { trust: -5, pressure: +10 };
    case "nervous":
      return { trust: -3, pressure: +5 };
    case "anxious":
      return { trust: -2, pressure: +3 };
    case "happy":
      return { trust: +5, pressure: -5 };
    case "sad":
      return { trust: -5, pressure: +5 };
    default:
      return { trust: 0, pressure: 0 };
  }
}
