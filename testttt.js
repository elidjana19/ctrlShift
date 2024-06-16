// CTRL AND SHIFT SEPERATED LOGIC

// // CTRL
const selectedDivs = document.querySelectorAll(".selectDiv");
let currentIndex = 0;
let ctrlPressed = false;

function move(e) {
  //only move when ctrl pressed
  if (ctrlPressed) {
    if (e.key === "ArrowLeft") {
      if (currentIndex > 0) {
        selectedDivs[currentIndex].classList.remove("selected");
        currentIndex--;
        selectedDivs[currentIndex].classList.add("selected");
      }
    }
    if (e.key === "ArrowRight") {
      if (currentIndex < selectedDivs.length - 1) {
        selectedDivs[currentIndex].classList.remove("selected");
        currentIndex++;
        selectedDivs[currentIndex].classList.add("selected");
      }
    }
  } else {  //ctrl not pressed
    if (e.key === "ArrowLeft") {
      if (currentIndex > 0) {
        selectedDivs[currentIndex].classList.remove("ctrl");
        currentIndex--;
        selectedDivs[currentIndex].classList.add("ctrl");
      }
    } else if (e.key === "ArrowRight") {
      if (currentIndex < selectedDivs.length - 1) {
        selectedDivs[currentIndex].classList.remove("ctrl");
        currentIndex++;
        selectedDivs[currentIndex].classList.add("ctrl");
      }
    }
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Control") {
    ctrlPressed = true;
  }
  move(e);
});

// ctrl+click
selectedDivs.forEach((div, index) => {
  div.addEventListener("click", (e) => {
    if (ctrlPressed) {
      div.classList.toggle("ctrl");
      currentIndex=index
    } 
  });
});



// SHIFT
    let currentIndexShift = 0;
    let shiftPressed = false;
    
    function moveShift(e) {
      if (shiftPressed) {
        if (e.key === "ArrowLeft" && currentIndexShift > 0) {
              selectedDivs[currentIndexShift].classList.remove("ctrl");
              currentIndex--;

              for (let i = startShiftIndex; i >= currentIndexShift; i-- ) {
                selectedDivs[i].classList.add("ctrl");
    
              }
        } else if (e.key === "ArrowRight" && currentIndexShift < selectedDivs.length - 1) {
            selectedDivs[currentIndexShift].classList.remove("ctrl");
            currentIndexShift++;
            for (let i = startShiftIndex; i <= currentIndexShift; i++ ) {
                selectedDivs[i].classList.add("ctrl"); 
        }
       
      }} else {
        // If Shift is not pressed, move currentIndex and update highlighting
        if (e.key === "ArrowLeft" && currentIndexShift > 0) {
          selectedDivs[currentIndexShift].classList.remove("ctrl");
          currentIndexShift--;
        } else if (e.key === "ArrowRight" && currentIndexShift < selectedDivs.length - 1) {
          selectedDivs[currentIndexShift].classList.remove("ctrl");
          currentIndex++;
        }
       selectedDivs[currentIndexShift].classList.add("ctrl");
      }
    }

    
    function handleKeyDown(e) {
      if (e.key === "Shift") {
        shiftPressed = true;
        startShiftIndex = currentIndexShift; //startIndex: index where shift is pressed
        selectedDivs[currentIndexShift].classList.add("ctrl");  //current div when shift is pressed
      } else {
        moveShift(e);
      }
    }

    function handleKeyUp(e) {
        if (e.key === "Shift") {
          shiftPressed = false;

          selectedDivs.forEach((div,index)=>{
            div.classList.remove("ctrl")
          })

           selectedDivs[currentIndexShift].classList.add("selected")
          
        }
      }
    
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);