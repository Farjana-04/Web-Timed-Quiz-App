// Start code for Quiz with created the variables
var titleEl = document.getElementById("titleQuestions");
var startElButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionEl = document.getElementById("question-container");
var startContainerEl = document.getElementById("start-container");
var answerButtonsEl = document.getElementById("answer-buttons");
var answerElChecking = document.getElementById("check-answer");
var viewHighScores = document.getElementById("highscores-link");
var submitButton = document.getElementById("submit-btn");
var clearScoreButton = document.getElementById("clear-btn");
var fillInitialsField = document.getElementById("player-name");
var restartElButton = document.getElementById("restart-btn");
var scoreField = document.getElementById("player-score");
var scoreValue = JSON.parse(localStorage.getItem("scores")) || []; // get the score
var timeLeftOver = 75; //Second
var timerID;
var timerEl = document.getElementById("timer");
//randomly shuffled array, and genarate random index number
var shuffledQuestions, currentQuestionIndex;

// This is the question functions that contain questions and the answers. 
var questions = [
    {
      title: 'Commonly used data types DO NOT include:',
      choices: ['strings', 'booleans', 'alerts', 'numbers'],
      answer: 'alerts',
    },
    {
      title: 'The condition in an if / else statement is enclosed within ____.',
      choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
      answer: 'parentheses',
    },
    {
      title: 'Arrays in JavaScript can be used to store ____.',
      choices: [
        'numbers and strings',
        'other arrays',
        'booleans',
        'all of the above',
      ],
      answer: 'all of the above',
    },
    {
      title:
        'String values must be enclosed within ____ when being assigned to variables.',
      choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
      answer: 'quotes',
    },
    {
      title:
        'A very useful tool used during development and debugging for printing content to the debugger is:',
      choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
      answer: 'console.log',
    },
  ];

  // Start button trigger the first question and next button to display
startElButton.addEventListener("click", startQuize);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    nextQuestionSet()
});
// Start Quiz, hide the startElbutton after clicked
function startQuize() {
  timerID = setInterval(timeSet, 1000);
  startContainerEl.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionEl.classList.remove("hide");

  // Timer will start as soon as start button is clicked
  timeSet();
  nextQuestionSet();
};
// Go to next question, and genarate randomly shuffled array
function nextQuestionSet() {
  stateReset();
  visibleQuestion(shuffledQuestions[currentQuestionIndex]);
};
// Used the countdown timer 
function timeSet() {
  timeLeftOver--;
  timerEl.textContent = "Time: " + timeLeftOver;
  if (timeLeftOver <= 0) {
      scoreSaving();
  }
}
// Created a title element, display questions and click the answer
function visibleQuestion(question) {
  titleEl.innerText = question.title
  question.choices.forEach(choice => {
      var button = document.createElement("button")
      button.innerText = choice
      button.classList.add("btn")
      if (choice.correct) {
          button.dataset.correct = choice.correct
      }
      button.addEventListener("click", selectAnswer)
      answerButtonsEl.appendChild(button)
  })
};
// Reset state function, and initialize the state with variables

function stateReset() {
   nextButton.classList.add("hide")
   answerElChecking.classList.add("hide")
  while (answerButtonsEl.firstChild) {
      answerButtonsEl.removeChild
          (answerButtonsEl.firstChild)
  }
};

// Select answer function
function selectAnswer(e) {
  var selectedButton = e.target;
  //console.dir(selectedButton);
  var rightAnswer = shuffledQuestions[currentQuestionIndex].answer
  var correct = selectedButton.textContent===rightAnswer
  answerElChecking.classList.remove("hide")
  // Check if the answer correct or wrong then show text
  if (correct) {
    answerElChecking.innerHTML = "Correct!";
  } else {
      answerElChecking.innerHTML = "Wrong";
      if (timeLeftOver <= 10) {
          timeLeftOver = 0;
      } else {
          // If the answer is wrong, deduct time by 10
          timeLeftOver -= 10;
      }
  }
   //use array when button is clicked
  Array.from(answerButtonsEl.children).forEach(button => {
      statusSet(button, button.dataset.correct)
  })

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove("hide")
      checkAnswerEl.classList.remove("hide")
  } else {
      startElButton.classList.remove("hide")
      scoreSaving();
  }
};

// Check and show the correct answer by set the buttons colors
function statusSet(element, correct) {
  statusClear(element)
  if (correct) {
      element.classList.add("correct");
  } else {
      element.classList.add("wrong");
  }
};

// Remove all the classes
function statusClear(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
};
// Save scorevalue
function scoreSaving() {
  clearInterval(timerID);
  timerEl.textContent = "Time: " + timeLeftOver;
  setTimeout(function () {
      //localStorage.setItem("scores", JSON.stringify(scores));
      questionEl.classList.add("hide");
      document.getElementById("score-container").classList.remove("hide");
      document.getElementById("your-score").textContent = "Your final score is " + timeLeftOver;

  }, 2000)
};

var loadScoreStorage = function () {
  // Get score from local storage

  if (!scoreSaving) {
      return false;
  }

  // Convert scores from stringfield format into array
  //saved the result
 var savedScoreValue = JSON.parse(savedScoreValue);
  var fillInitials = document.querySelector("#initials-field").value;
  var newScore = {
      score: timeLeftOver,
      fillInitials: fillInitials
  }
  savedScoreValue.push(newScore);
  console.log(savedScoreValue)

  savedScoreValue.forEach(score => {
      fillInitialsField.innerText = score.fillInitials
      scoreField.innerText = score.score
  })
};

// Show high score value and type initials
function highScoresView(fillInitials) {
  document.getElementById("highscores").classList.remove("hide")
  document.getElementById("score-container").classList.add("hide");
  startContainerEl.classList.add("hide");
  questionEl.classList.add("hide");
   if (typeof fillInitials == "string") {
      var score = {
          fillInitials, timeLeftOver
      }
      scoreValue.push(score)
  }

  var highScoreElement = document.getElementById("highscore");
  highScoreElement.innerHTML = "";
  
  for (i = 0; i < scoreValue.length; i++) {
      var div1 = document.createElement("div");
      div1.setAttribute("class", "name-div");
      div1.innerText = scoreValue[i].fillInitials;
      var div2 = document.createElement("div");
      div2.setAttribute("class", "score-div");
      div2.innerText = scoreValue[i].timeLeftOver;

      highScoreElement.appendChild(div1);
      highScoreElement.appendChild(div2);
  }
    //store the score value
  localStorage.setItem("scores", JSON.stringify(scoreValue));

 };
// View high scores link
viewHighScores.addEventListener("click", highScoresView);

submitButton.addEventListener("click", function (event) {
  event.preventDefault()
  var fillInitials = document.querySelector("#initials-field").value;
  highScoresView(fillInitials);
});

// Restart or reload the page
restartElButton.addEventListener("click", function () {
  window.location.reload();
});

// Clear localStorage items
clearScoreButton.addEventListener("click", function () {
  localStorage.clear();
  document.getElementById("highscore").innerHTML = "";
});





















