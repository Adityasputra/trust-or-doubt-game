import { evaluateEmotion } from "../systems/emotion.js";
import { BALANCE } from "./balance.js";
import { gameState } from "./state.js";

const dialogEl = document.getElementById("dialogText");
const optionsEl = document.getElementById("options");
const actionsEl = document.getElementById("actions");
const emotionEl = document.getElementById("emotion");

function updateEmotionDisplay() {
  emotionEl.textContent = `Trust: ${gameState.trust} | Truth: ${gameState.truth} | Pressure: ${gameState.pressure} | Emosi: ${gameState.emotion}`;
}
function clampValue(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}
function clearUI() {
  optionsEl.innerHTML = "";
  actionsEl.innerHTML = "";
}

export function goToNode(id, dialogData) {
  clearUI();
  const node = dialogData.data[id];
  gameState.node = id;

  if (node.type === "story" || node.type === "dialog") {
    const displayText =
      typeof node.text === "function" ? node.text() : node.text;
    
    if (node.speaker) {
      dialogEl.innerHTML = `<strong style="color: #4a9eff;">${node.speaker}:</strong><br>${displayText}`;
    } else {
      dialogEl.textContent = displayText;
    }
    
    updateEmotionDisplay();

    const nextButton = document.createElement("button");
    nextButton.textContent = "Lanjut";
    nextButton.classList.add("next-btn");
    nextButton.onclick = () => goToNode(node.next, dialogData);
    optionsEl.appendChild(nextButton);
  }

  if (node.type === "option") {
    const displayText =
      typeof node.text === "function" ? node.text() : node.text;
    dialogEl.textContent = displayText;
    updateEmotionDisplay();
    node.choices.forEach((choice) => {
      const optionButton = document.createElement("button");
      optionButton.textContent = choice.text;
      optionButton.classList.add("option-btn");
      optionButton.onclick = () => {
        performEffect(choice.effect);
        goToNode(choice.next, dialogData);
      };
      optionsEl.appendChild(optionButton);
    });
  }

  if (node.type === "action") {
    updateEmotionDisplay();
    node.actions.forEach((action) => {
      const actionButton = document.createElement("button");
      actionButton.textContent = action;
      actionButton.classList.add("action-btn");
      actionButton.onclick = () => {
        performAction(action);
        goToNode(node.result[action], dialogData);
      };
      actionsEl.appendChild(actionButton);
    });
  }

  if (node.type === "ending") {
    resolveEnding();
  }
}

function performAction(action) {
  const actionMap = {
    percaya: "accept",
    ragu: "doubt",
    tanya: "question",
  };

  const mappedAction = actionMap[action];

  if (mappedAction && BALANCE.ACTIONS[mappedAction]) {
    const effects = BALANCE.ACTIONS[mappedAction];

    if (effects.trust)
      gameState.trust = clampValue(gameState.trust + effects.trust);
    if (effects.truth)
      gameState.truth = clampValue(gameState.truth + effects.truth);
    if (effects.pressure)
      gameState.pressure = clampValue(gameState.pressure + effects.pressure);

    evaluateEmotion();
  }
}

function performEffect(effect) {
  if (!effect) return;

  if (effect.trust)
    gameState.trust = clampValue(gameState.trust + effect.trust);
  if (effect.truth)
    gameState.truth = clampValue(gameState.truth + effect.truth);
  if (effect.pressure)
    gameState.pressure = clampValue(gameState.pressure + effect.pressure);

  evaluateEmotion();
}

function resolveEnding() {
  const endingText =
    typeof gameState.node.text === "function"
      ? gameState.node.text()
      : gameState.node.text;
  dialogEl.textContent = endingText;
  updateEmotionDisplay();

  optionsEl.innerHTML = `
    <p>Trust: ${gameState.trust}</p>
    <p>Truth: ${gameState.truth}</p>
    <p>Pressure: ${gameState.pressure}</p>
    <p>Emosi: ${gameState.emotion}</p>
  `;
}
