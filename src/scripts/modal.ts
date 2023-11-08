import gsap from "gsap";

const modalWrapper = document.querySelector("#modal-wrapper") as HTMLElement;
const modalContent = document.querySelector("#modal-content") as HTMLElement;

closeModal();
modalWrapper.onclick = closeModal;

addEventListener("popstate", () => {
  closeModal();
});

// --------------------------------------------- //

export function openModal(element: HTMLElement) {
  if (!modalWrapper) return;

  modalWrapper.style.overflowY = "scroll";
  let clonedElem = element.cloneNode(true) as HTMLElement;
  clonedElem.style.display = "block";

  modalContent.append(clonedElem);

  document.body.classList.add("lock-scroll");
  gsap.to(modalWrapper, {
    opacity: 1,
    display: "block",
    duration: 0.25,
  });

  history.pushState(null, "", window.location.pathname);
}

export function openImageModal(element: HTMLElement) {
  if (!modalWrapper) return;

  const clonedElem = element.cloneNode(true) as HTMLElement;
  clonedElem.style.display = "block";

  const img = clonedElem.querySelector("img");
  img?.classList.add("full-image");

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
