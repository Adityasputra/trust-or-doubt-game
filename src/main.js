import { goToNode } from "./core/engine.js";
// import { renderCaseBook } from "./ui/renderBook.js";
import { pickRandomCase } from "./utils/randomCases.js";

const caseData = pickRandomCase();
console.log("Case Data:", caseData);
// renderCaseBook(caseData);

const startNodeKey = Object.keys(caseData.data).find(key => key.startsWith("start_"));
console.log("Start Node Key:", startNodeKey);

if (startNodeKey) {
  console.log("Memulai game dengan node:", startNodeKey);
  goToNode(startNodeKey, caseData);
} else {
  console.error("Node awal tidak ditemukan!");
}