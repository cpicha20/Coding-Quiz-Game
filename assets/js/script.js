var gGUI = document.querySelector("#gameGUI");
var navBTN = document.querySelector("#navButtons");
var playMenu = document.querySelector("#playMenu");
var mGUI = document.querySelector("#menuGUI");
var tLeft = document.querySelector("#timeLeft");
var lboard = document.querySelector("#leaderboard");

var currentQuestion = 0;
var questionCount = 0; //for finding out how many questions are left so we can end the game if we've done
var timer = 0;

//Questions/Answers array of objects
var qaArray = [];

//
var leaderboard = [];

function toggleGUI(param) {
  if (param.dataset.state === "shown") {
    param.style.display = "none";
    param.setAttribute("data-state", "hidden");
  } else {
    param.style.display = "block";
    param.setAttribute("data-state", "shown");
  }
}

function countdown() {
    timer=3;

  var timerInterval = setInterval(function () {
    timer--;
    tLeft.textContent = timer;
    if (timer === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      toggleGUI(gGUI);
      toggleGUI(mGUI);
      toggleGUI(lboard);
      toggleGUI(tLeft);
    }
  }, 1000);
}

function playGame() {
   if (playMenu.dataset.state ==="menu"){
    playMenu.textContent = "Play";
    playMenu.dataset.state = "play";
    toggleGUI(lboard);
    console.log(lboard.dataset.state);
  }
  else{
  toggleGUI(gGUI);
  toggleGUI(mGUI);
  toggleGUI(tLeft);
  countdown();
  tLeft.textContent = timer;
  playMenu.textContent = "Menu";
  playMenu.dataset.state = "menu";
  
 }
}

playMenu.addEventListener("click", playGame);
