import { goToNode } from "./core/engine.js";
// import { renderCaseBook } from "./ui/renderBook.js";
import { pickRandomCase } from "./utils/randomCases.js";

const caseData = pickRandomCase();
// renderCaseBook(caseData);

const startNodeKey = Object.keys(caseData.data).find(key => key.startsWith("start_"));

if (startNodeKey) {
  goToNode(startNodeKey, caseData);
} else {
  console.error("Node awal tidak ditemukan!");
}