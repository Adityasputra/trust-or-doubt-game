import { gameState } from "./state.js";

const dialogEl = document.getElementById("dialogText");
const optionsEl = document.getElementById("options");
const actionsEl = document.getElementById("actions");

function clearUI() {
  optionsEl.innerHTML = "";
  actionsEl.innerHTML = "";
}

export function goToNode(id, dialogData) {
  clearUI();
  const node = dialogData.data[id];
  gameState.node = id;
  // console.log("Navigating to node:", id);
  // console.log("Dialog data:", dialogData);

  // console.log("Node data:", node);
  // console.log("Node type:", node.type);

  // console.log(node);

  if (node.type === "story" || node.type === "dialog") {
    dialogEl.textContent = node.text;

    const nextButton = document.createElement("button");
    nextButton.textContent = "Lanjut";
    nextButton.classList.add("next-btn");
    nextButton.onclick = () => goToNode(node.next, dialogData);
    optionsEl.appendChild(nextButton);
  }

  if (node.type === "option") {
    dialogEl.textContent = node.text;
    node.choices.forEach((choice) => {
      const optionButton = document.createElement("button");
      optionButton.textContent = choice.text;
      optionButton.classList.add("option-btn");
      optionButton.onclick = () => goToNode(choice.next, dialogData);
      optionsEl.appendChild(optionButton);
    });
  }
}
