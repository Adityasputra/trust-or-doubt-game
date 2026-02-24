import { goToNode } from "./core/engine.js";
import { gameState } from "./core/state.js";
import { renderCaseBook } from "./ui/renderBook.js";
import { pickRandomCase } from "./utils/randomCases.js";

// DOM Elements
const sceneBook = document.getElementById("scene-book");
const sceneInterrogation = document.getElementById("scene-interrogation");
const startBtn = document.getElementById("startInterrogation");

// Initialize game
const caseData = pickRandomCase();
console.log("Case loaded:", caseData.id, caseData.title);
renderCaseBook(caseData);

const startNodeKey = Object.keys(caseData.data).find((key) =>
  key.startsWith("start_"),
);
console.log("Start node:", startNodeKey);

// Event Listeners
startBtn.addEventListener("click", () => {
  console.log("Starting investigation for:", caseData.title);
  sceneBook.style.display = "none";
  sceneInterrogation.style.display = "block";
  startGame();
});

// Functions
function startGame() {
  if (startNodeKey) {
    goToNode(startNodeKey, caseData);
  } else {
    console.error("Node awal tidak ditemukan!");
  }
}

export function resetGameState() {
  gameState.trust = 50;
  gameState.truth = 0;
  gameState.pressure = 0;
  gameState.emotion = "calm";
}
