const primaryColors = {
  null: "255, 255, 255",
  cu: "250, 24, 163",
  kmitl: "255, 115, 50",
  kmutt: "255, 83, 35",
};

const universityPaths = {
  null: "",
  cu: "Chula/Engineer/Computer(CP)",
  kmitl: "KMITL/Engineer/Computer(CE)",
  kmutt: "KMUTT/Engineer/Computer(CPE)",
};

type University = "null" | "cu" | "kmitl" | "kmutt";

// ---------------------------------- //

const allContents = document.querySelector("#contents") as HTMLElement;

let university: University = "cu";
const universityEvent = new CustomEvent("universitychange", {
  bubbles: true,
});

export let primaryColor = primaryColors[university];
export let universityPath = universityPaths[university];

start();
function start() {
  let urlParams = new URLSearchParams(window.location.search);
  let universityData = urlParams.get("university");

  if (universityData) {
    setUniversity(universityData as University);
  } else {
    setUniversity("cu");
  }
}

export function setUniversity(value: University) {
  university = value;

  allContents.style.display = university == "null" ? "none" : "block";
  primaryColor = primaryColors[university];
  universityPath = universityPaths[university];

  window.history.replaceState(null, "", `?university=${university}`);
  window.dispatchEvent(universityEvent);
}

export function getUniversity() {
  return university;
}
