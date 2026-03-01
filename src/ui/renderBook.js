export function renderCaseBook(caseData) {
  document.getElementById("case-title").textContent = caseData.title;

  const descEl = document.getElementById("case-description");
  descEl.innerHTML = "";
  if (Array.isArray(caseData.description)) {
    caseData.description.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      descEl.appendChild(li);
    });
  } else {
    descEl.textContent = caseData.description;
  }

  const chronoEl = document.getElementById("chronology");
  chronoEl.innerHTML = "";
  if (caseData.chronology) {
    if (Array.isArray(caseData.chronology)) {
      caseData.chronology.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        chronoEl.appendChild(li);
      });
    } else {
      chronoEl.textContent = caseData.chronology;
    }
  }

  document.getElementById("suspect-name").textContent = caseData.suspect || "";
}
