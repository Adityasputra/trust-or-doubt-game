let _sceneLoading, _sceneStart, _sceneBook, _sceneInterrogation, _sceneEnding;

export const sceneLoading = {
  get el() {
    return (_sceneLoading ??= document.getElementById("scene-loading"));
  },
};
export const sceneStart = {
  get el() {
    return (_sceneStart ??= document.getElementById("scene-start"));
  },
};
export const sceneBook = {
  get el() {
    return (_sceneBook ??= document.getElementById("scene-book"));
  },
};
export const sceneInterrogation = {
  get el() {
    return (_sceneInterrogation ??= document.getElementById(
      "scene-interrogation",
    ));
  },
};
export const sceneEnding = {
  get el() {
    return (_sceneEnding ??= document.getElementById("scene-ending"));
  },
};

const allScenes = [
  sceneLoading,
  sceneStart,
  sceneBook,
  sceneInterrogation,
  sceneEnding,
];

export function showScene(scene) {
  allScenes.forEach((s) => {
    if (s.el) s.el.style.display = "none";
  });

  if (scene?.el) scene.el.style.display = "";
}
