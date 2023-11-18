//Info Page (Accordion)
const accordion = document.getElementsByClassName('container');

for (i=0; i<accordion.length; i++) {
accordion[i].addEventListener('click', function () {
    this.classList.toggle('active')
})
}

//Quiz Page
let timeLeft = document.querySelector(".time-left")
let quizContainer = document.getElementById("container")
let nextBtn = document.getElementById("next-button")
let countOfQuestion = document.querySelector(".number-of-question")
let displayContainer = document.getElementById("display-container")
let scoreContainer = document.querySelector(".score-container")
let restart = document.getElementById("restart")
let userScore = document.getElementById("user-score")
let result = document.getElementById("result")
let startScreen = document.querySelector(".start-screen")
let startButton = document.getElementById("start-button")
let questionCount
let scoreCount = 0
let count = 11
let countdown

//Questions and Options array
const quizArray = [
    {
        id: "0",
        question: "Which of these is not a Initiator?",
        options: ["Skye", "Fade", "KAY/O", "Chamber"],
        correct: "Chamber",
    },
    {
        id: "1",
        question: "What role is Neon?",
        options: ["Duelist", "Sentinel", "Controller", "Initiator"],
        correct: "Duelist",
    },
    {
        id: "2",
        question: "How many rounds are needed to win the game?",
        options: ["8 rounds", "11 rounds", "13 rounds", "16 rounds"],
        correct: "13 rounds",
    },
    {
        id: "3",
        question: "How are the characters called in valorant?",
        options: ["Soldiers", "Assasins", "Players", "Agents"],
        correct: "Agents",
    },
    {
        id: "4",
        question: "Where does harbor come from?",
        options: ["Philippines", "China", "India", "Vietnam"],
        correct: "India",
    },
    {
        id: "5",
        question: "Who is the oldest agents",
        options: ["Chamber", "Brimstone", "Viper", "Reyna"],
        correct: "Brimstone",
    }, {
        id: "6",
        question: "Which one of these isn't an agent?",
        options: ["Sage", "Jett", "Reyna", "OSI"],
        correct: "OSI",
    },
    {
        id: "7",
        question: "Which of these is not a Duelist?",
        options: ["Jett", "Neon", "Phoenix", "Astra"],
        correct: "Astra",
    },
    {
        id: "8",
        question: "Which one is not Valorant maps?",
        options: ["Icebox", "Bind", "Ascent", "Hookah"],
        correct: "Hookah",
    },
    {
        id: "9",
        question: "What date is Valorant released",
        options: ["June 22, 2020", "July 20, 2020", "June 20, 2020", "July 13, 2021"],
        correct: "June 20, 2020",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        questionCount += 1;
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount
            if (scoreCount >= 9) {
                result.innerHTML = "Congratulations! You scored very high on the quiz. You are a true Valorant fans!";
            } else if (scoreCount >= 7) {
                result.innerHTML = "Good job! You scored well on the quiz. You obviously know a lot about Valorant.";
            } else if (scoreCount >= 4) {
                result.innerHTML = "You may want to brush up on your knowledge of Valorant, but you are on the right track.";
            } else if (scoreCount <= 3) {
                result.innerHTML = "Dont be sad! let's try another game!";
            } 
            
            
        } else {
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

function quizCreator() {
    quizArray.sort(() => Math.random() - 0.5);
    for (let i of quizArray) {
        i.options.sort(() => Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
        <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Cek Answer
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");

        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //stop timer
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};