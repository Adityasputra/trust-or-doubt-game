import { renderCaseBook } from "./ui/renderBook.js";
import { pickRandomCase } from "./utils/randomCases.js";

const caseData = pickRandomCase();
console.log("Selected case:", caseData);
renderCaseBook(caseData);
