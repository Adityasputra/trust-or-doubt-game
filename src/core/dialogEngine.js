let dialogData = null;
let currentNode = "start";
let onEndingCallback = null;

export function setEndingCallback(callback) {
  onEndingCallback = callback;
}

export async function loadDialog(file) {
  const res = await fetch(`/data/${file}`);
  dialogData = await res.json();
  currentNode = "start";
  renderDialog();
}

export function renderDialog() {
  const node = dialogData[currentNode];
  if (!node) {
    console.error("Dialog node not found:", currentNode);
    return;
  }

  // Display the main text
  document.getElementById("dialogText").textContent = node.text;

  // Clear action buttons
  const actionsContainer = document.getElementById("actions");
  actionsContainer.innerHTML = "";

  // Check if this is an ending
  if (node.ending) {
    if (onEndingCallback) {
      onEndingCallback(node);
    }
    return;
  }

  // Generate action buttons based on available next options
  if (node.next) {
    const actionLabels = {
      trust: "Percaya",
      doubt: "Ragu",
      question: "Tanya",
      objection: "Keberatan"
    };

    for (const [action, nextNode] of Object.entries(node.next)) {
      const btn = document.createElement("button");
      btn.textContent = actionLabels[action] || action;
      btn.onclick = () => handleAction(action);
      actionsContainer.appendChild(btn);
    }
  }
}

function handleAction(action) {
  const node = dialogData[currentNode];
  if (!node || !node.next || !node.next[action]) {
    console.error("Invalid action:", action);
    return;
  }

  currentNode = node.next[action];
  renderDialog();
}

export function setCurrentNode(nodeId) {
  currentNode = nodeId;
  renderDialog();
}
