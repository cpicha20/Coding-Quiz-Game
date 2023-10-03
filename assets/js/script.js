var gGUI = document.querySelector("#gameGUI");
var navBTN = document.querySelector("#navButtons");
var playMenu = document.querySelector("#playMenu");
var mGUI = document.querySelector("#menuGUI");
var tLeft = document.querySelector("#timeLeft");

var currentQuestion = 0;
var questionCount = 0; //for finding out how many questions are left so we can end the game if we've done
var timer = 60;

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
    var timerInterval = setInterval(function() {
        timer--;
        tLeft.textContent = timer;
      }, 1000); 
    
}

function playGame() {
    console.log(mGUI.dataset.state);
    tLeft.textContent = timer;
    toggleGUI(gGUI);
    toggleGUI(mGUI);
    toggleGUI(tLeft);
    countdown();
    
  
  playMenu.textContent = "Menu";
}

 console.log(tLeft.dataset.state);
playMenu.addEventListener("click", playGame);
