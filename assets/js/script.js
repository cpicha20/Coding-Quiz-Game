var gGUI = document.querySelector("#gameGUI");
var navBTN = document.querySelector("#navButtons");
var playMenu = document.querySelector("#playMenu");
var mGUI = document.querySelector("#menuGUI");
var timeDisplay = document.querySelector("#timeLeft");
var lboard = document.querySelector("#leaderboard");
var nameInput = document.querySelector("#nameEntry");
var scoreSubmit = document.querySelector("#submit");
var SoR = document.querySelector("#scoreOrReset");

var currentQuestion = 0;
var questionCount = 0; //for finding out how many questions are left so we can end the game if we've done
var timer = 0;
var mD = document.querySelector(".heading");
var par = document.querySelector(".para");
var description = par.textContent;
var title = mD.textContent;
var points = 0;

var timerInterval = null;

//Questions/Answers array of objects
var qaArray = [
  {
    question: "Which CSS property is used to change the background color of an element?",
    CorrectA: "background-color",
    PossibleA: ["color", "text-color", "bg-color", "background-color"],
  },
  {
    question: "What does 'DOM' stand for in JavaScript?",
    CorrectA: "Document Object Model",
    PossibleA: [
      "Data Object Model",
      "Digital Object Model",
      "Document Object Model",
      "Document Object Mapping",
    ],
  },
  {
    question: "Which HTML element is used to create a hyperlink?",
    CorrectA: "a",
    PossibleA: ["link", "href", "a", "url"],
  },
  {
    question: "What does CSS stand for?",
    CorrectA: "Cascading Style Sheets",
    PossibleA: [
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets",
      "Cascading Style Sheets",
    ],
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    CorrectA: "var",
    PossibleA: ["let", "const", "var", "declare"],
  },
  {
    question: "What is the correct HTML tag for creating an unordered list?",
    CorrectA: "ul",
    PossibleA: ["ul", "li", "list", "ulist"],
  },
  {
    question: "Which CSS property is used to change the font size of text?",
    CorrectA: "font-size",
    PossibleA: ["font-style", "text-size", "text-font", "font-size"],
  },
  {
    question: "What does 'NaN' stand for in JavaScript?",
    CorrectA: "Not-a-Number",
    PossibleA: ["No-and-None", "Number-and-None", "Not-and-Never", "Not-a-Number"],
  },
  {
    question: "Which HTML element is used to create a table row?",
    CorrectA: "tr",
    PossibleA: ["table", "td", "th", "tr"],
  },
  {
    question: "What is the result of '5' + 3 in JavaScript?",
    CorrectA: "53",
    PossibleA: ["8", "53", "35", "Error"],
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    CorrectA: "style",
    PossibleA: ["class", "id", "style", "css"],
  },
];

//
var leaderboard = [];

//toggle  visability of page elements
function toggleGUI(param) {
  if (param.dataset.state === "shown") {
    param.style.display = "none";
    param.setAttribute("data-state", "hidden");
  } else {
    param.style.display = "block";
    param.setAttribute("data-state", "shown");
  }
}

//timer for quiz
function countdown() {
  timer = 60;
  clearInterval(timerInterval);

  var timerInterval = setInterval(function () {
    timer--;
    timeDisplay.textContent = timer;
    //check if time is 0 or if no questions remain
    if (timer <= 0 || currentQuestion === qaArray.length) {
      clearInterval(timerInterval);
      toggleGUI(gGUI);
      toggleGUI(mGUI);
      toggleGUI(lboard);
      toggleGUI(timeDisplay);
      mD.textContent = "Thanks for playing!";
      par.textContent = `You earned ${points} points!`;
    }
  }, 999);
}

//shuffling the qa Array
function shuffleQ(array) {
  var x = array.length;
  var y;

  while (x > 0) {
    y = Math.floor(Math.random() * x);
    x--;

    [array[x], array[y]] = [array[y], array[x]];
  }

  return array;
}

//Start the game function
function playGame() {
  currentQuestion = 0;
  if (playMenu.dataset.state === "menu") {
    par.textContent = description;
    mD.textContent = title;
    playMenu.textContent = "Play";
    playMenu.dataset.state = "play";

    if (lboard.dataset.state === "shown") {
      toggleGUI(lboard);
    }if (document.querySelector("#list-container").dataset.state === "shown") {
        toggleGUI(document.querySelector("#list-container"));
      }
  } else {
    par.textContent = "";
    points = 0;
    toggleGUI(gGUI);
    toggleGUI(mGUI);
    toggleGUI(timeDisplay);
    countdown();
    timeDisplay.textContent = timer;
    playMenu.textContent = "Menu";
    playMenu.dataset.state = "menu";

    qaArray = shuffleQ(qaArray);
    // mD.textContent = qaArray[currentQuestion].question;
    // for (let i = 0; i < qaArray[currentQuestion].PossibleA.length; i++) {
    //   document.querySelector(`#a${i + 1}`).textContent = qaArray[currentQuestion].PossibleA[i];
    // }
    nextQuestion();
  }
}

//Answer Selection click event
for (var i = 1; i <= 4; i++) {
  var thisAnswer = document.getElementById(`a${i}`);
  thisAnswer.addEventListener("click", function (event) {
    //"if" correct answer check followed by wrong answer "else" check
    if (event.target.textContent === qaArray[currentQuestion].CorrectA) {
      console.log("correct");
      document.querySelector("#resultMessage").textContent = "Thats Right!";
      if (timerInterval != null) {
        clearInterval(timerInterval);
      }
      points = points + 10;
      eraseMsg();
    } else {
      console.log("wrong");
      document.querySelector("#resultMessage").textContent = "Thats Wrong.";
      if (timerInterval != null) {
        clearInterval(timerInterval);
      }
      timer = timer - 10;
      if (points != 0) {
        points = points - 5;
      }
      eraseMsg();
    }
    var x = currentQuestion + 1;
    console.log(qaArray.length);
    // console.log(x);
    currentQuestion++;
    console.log(currentQuestion);
    if (currentQuestion != qaArray.length) {
      nextQuestion();
    }
  });
}

//Erase Right/Wrong message after answering
function eraseMsg() {
  timerInterval = setInterval(function () {
    document.querySelector("#resultMessage").textContent = "";

    clearInterval(timerInterval);
  }, 1300);
}

//next question
function nextQuestion() {
  mD.textContent = qaArray[currentQuestion].question;

  for (let i = 0; i < qaArray[currentQuestion].PossibleA.length; i++) {
    document.querySelector(`#a${i + 1}`).textContent = qaArray[currentQuestion].PossibleA[i];
  }
}

scoreSubmit.addEventListener("click", function () {
  var submission = {};
  if (nameInput.value != "") {
    submission.name = nameInput.value;
    submission.score = points;
  }

  leaderboard.push(submission);
  leaderboard.sort((a, b) => b.score - a.score);

  if (localStorage.getItem("top Scores") === null) {
    var jsonString = JSON.stringify(leaderboard);
    localStorage.setItem("topScores", jsonString);
  }
  else{
  var storedData = localStorage.getItem("topScores");
  var retrievedArray = JSON.parse(storedData);
  retrievedArray.push(leaderboard);
  var jsonString = JSON.stringify(retrievedArray);
    localStorage.setItem("topScores", jsonString);
  }
  toggleGUI(lboard);
});

SoR.addEventListener("click", function () {
  if (SoR.dataset.state === "reset") {
    localStorage.clear();
  } else {

    var storedData = localStorage.getItem("topScores");
    var retrievedArray = JSON.parse(storedData);

    var container = document.querySelector("#list-container");
    toggleGUI(container);
    
    var listHTML = "<ul>";

    if (retrievedArray != null) {
      for (var item of retrievedArray) {
        var itemName = item.name;
        var itemScore = item.score;

        listHTML += `<li>
      <strong>Name:</strong> ${itemName}
      <strong>Score:</strong> ${itemScore}
    </li>`;
      }

      listHTML += "</ul>";
      container.innerHTML = listHTML;
    }

    SoR.dataset.state = "reset";
    SoR.textContent = "Reset Scores";
  }
});

playMenu.addEventListener("click", playGame);
