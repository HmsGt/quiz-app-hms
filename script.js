// script.js

const validUsers = [
    { username: "Deangonzelz", password: "Dean1234" },
    { username: "Hms07", password: "Hms1234" },
    { username: "Hemant_Sharma", password: "Hemant1234" },
    { username: "Shivam_tyagi", password: "Shivam1234" }
];



// Function to handle form submission and authentication
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if the entered username and password match any valid user
    const validUser = validUsers.find(user => user.username === username && user.password === password);

    if (validUser) {
        // Hide the login container and show the quiz container
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('instruction-container').classList.add('hidden');
        document.getElementById('quiz-container').classList.remove('hidden');
        document.getElementById('bubble-navigation').classList.remove('hidden');
        showQuestion(currentQuestionIndex);
    } else {
        // Show a warning for incorrect credentials
        alert('You entered the wrong username or password. Please try again.');

        // Reload the login page to reset input fields
        location.reload();
    }
});




// script.js

const questions = [
    {
        question: "Question 1: What is the main advantage of building mass outreach capability with minimum resource engagement?",
        options: ["Cost efficiency", "High resource consumption", "Low impact", "Complex management"],
        answer: 0
    },
    {
        question: "Question 2: Which of the following is a key strategy in minimizing resource engagement?",
        options: ["Maximizing outputs", "Minimizing inputs", "Outsourcing", "Hiring more staff"],
        answer: 1
    },
    {
        question: "Question 3: What is a common method to build mass outreach?",
        options: ["One-on-one meetings", "Email campaigns", "Telemarketing", "Direct mail"],
        answer: 1
    },
    {
        question: "Question 4: Which tool can help in mass outreach?",
        options: ["Excel", "Google Analytics", "MailChimp", "Photoshop"],
        answer: 2
    },
    {
        question: "Question 5: Which platform is often used for mass outreach?",
        options: ["LinkedIn", "Slack", "Microsoft Teams", "Skype"],
        answer: 0
    },
    {
        question: "Question 6: How can social media aid in mass outreach?",
        options: ["Limiting reach", "Targeted advertising", "Reducing visibility", "Increasing costs"],
        answer: 1
    },
    {
        question: "Question 7: What is a benefit of email newsletters?",
        options: ["Personal interaction", "Broad audience reach", "High costs", "Slow delivery"],
        answer: 1
    },
    {
        question: "Question 8: What should be considered in resource engagement?",
        options: ["Maximizing costs", "Efficiency", "Increasing workforce", "Manual processes"],
        answer: 1
    },
    {
        question: "Question 9: What is a primary goal of mass outreach?",
        options: ["High engagement with low cost", "High cost and high engagement", "Low engagement and high cost", "Low engagement and low cost"],
        answer: 0
    },
    {
        question: "Question 10: Which of these is a measure of outreach success?",
        options: ["Reach", "Height", "Weight", "Length"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let answers = new Array(questions.length).fill(null);

document.addEventListener("DOMContentLoaded", () => {
    // Ensure the login page is active initially
    document.getElementById('login-container').classList.add('active');
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation for demonstration purposes
    if (username && password) {
        document.getElementById('login-container').classList.remove('active');
        document.getElementById('instruction-container').classList.add('active');
    } else {
        alert('Please enter valid credentials.');
    }
});

function startQuiz() {
    document.getElementById('instruction-container').classList.remove('active');
    document.getElementById('quiz-container').classList.add('active');
    loadQuestion(currentQuestionIndex);
    renderBubbles();
    updateButtons();
}

function loadQuestion(index) {
    const questionContainer = document.getElementById("question-container");
    const questionData = questions[index];

    questionContainer.innerHTML = `
        <h3>${questionData.question}</h3>
        ${questionData.options.map((option, i) => `
            <label>
                <input type="radio" name="answer" value="${i}" ${answers[index] == i ? "checked" : ""}>
                ${option}
            </label>
        `).join('')}
    `;
}

function renderBubbles() {
    const bubblesContainer = document.getElementById("bubbles-container");
    bubblesContainer.innerHTML = questions.map((_, index) => {
        let className = 'bubble';
        if (answers[index] === 'skipped') className += ' red';
        else if (answers[index] !== null) className += ' green';
        else className += ' white';
        return `<div class="${className}" onclick="goToQuestion(${index})">Q${index + 1}</div>`;
    }).join('');
}

function updateButtons() {
    document.getElementById("prev-button").style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
    document.getElementById("next-button").style.display = currentQuestionIndex === questions.length - 1 ? "none" : "inline-block";
    document.getElementById("submit-button").style.display = currentQuestionIndex === questions.length - 1 ? "inline-block" : "none";
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
        updateButtons();
    }
}

function nextQuestion() {
    const answer = document.querySelector('input[name="answer"]:checked');
    if (answer || answers[currentQuestionIndex] === 'skipped') {
        if (answer) answers[currentQuestionIndex] = parseInt(answer.value);
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
            renderBubbles();
            updateButtons();
        }
    } else {
        alert("Please select an answer or skip the question.");
    }
}

function skipQuestion() {
    answers[currentQuestionIndex] = 'skipped';
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
        renderBubbles();
        updateButtons();
    }
}

function goToQuestion(index) {
    currentQuestionIndex = index;
    loadQuestion(index);
    updateButtons();
}

function submitQuiz() {
    if (!confirm("Are you sure you want to submit?")) {
        return;
    }

    const score = answers.reduce((score, answer, index) => {
        return score + (answer === questions[index].answer ? 1 : 0);
    }, 0);

    document.querySelector(".quiz-container").style.display = "none";
    document.getElementById("score-container").style.display = "block";
    document.getElementById("score").textContent = `${score} / ${questions.length}`;
}

document.getElementById("question-container").addEventListener("change", (e) => {
    if (e.target.name === "answer") {
        answers[currentQuestionIndex] = parseInt(e.target.value);
        renderBubbles();
    }
});




