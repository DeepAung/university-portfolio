import gsap from "gsap";

const modalWrapper = document.querySelector("#modal-wrapper") as HTMLElement;
const modalContent = document.querySelector("#modal-content") as HTMLElement;
let imgElem: HTMLElement | undefined = undefined;

closeModal();
modalWrapper.onclick = closeModal;

addEventListener("popstate", () => {
  closeModal();
});

// --------------------------------------------- //

export function openModal(elem: HTMLElement) {
  if (!modalWrapper) return;

  modalWrapper.style.overflowY = "scroll";
  let clonedElem = elem.cloneNode(true) as HTMLElement;
  clonedElem.style.display = "block";

  imgElem = clonedElem.querySelector(".modal-full-image") as HTMLElement;
  if (imgElem) {
    imgElem.classList.add("modal-full-image-active");
  }

  modalContent.append(clonedElem);

  document.body.classList.add("lock-scroll");
  gsap.to(modalWrapper, {
    opacity: 1,
    display: "block",
    duration: 0.25,
  });

  history.pushState(null, "", window.location.pathname);
}

export function closeModal() {
  if (!modalWrapper) return;

  document.body.classList.remove("lock-scroll");
  gsap.to(modalWrapper, {
    opacity: 0,
    display: "none",
    duration: 0.25,
    onComplete: () => {
      modalContent.innerHTML = "";
      modalWrapper.style.overflowY = "hidden";
    },
  });

  history.replaceState(null, "", window.location.pathname);
}
