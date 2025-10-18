import { Wheel } from "https://cdn.jsdelivr.net/npm/spin-wheel@5.0.2/dist/spin-wheel-esm.js";
import { random } from "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm";

export class SpinningWheel {
  constructor(items, containerComponent) {
    this.wheel = this.createWheel(items, containerComponent);
    this.onRest = null;
    this.wheel.onRest = (event) => {
      if (this.onRest) {
        this.onRest(event);
      }
    };
  }

  createWheel(items, containerComponent) {
    const colors = ["#2b590c", "#afa939", "#f7b71d", "#fdef96"];

    const props = {
      itemBackgroundColors: colors,
      items: items.map((item) => ({
        label: item.trim(),
      })),
    };
    return new Wheel(containerComponent, props);
  }

  spin() {
    const winningItemIndex = random(0, this.wheel.items.length);
    this.wheel.spinToItem(winningItemIndex, 4000, true, 2, 1, null);
  }
}
