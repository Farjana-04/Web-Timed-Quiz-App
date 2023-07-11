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
var scores = JSON.parse(localStorage.getItem("scores")) || [];
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













