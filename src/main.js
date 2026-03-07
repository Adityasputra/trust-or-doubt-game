import { goToNode, setOnGameFinish } from "./core/engine.js";
import { gameState } from "./core/state.js";
import { resetStatementSystem } from "./systems/statement.js";
import { resetEvidenceSystem } from "./systems/evidence.js";
import { showScene, sceneEnding } from "./utils/showScene.js";

import "./ui/event.js";

let caseData = null;
let startNodeKey = null;

export function initGame(loadedCaseData) {
  caseData = loadedCaseData;
  startNodeKey = caseData.data.startNode;
  console.log("Case loaded:", caseData.id, caseData.title);
  console.log("Start node:", startNodeKey);
}

export function startGame() {
  if (startNodeKey && caseData && caseData.data.nodes[startNodeKey]) {
    goToNode(startNodeKey, caseData);
  } else {
    console.error("Node awal tidak ditemukan!", startNodeKey);
  }
}

setOnGameFinish(() => {
  showEndingScreen();
});

function showEndingScreen() {
  const credits = document.getElementById("ending-credits");

  credits.innerHTML = `
    Game: Trust or Doubt<br>
    Created by: Aditya Saputra<br>
    Programming & Design: Aditya Saputra<br>
    Assets: Aditya Saputra<br>
    Music / SFX: Aditya Saputra<br>
  `;

  showScene(sceneEnding);
}

export function resetGameState() {
  gameState.trust = 50;
  gameState.truth = 0;
  gameState.pressure = 0;
  gameState.emotion = "calm";
  gameState.currentNode = null;
  gameState.caseId = null;
  resetStatementSystem();
  resetEvidenceSystem();
}
