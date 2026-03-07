import { evaluateEmotion, getEmotionModifier } from "../systems/emotion.js";
import {
  recordStatement,
  clearCurrentStatement,
} from "../systems/statement.js";
import {
  checkContradiction,
  collectEvidence,
  hasEvidence,
} from "../systems/evidence.js";
import { BALANCE } from "./balance.js";
import { gameState } from "./state.js";

const dialogEl = document.getElementById("dialogText");
const optionsEl = document.getElementById("options");
const actionsEl = document.getElementById("actions");
const emotionEl = document.getElementById("emotion");

let onGameFinished = null;

function updateEmotionDisplay() {
  emotionEl.textContent = `Trust: ${gameState.trust} | Truth: ${gameState.truth} | Pressure: ${gameState.pressure} | Emosi: ${gameState.emotion}`;
}

function clamp(value, max) {
  return Math.max(0, Math.min(max, value));
}

function clearUI() {
  optionsEl.innerHTML = "";
  actionsEl.innerHTML = "";
}

export function goToNode(id, dialogData) {
  clearUI();
  clearCurrentStatement();
  const node = dialogData.data.nodes[id];
  gameState.currentNode = id;

  if (node.type === "story" || node.type === "dialog") {
    const displayText =
      typeof node.text === "function" ? node.text(gameState) : node.text;

    if (node.speaker) {
      dialogEl.innerHTML = `<strong style="color: #4a9eff;">${node.speaker}:</strong><br>${displayText}`;
    } else {
      dialogEl.textContent = displayText;
    }

    if (node.collectEvidence) {
      collectEvidence(node.collectEvidence);
      showEvidenceCollected(node.collectEvidence, dialogData.data);
    }

    if (node.recordStatement && dialogData.data.statements) {
      const statementData = dialogData.data.statements[node.recordStatement];
      if (statementData) {
        recordStatement(node.recordStatement, statementData);

        const contradiction = checkContradiction(dialogData.data);
        if (contradiction) {
          showContradictionAlert(contradiction);
        }
      }
    }

    updateEmotionDisplay();

    const nextButton = document.createElement("button");
    nextButton.textContent = "Lanjut";
    nextButton.classList.add("next-btn");
    nextButton.onclick = () => goToNode(node.next, dialogData);
    optionsEl.appendChild(nextButton);
  }

  if (node.type === "option") {
    const displayText =
      typeof node.text === "function" ? node.text(gameState) : node.text;
    dialogEl.textContent = displayText;
    updateEmotionDisplay();
    node.choices.forEach((choice) => {
      if (choice.requiresEmotion) {
        if (!choice.requiresEmotion.includes(gameState.emotion)) {
          return;
        }
      }

      const optionButton = document.createElement("button");
      optionButton.textContent = choice.text;
      optionButton.classList.add("option-btn");
      optionButton.onclick = () => {
        performEffect(choice.effect);
        goToNode(choice.next, dialogData);
      };
      optionsEl.appendChild(optionButton);
    });
  }

  if (node.type === "action") {
    updateEmotionDisplay();
    node.actions.forEach((action) => {
      const actionButton = document.createElement("button");
      actionButton.textContent = action;
      actionButton.classList.add("action-btn");
      actionButton.onclick = () => {
        performAction(action);
        goToNode(node.result[action].next, dialogData);
      };
      actionsEl.appendChild(actionButton);
    });
  }

  if (node.type === "ending") {
    resolveEnding(dialogData.data);
  }
}

function showContradictionAlert(contradiction) {
  const alertEl = document.createElement("div");
  alertEl.className = "contradiction-alert";
  alertEl.innerHTML = `
    <strong>Kontradiksi Terdeteksi!</strong><br>
    Pernyataan <em>"${contradiction.speaker}"</em> bertentangan dengan bukti:<br>
    <strong>${contradiction.evidenceName}</strong>
  `;
  dialogEl.appendChild(alertEl);
}

function showEvidenceCollected(evidenceId, caseData) {
  const evidence = caseData.evidences.find((e) => e.id === evidenceId);
  if (!evidence) return;

  const notifEl = document.createElement("div");
  notifEl.className = "evidence-collected";
  notifEl.innerHTML = `
    <strong>Bukti Ditemukan!</strong><br>
    <strong>${evidence.name}</strong><br>
    <em>${evidence.description || ""}</em>
  `;
  dialogEl.appendChild(notifEl);
}

function performAction(action) {
  const mappedAction = action;
  const modifier = getEmotionModifier();

  if (mappedAction && BALANCE.ACTIONS[mappedAction]) {
    const effects = BALANCE.ACTIONS[mappedAction];

    if (effects.trust !== undefined) {
      let value = effects.trust;
      if (modifier.trust !== undefined) {
        value += modifier.trust;
      }
      gameState.trust = clamp(gameState.trust + value, BALANCE.TRUST_MAX);
    }
    if (effects.truth !== undefined) {
      gameState.truth = clamp(gameState.truth + effects.truth, BALANCE.TRUTH_MAX);
    }
    if (effects.pressure !== undefined) {
      let value = effects.pressure;
      if (modifier.pressure !== undefined) {
        value += modifier.pressure;
      }
      gameState.pressure = clamp(gameState.pressure + value, BALANCE.PRESSURE_MAX);
    }

    evaluateEmotion();
  }
}

function performEffect(effect) {
  if (!effect) return;

  if (effect.trust !== undefined)
    gameState.trust = clamp(gameState.trust + effect.trust, BALANCE.TRUST_MAX);
  if (effect.truth !== undefined)
    gameState.truth = clamp(gameState.truth + effect.truth, BALANCE.TRUTH_MAX);
  if (effect.pressure !== undefined)
    gameState.pressure = clamp(gameState.pressure + effect.pressure, BALANCE.PRESSURE_MAX);

  evaluateEmotion();
}

function resolveEnding(caseData) {
  const endingNode = caseData.nodes[gameState.currentNode];

  if (!endingNode || !endingNode.conditions) {
    dialogEl.textContent = "Error: Ending tidak ditemukan.";
    return;
  }

  let selectedEnding = null;

  for (const condition of endingNode.conditions) {
    if (condition.default) {
      selectedEnding = condition;
      continue;
    }

    if (condition.requires) {
      let meetsRequirements = true;

      if (condition.requires.truth !== undefined) {
        meetsRequirements =
          meetsRequirements && gameState.truth >= condition.requires.truth;
      }
      if (condition.requires.trust !== undefined) {
        meetsRequirements =
          meetsRequirements && gameState.trust >= condition.requires.trust;
      }
      if (condition.requires.pressure !== undefined) {
        meetsRequirements =
          meetsRequirements &&
          gameState.pressure >= condition.requires.pressure;
      }
      if (condition.requires.collectedEvidence !== undefined) {
        const requiredEvidence = condition.requires.collectedEvidence;
        const hasAllEvidence = requiredEvidence.every((evidenceId) =>
          hasEvidence(evidenceId),
        );
        meetsRequirements = meetsRequirements && hasAllEvidence;
      }

      if (meetsRequirements) {
        selectedEnding = condition;
        break;
      }
    }
  }

  if (!selectedEnding) {
    selectedEnding =
      endingNode.conditions.find((c) => c.default) ||
      endingNode.conditions[endingNode.conditions.length - 1];
  }

  const endingText =
    typeof selectedEnding.text === "function"
      ? selectedEnding.text(gameState)
      : selectedEnding.text;

  dialogEl.innerHTML = `
    <h2>~ ${selectedEnding.id.replace(/_/g, " ").toUpperCase()} ~</h2>
    <p>${endingText}</p>
    <div class="ending-stats">
      <p><strong>Statistik Akhir:</strong></p>
      <p>Trust: ${gameState.trust}</p>
      <p>Truth: ${gameState.truth}</p>
      <p>Pressure: ${gameState.pressure}</p>
      <p>Emosi: ${gameState.emotion}</p>
    </div>
  `;

  updateEmotionDisplay();

  const finishButton = document.createElement("button");
  finishButton.textContent = "Selesai";
  finishButton.classList.add("next-btn");
  finishButton.onclick = () => {
    if (onGameFinished) {
      onGameFinished();
    }
  };
  optionsEl.appendChild(finishButton);
}

export function setOnGameFinish(callback) {
  onGameFinished = callback;
}
