import { BALANCE } from "./balance.js";
import { gameState } from "./state.js";

const dialogEl = document.getElementById("dialogText");
const optionsEl = document.getElementById("options");
const actionsEl = document.getElementById("actions");

function clearUI() {
  optionsEl.innerHTML = "";
  actionsEl.innerHTML = "";
}

export function goToNode(id, dialogData) {
  clearUI();
  const node = dialogData.data[id];
  gameState.node = id;
  // console.log("Navigating to node:", id);
  // console.log("Dialog data:", dialogData);

  // console.log("Node data:", node);
  // console.log("Node type:", node.type);

  // console.log(node);

  if (node.type === "story" || node.type === "dialog") {
    dialogEl.textContent = node.text;

    const nextButton = document.createElement("button");
    nextButton.textContent = "Lanjut";
    nextButton.classList.add("next-btn");
    nextButton.onclick = () => goToNode(node.next, dialogData);
    optionsEl.appendChild(nextButton);
  }

  if (node.type === "option") {
    dialogEl.textContent = node.text;
    node.choices.forEach((choice) => {
      const optionButton = document.createElement("button");
      optionButton.textContent = choice.text;
      optionButton.classList.add("option-btn");
      optionButton.onclick = () => {
        goToNode(choice.next, dialogData);
        performEffect(choice.effect);
      };
      optionsEl.appendChild(optionButton);
    });
  }

  if (node.type === "action") {
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
    dialogEl.textContent = node.text;
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
    if (effects.trust) gameState.trust += effects.trust;
    if (effects.truth) gameState.truth += effects.truth;
    if (effects.pressure) gameState.pressure += effects.pressure;
  }
}

function performEffect(effect) {
  if (effect.trust) gameState.trust += effect.trust;
  if (effect.truth) gameState.truth += effect.truth;
  if (effect.pressure) gameState.pressure += effect.pressure;
}

function resolveEnding() {
  if (gameState.truth >= 25 && gameState.trust >= 50) {
    dialogEl.textContent =
      "Kamu menemukan portal dimensi rahasia di basement rumah 1A. Bu Sari ternyata adalah ilmuwan yang kabur karena eksperimennya lepas kendali. Kasus terpecahkan!";
  } else if (gameState.truth >= 25 && gameState.trust < 40) {
    dialogEl.textContent =
      "Portal meledak dan menelanmu ke dimensi lain. GAME OVER.";
  } else {
    dialogEl.textContent =
      "Rumah 1A diratakan dengan tanah. Misteri selamanya terkubur.";
  }

  optionsEl.innerHTML = `
    <p>Trust: ${gameState.trust}</p>
    <p>Truth: ${gameState.truth}</p>
    <p>Pressure: ${gameState.pressure}</p>
  `;
}
