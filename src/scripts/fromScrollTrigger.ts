import gsap from "gsap";

export function fromScrollTrigger(
  target: string | Element,
  body: gsap.TweenVars,
  time: number
) {
  let value: number = body.y ? -body.y : 0;

  gsap.from(target, {
    scrollTrigger: {
      trigger: target,
      start: `top+=${value}px bottom`,
      toggleActions: "play none resume reset",
    },
    opacity: 0,
    duration: time,
    ...body,
  });
}
