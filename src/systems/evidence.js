import { gameState } from "../core/state.js";

export function collectEvidence(evidenceId) {
  gameState.evidences.add(evidenceId);
  console.log(`[Evidence] Collected: ${evidenceId}`);
}

export function hasEvidence(evidenceId) {
  return gameState.evidences.has(evidenceId);
}

export function getCollectedEvidences() {
  return gameState.evidences;
}

export function checkContradiction(caseData) {
  if (!gameState.currentStatement) return null;

  const statementId = gameState.currentStatement.id;
  const collectedEvidences = gameState.evidences;

  for (const evidence of caseData.evidences) {
    if (
      collectedEvidences.has(evidence.id) &&
      evidence.contradicts &&
      evidence.contradicts.includes(statementId)
    ) {
      return {
        evidenceId: evidence.id,
        evidenceName: evidence.name,
        statementId: statementId,
        speaker: gameState.currentStatement.speaker,
      };
    }
  }

  return null;
}

export function getContradictionsForStatement(statementId, caseData) {
  const contradictions = [];

  for (const evidence of caseData.evidences) {
    if (
      gameState.evidences.has(evidence.id) &&
      evidence.contradicts &&
      evidence.contradicts.includes(statementId)
    ) {
      contradictions.push({
        evidenceId: evidence.id,
        evidenceName: evidence.name,
      });
    }
  }

  return contradictions;
}

export function presentEvidence(evidenceId, caseData) {
  if (!gameState.currentStatement) {
    return { success: false, reason: "no_active_statement" };
  }

  if (!gameState.evidences.has(evidenceId)) {
    return { success: false, reason: "evidence_not_collected" };
  }

  const evidence = caseData.evidences.find((e) => e.id === evidenceId);
  if (!evidence) {
    return { success: false, reason: "evidence_not_found" };
  }

  const statementId = gameState.currentStatement.id;
  const isContradiction =
    evidence.contradicts && evidence.contradicts.includes(statementId);

  if (isContradiction) {
    return {
      success: true,
      type: "contradiction_found",
      evidence: evidence,
      statement: gameState.currentStatement,
    };
  } else {
    return {
      success: false,
      reason: "no_contradiction",
      evidence: evidence,
    };
  }
}

export function resetEvidenceSystem() {
  gameState.evidences = new Set();
}
