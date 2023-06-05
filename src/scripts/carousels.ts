import gsap from "gsap";

export function initCarousels(carousels: HTMLElement) {
  let items = carousels.querySelector(".carousels__items") as HTMLElement;
  let prev = carousels.querySelector(".carousels__prev") as HTMLElement;
  let next = carousels.querySelector(".carousels__next") as HTMLElement;

  let itemsArray: HTMLElement[] = [];
  items.childNodes.forEach((value) => {
    if ((value as Element).tagName != undefined) {
      itemsArray.push(value as HTMLElement);
    }
  });

  let index = 0;
  updateArrow();

  prev.onclick = () => {
    slideLeft();
    animate();
    updateArrow();
  };

  next.onclick = () => {
    slideRight();
    animate();
    updateArrow();
  };

  function slideLeft() {
    if (index == 0) return;
    index--;
  }

  function slideRight() {
    if (index == itemsArray.length - 1) return;
    index++;
  }

  function animate() {
    let width = itemsArray[0].offsetWidth;

    itemsArray.forEach((child) => {
      gsap.to(child, {
        translateX: -(width * index),
        ease: "power2.inOut",
        duration: 0.75,
      });
    });
  }

  function updateArrow() {
    prev.style.visibility = index === 0 ? "hidden" : "visible";
    next.style.visibility =
      index === itemsArray.length - 1 ? "hidden" : "visible";
  }
}
