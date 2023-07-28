import { gsap } from "gsap";

export function toggleAnimation(value: boolean) {
  if (value) {
    gsap.globalTimeline.timeScale(1);
  } else {
    gsap.globalTimeline.timeScale(Number.MAX_SAFE_INTEGER);
  }
}
