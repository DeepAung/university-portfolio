import gsap from "gsap";

export function initCarousel(carousel: HTMLElement) {
  let items = carousel.querySelector(".carousel__items") as HTMLElement;
  let prev = carousel.querySelector(".carousel__prev") as HTMLElement;
  let next = carousel.querySelector(".carousel__next") as HTMLElement;

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
    let item = itemsArray[0];
    let style = window.getComputedStyle(item);
    let width =
      parseFloat(style.width) +
      parseFloat(style.marginLeft) +
      parseFloat(style.marginRight);

    itemsArray.forEach((child) => {
      gsap.to(child, {
        translateX: -(width * index),
        ease: "power3.inOut",
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
