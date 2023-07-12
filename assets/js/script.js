// Start code for Quiz with created the variables
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerEl = document.getElementById("question-container");
var startContainerEl = document.getElementById("start-container");
var titleEl = document.getElementById("titleQuestions");
// var questionEl = document.getElementById("question"); //titleEl "title"
var answerButtonsEl = document.getElementById("answer-buttons");
var checkAnswerEl = document.getElementById("check-answer");
var viewHighScores = document.getElementById("highscores-link");
var submitButton = document.getElementById("submit-btn");
var clearScoreButton = document.getElementById("clear-btn");
var initialsField = document.getElementById("player-name");
var restartButton = document.getElementById("restart-btn");
var scoreField = document.getElementById("player-score");
var scores = JSON.parse(localStorage.getItem("scores")) || []; // get the score
var timeLeft = 75;
var timerID;
var timerEl = document.getElementById("timer");
//randomly shuffled array, and genarate random index number
var shuffledQuestions, currentQuestionIndex;

// This is the question functions that contain questions and the answers. They are in multidimensional array with inner array elements
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
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
});
// Start Quiz, hide the startbutton after clicked
function startGame() {
  timerID = setInterval(timeTick, 1000);
  startContainerEl.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerEl.classList.remove("hide");

  // Timer will start as soon as start button is clicked
  timeTick();
  setNextQuestion();
};
// Go to next question, and genarate randomly shuffled array
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
};
// Used the countdown timer 
function timeTick() {
  timeLeft--;
  timerEl.textContent = "Time: " + timeLeft;
  if (timeLeft <= 0) {
      saveScore();
  }
}
// Created a title element, display questions and click the answer
function showQuestion(question) {
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

function resetState() {
   nextButton.classList.add("hide")
  checkAnswerEl.classList.add("hide")
  while (answerButtonsEl.firstChild) {
      answerButtonsEl.removeChild
          (answerButtonsEl.firstChild)
  }
};

// if (choice.correct) {
//   button.dataset.correct = choice.correct
// }
// button.addEventListener("click", selectAnswer)
// answerButtonsEl.appendChild(button)
// })
// };

// Select answer function
function selectAnswer(e) {
  var selectedButton = e.target;
  //console.dir(selectedButton);
  var rightAnswer = shuffledQuestions[currentQuestionIndex].answer
  var correct = selectedButton.textContent===rightAnswer
  checkAnswerEl.classList.remove("hide")
  // Check if the answer correct or wrong then show text
  if (correct) {
      checkAnswerEl.innerHTML = "Correct!";
  } else {
      checkAnswerEl.innerHTML = "Wrong";
      if (timeLeft <= 10) {
          timeLeft = 0;
      } else {
          // If the answer is wrong, deduct time by 10
          timeLeft -= 10;
      }
  }

  Array.from(answerButtonsEl.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
  })

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove("hide")
      checkAnswerEl.classList.remove("hide")
  } else {
      startButton.classList.remove("hide")
      saveScore();
  }
};

// Check and show the correct answer by set the buttons colors
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
      element.classList.add("correct");
  } else {
      element.classList.add("wrong");
  }
};

// Remove all the classes
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
};
// Save scores
function saveScore() {
  clearInterval(timerID);
  timerEl.textContent = "Time: " + timeLeft;
  setTimeout(function () {
      //localStorage.setItem("scores", JSON.stringify(scores));
      questionContainerEl.classList.add("hide");
      document.getElementById("score-container").classList.remove("hide");
      document.getElementById("your-score").textContent = "Your final score is " + timeLeft;

  }, 2000)
};

var loadScores = function () {
  // Get score from local storage

  if (!saveScore) {
      return false;
  }

  // Convert scores from stringfield format into array
  //saved the result
 var savedScores = JSON.parse(savedScores);
  var initials = document.querySelector("#initials-field").value;
  var newScore = {
      score: timeLeft,
      initials: initials
  }
  savedScores.push(newScore);
  console.log(savedScores)

  savedScores.forEach(score => {
      initialsField.innerText = score.initials
      scoreField.innerText = score.score
  })
};

// Show high scores
function showHighScores(initials) {
  document.getElementById("highscores").classList.remove("hide")
  document.getElementById("score-container").classList.add("hide");
  startContainerEl.classList.add("hide");
  questionContainerEl.classList.add("hide");
  if (typeof initials == "string") {
      var score = {
          initials, timeLeft
      }
      scores.push(score)
  }

  var highScoreEl = document.getElementById("highscore");
  highScoreEl.innerHTML = "";
  //console.log(scores)
  for (i = 0; i < scores.length; i++) {
      var div1 = document.createElement("div");
      div1.setAttribute("class", "name-div");
      div1.innerText = scores[i].initials;
      var div2 = document.createElement("div");
      div2.setAttribute("class", "score-div");
      div2.innerText = scores[i].timeLeft;

      highScoreEl.appendChild(div1);
      highScoreEl.appendChild(div2);
  }
    //store the scores
  localStorage.setItem("scores", JSON.stringify(scores));

};
// View high scores link
viewHighScores.addEventListener("click", showHighScores);

submitButton.addEventListener("click", function (event) {
  event.preventDefault()
  var initials = document.querySelector("#initials-field").value;
  showHighScores(initials);
});

// Restart or reload the page
restartButton.addEventListener("click", function () {
  window.location.reload();
});

// Clear localStorage items
clearScoreButton.addEventListener("click", function () {
  localStorage.clear();
  document.getElementById("highscore").innerHTML = "";
});





















