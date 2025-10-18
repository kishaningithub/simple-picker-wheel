import { SpinningWheel } from "./spinning-wheel.js";

function parseQueryParams() {
  const queryString = globalThis.location.search;
  const query = queryString.substring(1);
  const pairs = query.split("&");
  const params = {};
  for (const pair of pairs) {
    const [key, value] = pair.split("=");
    params[key] = decodeURIComponent(value);
  }
  return params;
}

function setQueryParams(params) {
  const url = new URL(globalThis.location);
  for (const key in params) {
    url.searchParams.set(key, params[key]);
  }
  globalThis.location.replace(url);
}

function main() {
  const spinButton = document.getElementById("spin-button");
  const editButton = document.getElementById("edit-button");
  const shareButton = document.getElementById("share-button");
  const container = document.getElementById("wheel-container");
  const itemInput = document.getElementById("item-input");
  const editItemsDialog = document.getElementById("edit-items-dialog");

  const defaultItems = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
  ];
  const items = parseQueryParams()?.items?.split("\n") || defaultItems;
  itemInput.value = items.join("\n");
  const wheel = new SpinningWheel(items, container);

  editButton.onclick = function () { 
    editItemsDialog.showModal();
  };

  spinButton.onclick = function () {
    wheel.spin();
  };

  shareButton.onclick = async function () {
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
