export const gameState = {
  // Core metrics
  trust: 50,
  truth: 0,
  pressure: 0,

  // Emotional state
  emotion: "calm", // calm | nervous | angry | afraid | happy | sad

  // Narrative position
  currentNode: null,

  // Investigation
  evidences: new Set(),
  currentStatement: null, 

  // Meta
  caseId: null,
};
