import { renderCaseBook } from "./ui/renderBook.js";
import { pickRandomCase } from "./utils/randomCases.js";
import { loadDialog, setEndingCallback } from "./core/dialogEngine.js";

let currentCase = null;

function showScene(id) {
  document.querySelectorAll(".scene").forEach((scene) => {
    scene.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

function showEnding(endingNode) {
  const isGuilty = endingNode.result === "guilty";
  document.getElementById("ending-title").textContent = isGuilty 
    ? "Tersangka Bersalah" 
    : "Tersangka Tidak Bersalah";
  document.getElementById("ending-text").textContent = endingNode.text;
  showScene("scene-ending");
}

// Setup ending callback
setEndingCallback(showEnding);

document.getElementById("playBtn").onclick = async () => {
  currentCase = await pickRandomCase();
  renderCaseBook(currentCase);
  showScene("scene-book");
};

document.getElementById("startInterrogation").onclick = async () => {
  await loadDialog(currentCase.dialogFile);
  showScene("scene-interrogation");
};

document.getElementById("restartBtn").onclick = () => {
  showScene("scene-menu");
};
