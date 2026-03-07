import { startGame, initGame, resetGameState } from "../main.js";
import { pickRandomCase } from "../utils/randomCases.js";
import {
  showScene,
  sceneLoading,
  sceneStart,
  sceneBook,
  sceneInterrogation,
} from "../utils/showScene.js";
import { renderCaseBook } from "./renderBook.js";

window.addEventListener("DOMContentLoaded", () => {
  const startGameBtn = document.getElementById("btn-start-game");
  const backToStartBtn = document.getElementById("btn-back-to-start");
  const startInterrogationBtn = document.getElementById("startInterrogation");

  // Loading screen
  showScene(sceneLoading);

  // setTimeout(() => {
  //   showScene(sceneStart);
  // }, 1000);

  // Start game
  if (startGameBtn) {
    startGameBtn.addEventListener("click", () => {
      resetGameState();

      const caseData = pickRandomCase();

      initGame(caseData);
      renderCaseBook(caseData);

      showScene(sceneBook);
    });
  }

  // Start interrogation
  if (startInterrogationBtn) {
    startInterrogationBtn.addEventListener("click", () => {
      showScene(sceneInterrogation);
      startGame();
    });
  }

  // Back to menu
  if (backToStartBtn) {
    backToStartBtn.addEventListener("click", () => {
      resetGameState();
      showScene(sceneStart);
    });
  }
});
