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

function updateEmotionDisplay() {
  emotionEl.textContent = `Trust: ${gameState.trust} | Truth: ${gameState.truth} | Pressure: ${gameState.pressure} | Emosi: ${gameState.emotion}`;
}

function clampTrust(value) {
  return Math.max(0, Math.min(BALANCE.TRUST_MAX, value));
}

function clampTruth(value) {
  return Math.max(0, Math.min(BALANCE.TRUTH_MAX, value));
}

function clampPressure(value) {
  return Math.max(0, Math.min(BALANCE.PRESSURE_MAX, value));
}

function clearUI() {
  optionsEl.innerHTML = "";
  actionsEl.innerHTML = "";
}

export function goToNode(id, dialogData) {
  clearUI();
  clearCurrentStatement();
  const node = dialogData.data.nodes[id];
  gameState.node = id;

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

    if (effects.trust) {
      let value = effects.trust;
      if (modifier.trust) {
        value += modifier.trust;
      }
      gameState.trust = clampTrust(gameState.trust + value);
    }
    if (effects.truth) {
      gameState.truth = clampTruth(gameState.truth + effects.truth);
    }
    if (effects.pressure) {
      let value = effects.pressure;
      if (modifier.pressure) {
        value += modifier.pressure;
      }
      gameState.pressure = clampPressure(gameState.pressure + value);
    }

    evaluateEmotion();
  }
}

function performEffect(effect) {
  if (!effect) return;

  if (effect.trust)
    gameState.trust = clampTrust(gameState.trust + effect.trust);
  if (effect.truth)
    gameState.truth = clampTruth(gameState.truth + effect.truth);
  if (effect.pressure)
    gameState.pressure = clampPressure(gameState.pressure + effect.pressure);

  evaluateEmotion();
}

function resolveEnding(caseData) {
  const endingNode = caseData.nodes[gameState.node];

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
  `;

  updateEmotionDisplay();

  optionsEl.innerHTML = `
    <div class="ending-stats">
      <p><strong>Statistik Akhir:</strong></p>
      <p>Trust: ${gameState.trust}</p>
      <p>Truth: ${gameState.truth}</p>
      <p>Pressure: ${gameState.pressure}</p>
      <p>Emosi: ${gameState.emotion}</p>
    </div>
  `;
}
