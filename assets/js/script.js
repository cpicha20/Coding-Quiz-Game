var gGUI = document.querySelector("#gameGUI");
var navBTN = document.querySelector("#navButtons");
var playMenu = document.querySelector("#playMenu");
var mGUI = document.querySelector("#menuGUI");
var tLeft = document.querySelector("#timeLeft");
var lboard = document.querySelector("#leaderboard");

var currentQuestion = 0;
var questionCount = 0; //for finding out how many questions are left so we can end the game if we've done
var timer = 0;
var mD = document.querySelector(".mainDisplay");

//Questions/Answers array of objects
var qaArray = [
  {
    question: "Question 1",
    CorrectA: "no",
    PossibleA: ["yes", "no", "maybe", "say it aint so"],
  },
  {
    question: "Question 2",
    CorrectA: "no",
    PossibleA: ["yes", "no", "maybe", "say it aint so"],
  },
  {
    question: "Question 3",
    CorrectA: "no",
    PossibleA: ["yes", "no", "maybe", "say it aint so"],
  },
  {
    question: "Question 4",
    CorrectA: "no",
    PossibleA: ["yes", "no", "maybe", "say it aint so"],
  },
  {
    question: "Question 5",
    CorrectA: "no",
    PossibleA: ["yes", "no", "maybe", "say it aint so"],
  },
  {
    question: "Question 6",
    CorrectA: "no",
    PossibleA: ["yes", "no", "maybe", "say it aint so"],
  },
  {
    question: "Question 7",
    CorrectA: "no",
    PossibleA: ["yes", "no", "maybe", "say it aint so"],
  },
  {
    question: "Question 8",
    CorrectA: "no",
    PossibleA: ["yes", "no", "maybe", "say it aint so"],
  },
  {
    question: "Question 9",
    CorrectA: "no",
    PossibleA: ["yes", "no", "maybe", "say it aint so"],
  },
  {
    question: "Question 10",
    CorrectA: "no",
    PossibleA: ["yes", "no", "maybe", "say it aint so"],
  },
];

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
  timer = 90;

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

function nextQuestion() {
  
    timerInterval = setInterval(function () {
    document.querySelector("#resultMessage").textContent = "";
    currentQuestion = Math.floor(Math.random() * qaArray.length);
    mD.textContent = qaArray[currentQuestion].question;
    for (let i = 0; i < qaArray[currentQuestion].PossibleA.length; i++) {
      document.querySelector(`#a${i + 1}`).textContent = qaArray[currentQuestion].PossibleA[i];
    }
    clearInterval(timerInterval);
  }, 1300);

}

function playGame() {
  if (playMenu.dataset.state === "menu") {
    playMenu.textContent = "Play";
    playMenu.dataset.state = "play";
    toggleGUI(lboard);
    console.log(lboard.dataset.state);
  } else {
    toggleGUI(gGUI);
    toggleGUI(mGUI);
    toggleGUI(tLeft);
    countdown();
    tLeft.textContent = timer;
    playMenu.textContent = "Menu";
    playMenu.dataset.state = "menu";

    currentQuestion = Math.floor(Math.random() * qaArray.length);
    mD.textContent = qaArray[currentQuestion].question;
    for (let i = 0; i < qaArray[currentQuestion].PossibleA.length; i++) {
      document.querySelector(`#a${i + 1}`).textContent = qaArray[currentQuestion].PossibleA[i];
    }
  }
}

document.querySelector("#answerButtons").addEventListener("click", function (event) {
  console.log(event.target.textContent);
  console.log(qaArray[currentQuestion].CorrectA);
  if (event.target.textContent === qaArray[currentQuestion].CorrectA) {
    console.log("correct");
    document.querySelector("#resultMessage").textContent = "Thats Right!";
  } else {
    console.log("wrong");
    document.querySelector("#resultMessage").textContent = "Thats Wrong.";
  }
  nextQuestion();
});

playMenu.addEventListener("click", playGame);
