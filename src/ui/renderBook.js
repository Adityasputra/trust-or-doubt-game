export function renderCaseBook(caseData) {
  document.getElementById("case-title").textContent = caseData.title;

  const list = document.getElementById("chronology");
  list.innerHTML = "";

  caseData.chronology.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });

  document.getElementById("suspect-name").textContent = caseData.suspect.name;
}
