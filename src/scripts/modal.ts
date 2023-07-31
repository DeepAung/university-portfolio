import gsap from "gsap";

let modalWrapper = document.querySelector("#modal-wrapper") as HTMLElement;

closeModal();
modalWrapper.onclick = closeModal;

// --------------------------------------------- //

export function openModal(element: HTMLElement) {
  if (!modalWrapper) return;

  modalWrapper.append(element.cloneNode(true));

  gsap.to(modalWrapper, { opacity: 1, display: "block" });
}

export function closeModal() {
  if (!modalWrapper) return;

  gsap.to(modalWrapper, {
    opacity: 0,
    display: "none",
    onComplete: () => {
      modalWrapper.innerHTML = "";
    },
  });
}
