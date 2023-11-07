import gsap from "gsap";

type GsapFuncType = (
  target: gsap.TweenTarget,
  trigger: gsap.DOMTarget,
  body: gsap.TweenVars,
) => void;

export const gsapTrigger: {
  from: GsapFuncType;
  to: GsapFuncType;
} = {
  from: buildGsapFunc(gsap.from),
  to: buildGsapFunc(gsap.to),
};

function buildGsapFunc(func: any) {
  return (
    target: gsap.TweenTarget,
    trigger: gsap.DOMTarget,
    body: gsap.TweenVars,
  ) => {
    let value: number = body.y ? -body.y : 0;

    func(target, {
      scrollTrigger: {
        trigger: trigger,
        start: `top+=${value}px bottom`,
        toggleActions: "play none none none",
      },
      ...body,
    });
  };
}
