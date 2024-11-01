// script.js
const player1AvatarUrl = 'https://via.placeholder.com/100.png?text=P1'; // Replace with actual image URL for Player 1
const player2AvatarUrl = 'https://via.placeholder.com/100.png?text=P2'; // Replace with actual image URL for Player 2

const categories = [

  {
     name: "History", 
     questions: [
        {
             question: "Who was the first president of the USA?", 
             answer: "George Washington", 
             choices: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"], 
             points: 100,
        },
    ], 
  },
  { 
    name: "Science", 
    questions: [{ question: "What is the chemical symbol for water?", answer: "H2O", choices: ["H2O", "O2", "CO2", "N2"], points: 100 }] 
  },
  {
     name: "Literature", 
     questions: [{ question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare", choices: ["William Shakespeare", "Mark Twain", "Jane Austen", "Charles Dickens"], points: 100 }] 
  },
  {
     name: "Geography", 
     questions: [{ question: "What is the capital of France?", answer: "Paris", choices: ["Paris", "Rome", "London", "Berlin"], points: 100 }] 
  },
  { 
    name: "Sports", 
    questions: [{ question: "How many players are on a soccer team?", answer: "11", choices: ["11", "10", "12", "9"], points: 100 }] 
  },
  { 
    name: "Sports", 
    questions: [{ question: "How many players are on a soccer team?", answer: "11", choices: ["11", "10", "12", "9"], points: 100 }] 
  }

];

let player1Score = 0;
let player2Score = 0;
let currentQuestion = null;
let currentPlayer = 1;

function initializeGame() {
  const gameBoard = document.getElementById("game-board");
  categories.forEach(category => {
    const categoryElement = document.createElement("div");
    categoryElement.className = "category";
    categoryElement.textContent = category.name;
    gameBoard.appendChild(categoryElement);
 
    category.questions.forEach(question => {
      const questionElement = document.createElement("div");
      questionElement.className = "question";
      questionElement.textContent = `$${question.points}`;
      questionElement.onclick = () => displayQuestion(question);
      gameBoard.appendChild(questionElement);
    });
  });

  // Set avatar images
  document.getElementById("player1-avatar").src = player1AvatarUrl;
  document.getElementById("player2-avatar").src = player2AvatarUrl;
}

function displayQuestion(question) {
  currentQuestion = question;
  document.getElementById("question-text").textContent = question.question;
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";
  
  question.choices.forEach(choice => {
    const choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    choiceButton.onclick = () => selectAnswer(choice);
    choicesDiv.appendChild(choiceButton);
  });

  document.getElementById("question-modal").classList.remove("hidden");
}

let selectedAnswer = null;

function selectAnswer(choice) {
  selectedAnswer = choice;
}

function submitAnswer() {
  if (!selectedAnswer) return alert("Please select an answer!");

  if (selectedAnswer === currentQuestion.answer) {
    if (currentPlayer === 1) {
      player1Score += currentQuestion.points;
      document.getElementById("player1-score").textContent = player1Score;
    } else {
      player2Score += currentQuestion.points;
      document.getElementById("player2-score").textContent = player2Score;
    }
    alert(`Correct! Player ${currentPlayer} gets ${currentQuestion.points} points.`);
  } else {
    alert(`Incorrect. The correct answer was: ${currentQuestion.answer}`);
  }

  currentPlayer = currentPlayer === 1 ? 2 : 1;
  document.getElementById("current-turn").textContent = `Player ${currentPlayer}`;

  document.getElementById("question-modal").classList.add("hidden");
  selectedAnswer = null;
}

window.onload = initializeGame;


