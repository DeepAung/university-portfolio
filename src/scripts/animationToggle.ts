import gsap from "gsap";

export function getAnimationToggle(): boolean {
  let value = localStorage.getItem("animationToggle");

  if (value == null) {
    setAnimationToggle(true);
    return true;
  }

  return JSON.parse(value);
}

export function setAnimationToggle(value: boolean): void {
  gsap.globalTimeline.timeScale(value ? 1 : Number.MAX_SAFE_INTEGER);

  localStorage.setItem("animationToggle", JSON.stringify(value));
}
