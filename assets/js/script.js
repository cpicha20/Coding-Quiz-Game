var gGUI = document.querySelector(".gameGUI");
var navBTN = document.querySelector("#navButtons");
var playMenu = document.querySelector("#playMenu");

var currentQuestion = 0;
var questionCount = 0; //for finding out how many questions are left so we can end the game if we've done
var timeLeft = 0;

//Questions/Answers array of objects
var qaArray = [];

//
var leaderboard = [];

function toggleGGUI() {
  if (gGUI.dataset.state === "shown") {
    gGUI.style.display = "none";
    gGUI.setAttribute("data-state", "hidden");
  } else {
    gGUI.style.display = "block";
    gGUI.setAttribute("data-state", "shown");
  }
}

function playGame() {
  toggleGGUI();
  
}

playMenu.addEventListener("click");
