import gsap from "gsap";

export function initTab(tab: Element, startIndex: number) {
  const selects = tab?.children[0] as HTMLElement;
  const contents = tab?.children[1] as HTMLElement;

  let curIndex = startIndex;
  openAnim(curIndex);

  for (let i = 0; i < selects.children.length; i++) {
    const child = selects.children[i] as HTMLElement;
    child.onclick = () => {
      openTab(i);
    };
  }

  function openTab(i: number) {
    closeAnim(curIndex);
    curIndex = i;
    openAnim(curIndex);
  }

  function openAnim(i: number) {
    const select = selects.children[i] as HTMLElement;
    const content = contents.children[i] as HTMLElement;

    select.classList.add("active");
    gsap.to(content, {
      opacity: 1,
      display: "block",
      ease: "power1.in",
      duration: 0.25,
    });
  }

  function closeAnim(i: number) {
    const select = selects.children[i] as HTMLElement;
    const content = contents.children[i] as HTMLElement;

    select.classList.remove("active");
    gsap.killTweensOf(content);
    content.style.display = "none";
    content.style.opacity = "0";
  }
}
