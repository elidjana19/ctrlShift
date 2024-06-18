const selectedDivs = document.querySelectorAll(".selectDiv");

let currentIndex = 0;
let ctrlPressed = false;
let shiftPressed = false;
let shiftJustReleased = false;

let ctrlReleased=false

function move(e) {
  if (shiftJustReleased && (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key==="Shift")) {
    selectedDivs.forEach((div) => {
      div.classList.remove("selected");
    });
    shiftJustReleased = false;
  }

  if(ctrlReleased && e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key==="Control" ){
    selectedDivs.forEach((div) => {
      div.classList.remove("selected");
    });
    ctrlReleased = false;
  }
  if (ctrlPressed) {
    if (e.key === "ArrowLeft" && currentIndex > 0) {
      selectedDivs[currentIndex].classList.remove("indexStyle");
      currentIndex--;
      selectedDivs[currentIndex].classList.add("indexStyle");
    } else if (
      e.key === "ArrowRight" &&
      currentIndex < selectedDivs.length - 1
    ) {
      selectedDivs[currentIndex].classList.remove("indexStyle");
      currentIndex++;
      selectedDivs[currentIndex].classList.add("indexStyle");
    }
  } else if (shiftPressed) {
    if (e.key === "ArrowLeft" && currentIndex > 0) {
      selectedDivs[currentIndex].classList.remove("selected");
      currentIndex--;
      for (let i = startShiftIndex; i >= currentIndex; i--) {
        selectedDivs[i].classList.add("selected");
      }
    } else if (
      e.key === "ArrowRight" &&
      currentIndex < selectedDivs.length - 1
    ) {
      selectedDivs[currentIndex].classList.remove("selected");
      currentIndex++;
      for (let i = startShiftIndex; i <= currentIndex; i++) {
        selectedDivs[i].classList.add("selected");
      }
    }
  } else {
    if (e.key === "ArrowLeft" && currentIndex > 0) {
      selectedDivs[currentIndex].classList.remove("selected");
      currentIndex--;
      selectedDivs[currentIndex].classList.add("selected");
    } else if (
      e.key === "ArrowRight" &&
      currentIndex < selectedDivs.length - 1
    ) {
      selectedDivs[currentIndex].classList.remove("selected");
      currentIndex++;
      selectedDivs[currentIndex].classList.add("selected");
    }
  }
}

// ctrl + click
selectedDivs.forEach((div, index) => {
  div.addEventListener("click", () => {
    if (ctrlPressed) {
      div.classList.toggle("selected");
      currentIndex = index;
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Control") {
    ctrlPressed = true;
  } else if (e.key === "Shift") {
    shiftPressed = true;
    startShiftIndex = currentIndex;
  }
  move(e);
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Control") {
    ctrlPressed = false;
    ctrlReleased=true;
  } else if (e.key === "Shift") {
    shiftPressed = false;
    shiftJustReleased = true;
  }
});

document.addEventListener("click", (e) => {
  const container = document.querySelector(".container");
  if (!container.contains(e.target)) {
    location.reload();
  }
});
