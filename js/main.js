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
  const spinBtn = document.getElementById("spin-button");
  const container = document.getElementById("wheel-container");
  const defaultItems = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
  ];
  const items = parseQueryParams()?.items?.split(",") || defaultItems;
  spinBtn.value = items.join(",");
  console.log(`spinBtn.value is ${spinBtn.value}`);
  const wheel = new SpinningWheel(items, container);
  wheel.spin();

  spinBtn.onclick = function () {
    const input = document.getElementById("item-input").value.trim();
    setQueryParams({ items: input });
  };
}

window.onload = main;
