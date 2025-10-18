import { SpinningWheel } from "./spinning-wheel.js";
import confetti from "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/+esm";
import { DateTime } from "https://cdn.jsdelivr.net/npm/luxon@3.7.2/+esm";

function showConfetti(endTime) {
  let colors = ["#bb0000", "#ffffff"];
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors,
    zIndex: Math.max(),
  });
  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors,
    zIndex: Math.max(),
  });
  if (DateTime.now() < endTime) {
    requestAnimationFrame(() => {
      showConfetti(endTime);
    });
  }
}

const themes = {
  default: {
    pickerColors: ["#2b590c", "#afa939", "#f7b71d", "#fdef96"],
    spinSound: null,
  },
  trump: {
    pickerColors: ["#cf1c3a", "#ffffff", "#203668"],
    spinSound: "./sounds/young_man.mp3",
  },
};

function main() {
  const spinButton = document.getElementById("spin-button");
  const editButton = document.getElementById("edit-button");
  const shareButton = document.getElementById("share-button");
  const container = document.getElementById("wheel-container");
  const itemInput = document.getElementById("item-input");
  const themeSelect = document.getElementById("theme-select");
  const editItemsDialog = document.getElementById("edit-items-dialog");
  const spinSound = document.getElementById("spin-sound");

  const defaultItems = [
    "Apple",
    "Banana",
    "Cherry",
    "Dates",
    "Elderberry",
    "Fig",
    "Grape",
  ];
  const queryParams = new URLSearchParams(globalThis.location.search);
  const items = queryParams.get("items")?.split("\n") || defaultItems;
  itemInput.value = items.join("\n");
  const themeName = queryParams.get("theme") || "default";
  themeSelect.value = themeName;
  const theme = themes[themeName];
  const wheel = new SpinningWheel(items, container, theme.pickerColors);
  if (theme.spinSound) {
    spinSound.src = theme.spinSound;
  }
  wheel.onRest = (event) => {
    const item = event.currentIndex;
    const winnerDialog = document.getElementById("winner-dialog");
    const winnerText = document.getElementById("winner-text");
    winnerText.textContent = items[item];
    winnerDialog.showModal();
    let endTime = DateTime.now().plus({ seconds: 5 });
    showConfetti(endTime);
    if (theme.spinSound) {
      spinSound.pause();
      spinSound.currentTime = 0;
    }
  };

  wheel.onSpin = (event) => {
    if (theme.spinSound) {
      spinSound.play();
    }
  };

  editButton.onclick = () => {
    editItemsDialog.showModal();
  };

  spinButton.onclick = () => {
    wheel.spin();
  };

  shareButton.onclick = async () => {
    const currentPageUrl = globalThis.location.href;
    try {
      await navigator.clipboard.writeText(currentPageUrl);
      alert("URL copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      alert("Failed to copy URL. Please try manually.");
    }
  };
}

window.onload = main;
