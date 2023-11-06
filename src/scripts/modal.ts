import gsap from "gsap";

let modalWrapper = document.querySelector("#modal-wrapper") as HTMLElement;

closeModal();
modalWrapper.onclick = closeModal;

// --------------------------------------------- //

export function openModal(element: HTMLElement) {
  if (!modalWrapper) return;

  modalWrapper.style.overflowY = "scroll";
  let clonedElem = element.cloneNode(true) as HTMLElement;
  clonedElem.style.display = "block";

  modalWrapper.append(clonedElem);

  document.body.classList.add("lock-scroll");
  gsap.to(modalWrapper, {
    opacity: 1,
    display: "block",
    duration: 0.25,
  });
}

export function openImageModal(element: HTMLElement) {
  if (!modalWrapper) return;

  const clonedElem = element.cloneNode(true) as HTMLElement;
  clonedElem.style.display = "block";

  const img = clonedElem.querySelector("img");
  img?.classList.add("full-image");

  modalWrapper.append(clonedElem);

  document.body.classList.add("lock-scroll");
  gsap.to(modalWrapper, {
    opacity: 1,
    display: "block",
    duration: 0.25,
  });
}

export function closeModal() {
  if (!modalWrapper) return;

  document.body.classList.remove("lock-scroll");
  gsap.to(modalWrapper, {
    opacity: 0,
    display: "none",
    duration: 0.25,
    onComplete: () => {
      modalWrapper.innerHTML = "";
      modalWrapper.style.overflowY = "hidden";
    },
  });
}
