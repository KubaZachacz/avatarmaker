import anime from "animejs";
import { HEAD_PARTS } from "./consts";

export const animateHead = () =>
  anime({
    targets: HEAD_PARTS,
    rotate: [2, -2],
    duration: 7000,
    loop: true,
    direction: "alternate",
    delay: 3000
  });
