import { cases } from "../../data/cases.js";

export function pickRandomCase() {
  const index = Math.floor(Math.random() * cases.length);
  return cases[index];
}