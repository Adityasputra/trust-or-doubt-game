import { showScene, sceneStart } from "../utils/showScene.js";

const CONFIG = {
  minIncrement: 0.3,
  maxIncrement: 2.5,
  updateInterval: 80,
  slowdownThreshold: 85,

  typeSpeed: 45,
  messageInterval: 3500,

  particleCount: 25,
};

const LOADING_MESSAGES = [
  "Analyzing Evidence...",
  "Scanning Crime Scene...",
  "Decrypting Confidential Files...",
  "Cross-Examining Suspects...",
  "Verifying Witness Statements...",
  "Processing Forensic Data...",
  "Reconstructing Timeline...",
  "Matching Fingerprints...",
  "Reviewing Case Archives...",
  "Establishing Connections...",
  "Interrogating Database...",
  "Compiling Suspect Profiles...",
  "Analyzing Behavioral Patterns...",
  "Securing Evidence Chain...",
  "Validating Testimonies...",
];

let currentProgress = 0;
let currentMessageIndex = 0;
let isTyping = false;
let typewriterTimeout = null;
let loadingInterval = null;

let elements = {};

function cacheElements() {
  elements = {
    loadingBarFill: document.getElementById("loadingBarFill"),
    loadingBarGlow: document.getElementById("loadingBarGlow"),
    percentageValue: document.getElementById("percentageValue"),
    statusText: document.getElementById("statusText"),
    secondaryBarFill: document.getElementById("secondaryBarFill"),
    dustContainer: document.getElementById("dustContainer"),
  };
}

function createDustParticles() {
  if (!elements.dustContainer) return;

  for (let i = 0; i < CONFIG.particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "dust-particle";

    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    const opacity = Math.random() * 0.4 + 0.1;

    particle.style.cssText = `
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
      opacity: ${opacity};
    `;

    elements.dustContainer.appendChild(particle);
  }
}

function typeMessage(message, callback) {
  if (!elements.statusText) {
    if (callback) callback();
    return;
  }

  isTyping = true;
  elements.statusText.textContent = "";
  let charIndex = 0;

  function typeNextChar() {
    if (charIndex < message.length) {
      elements.statusText.textContent += message.charAt(charIndex);
      charIndex++;
      typewriterTimeout = setTimeout(typeNextChar, CONFIG.typeSpeed);
    } else {
      isTyping = false;
      if (callback) callback();
    }
  }

  typeNextChar();
}

function cycleMessages() {
  if (typewriterTimeout) {
    clearTimeout(typewriterTimeout);
  }

  const message = LOADING_MESSAGES[currentMessageIndex];
  typeMessage(message, () => {
    setTimeout(() => {
      if (currentProgress < 100) {
        currentMessageIndex =
          (currentMessageIndex + 1) % LOADING_MESSAGES.length;
        cycleMessages();
      }
    }, CONFIG.messageInterval);
  });
}

function calculateIncrement() {
  let min = CONFIG.minIncrement;
  let max = CONFIG.maxIncrement;

  if (currentProgress > CONFIG.slowdownThreshold) {
    const slowFactor =
      (100 - currentProgress) / (100 - CONFIG.slowdownThreshold);
    min *= slowFactor * 0.3;
    max *= slowFactor * 0.5;
  }

  const increment = Math.random() * (max - min) + min;
  return Math.max(increment, 0.1);
}

function updateProgressUI(progress) {
  const displayProgress = Math.min(Math.floor(progress), 100);

  if (elements.percentageValue) {
    elements.percentageValue.textContent = displayProgress;
  }

  if (elements.loadingBarFill) {
    elements.loadingBarFill.style.height = `${progress}%`;
  }

  if (elements.loadingBarGlow) {
    elements.loadingBarGlow.style.bottom = `${progress}%`;
    if (!elements.loadingBarGlow.classList.contains("active")) {
      elements.loadingBarGlow.classList.add("active");
    }
  }

  if (elements.secondaryBarFill) {
    elements.secondaryBarFill.style.width = `${progress}%`;
  }
}

function simulateLoading() {
  loadingInterval = setInterval(() => {
    if (currentProgress >= 100) {
      clearInterval(loadingInterval);
      currentProgress = 100;
      updateProgressUI(100);

      if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
      }
      typeMessage("Investigation Ready. Entering Case File...", () => {
        setTimeout(() => {
          showScene(sceneStart);
        }, 1000);
      });
      return;
    }

    const increment = calculateIncrement();
    currentProgress = Math.min(currentProgress + increment, 100);

    updateProgressUI(currentProgress);
  }, CONFIG.updateInterval);
}

function init() {
  cacheElements();
  createDustParticles();

  setTimeout(() => {
    cycleMessages();

    simulateLoading();
  }, 800);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
