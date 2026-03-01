import { gameState } from "../core/state.js";

export function recordStatement(statementId, statementData) {
  gameState.currentStatement = {
    id: statementId,
    speaker: statementData.speaker,
    text: statementData.text,
    tags: statementData.tags || [],
    timestamp: Date.now(),
  };

  console.log(
    `[Statement] Recorded: ${statementId} from ${statementData.speaker}`,
  );
}

export function getCurrentStatement() {
  return gameState.currentStatement;
}

export function clearCurrentStatement() {
  gameState.currentStatement = null;
}

export function resetStatementSystem() {
  gameState.currentStatement = null;
}
