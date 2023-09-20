const questions = [
    {
        question: "Mike is the only one of those students who _________ passed the exam.",
        optionA: "have",
        optionB: "has",
        optionC: "are",
        optionD: "is",
        correctOption: "optionB"
    },

    {
        question: "John, along with his friends, ________ going to the party.",
        optionA: "are",
        optionB: "is",
        optionC: "have",
        optionD: "has",
        correctOption: "optionB"
    },

    {
        question: "She _________ a letter when I came.",
        optionA: "wrote",
        optionB: "was writing",
        optionC: "has written",
        optionD: "writes",
        correctOption: "optionB"
    },

    {
        question: "If it _________, we will stay at home.",
        optionA: "rains",
        optionB: "will rain",
        optionC: "rained",
        optionD: "rain",
        correctOption: "optionA"
    },

    {
        question: "They _________ TV when the phone rang.",
        optionA: "watched",
        optionB: "were watching",
        optionC: "are watching",
        optionD: "watch",
        correctOption: "optionB"
    },

    {
        question: "Despite of _________, he managed to finish his homework on time.",
        optionA: "tired",
        optionB: "tiredness",
        optionC: "tiring",
        optionD: "to tire",
        correctOption: "optionB"
    },

    {
        question: "_________, she could not answer the question?",
        optionA: "As much as she tried",
        optionB: "As she much tried",
        optionC: "As tried she much",
        optionD: "As much tried she",
        correctOption: "optionA"
    },

    {
        question: "The pie, _________ was very delicious, was made by Grandma.",
        optionA: "which",
        optionB: "who",
        optionC: "where",
        optionD: "whose",
        correctOption: "optionA"
    },

    {
        question: "The book _________ Mary was reading is very interesting.",
        optionA: "who",
        optionB: "whom",
        optionC: "where",
        optionD: "that",
        correctOption: "optionD"
    },

    {
        question: "The man _________ lives next door is very friendly.",
        optionA: "who",
        optionB: "which",
        optionC: "where",
        optionD: "whom",
        correctOption: "optionA"
    },

    {
        question: "I wish you would tell me_____",
        optionA: "Who is being lived next door",
        optionB: "Who does live in the next door",
        optionC: "Who lives next door",
        optionD: "Who next door was living",
        correctOption: "optionC"
    },
  
    {
        question: "During the Daytona, the lead car _________ leaving the others far behind",
        optionA: "Forward far behind",
        optionB: "Advanced rapidly",
        optionC: "Advance forward rapidly",
        optionD: "Advanced in a rapidly manner",
        correctOption: "optionB"
    },

    {
        question: "Refugee migration is at ________ worldwide",
        optionA: "An all time high",
        optionB: "The all time high",
        optionC: "All times high",
        optionD: "The high all time",
        correctOption: "optionA"
    },

    {
        question: "_________ the demands of aerospace, medicine, and agriculture, aengineers, are creating exotic new metallic substances.",
        optionA: "Meet",
        optionB: "Being met are",
        optionC: "To meet",
        optionD: "They are meeting",
        correctOption: "optionC"
    },

    {
        question: "Mary Garden, ______ the early 1900s was considered one of the best singing actresses of her time.",
        optionA: "a soprano was popular",
        optionB: "in a popular soprano",
        optionC: "was a popular soprano",
        optionD: "a popular soprano in",
        correctOption: "optionA"
    },

]

let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}

let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}

function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })
   
    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}

//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"
}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}

