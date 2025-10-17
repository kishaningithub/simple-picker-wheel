import { Wheel } from "https://cdn.jsdelivr.net/npm/spin-wheel@5.0.2/dist/spin-wheel-esm.js";

export class SpinningWheel {
  constructor(items, containerComponent) {
    this.wheel = this.createWheel(items, containerComponent);
  }

  createWheel(items, containerComponent) {
    const props = {
      items: items.map((item) => ({
        label: item.trim(),
      })),
    };
    return new Wheel(containerComponent, props);
  }

  randomItemIndex() {
    return Math.floor(Math.random() * this.wheel.items.length);
  }

  spin() {
    const winningItemIndex = this.randomItemIndex();
    this.wheel.spinToItem(winningItemIndex, 4000, true, 2, 1, null);
  }
}
