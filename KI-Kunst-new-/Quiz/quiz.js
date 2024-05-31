let currentQuestionIndex = 0;
let questions = [
  {
    question: "Von welcher Firma stammt ChatGPT?",
    answers: ["Microsoft", "Amazon", "OpenAI", "Google"],
    correctAnswer: 2
  },
  {
    question: "Von welcher Firma stammt",
    answers: ["Microsoft", "sheesh", "OpenAI", "sussy baka"],
    correctAnswer: 2
  }
]

let score = 0;

document.getElementById("questionHeadline").textContent = questions[0].question;

function displayQuestion(){

  //Answer Buttons
  questions[currentQuestionIndex].answers.forEach((answer, index) => {
    let newAnswerButton = document.createElement("button");
    newAnswerButton.className = "answerButton";
    newAnswerButton.id = "newAnswerButton";
    document.getElementById("answerButtons").appendChild(newAnswerButton).textContent = answer;
    
    newAnswerButton.onclick = () => {
      let userAnswer = index;
      if(userAnswer == questions[currentQuestionIndex].correctAnswer){
        score++;
      }
      currentQuestionIndex++;
    }
  })

  //Next Question
  document.getElementById("nextQuestionButton").onclick = () => {
    currentQuestionIndex++;
  }

}

displayQuestion();