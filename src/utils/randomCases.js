export async function pickRandomCase() {
  const res = await fetch("./data/cases.json");
  const cases = await res.json();

  const index = Math.floor(Math.random() * cases.length);
  return cases[index];
}
