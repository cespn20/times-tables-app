let correctCount = 0;
let totalCount = 0;
let currentProblem = {};

function generateProblem() {
    const tableSelect = document.getElementById('table-select');
    const selectedTable = tableSelect.value;
    
    let num1, num2;
    if (selectedTable === 'random') {
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
    } else if (selectedTable === '2and4') {
        // Randomly choose between 2 and 4 for one of the numbers
        const multiplier = Math.random() < 0.5 ? 2 : 4;
        // Randomly decide which number goes first
        if (Math.random() < 0.5) {
            num1 = multiplier;
            num2 = Math.floor(Math.random() * 12) + 1;
        } else {
            num1 = Math.floor(Math.random() * 12) + 1;
            num2 = multiplier;
        }
    } else {
        // For specific table practice, randomly decide which number goes first
        if (Math.random() < 0.5) {
            num1 = parseInt(selectedTable);
            num2 = Math.floor(Math.random() * 12) + 1;
        } else {
            num1 = Math.floor(Math.random() * 12) + 1;
            num2 = parseInt(selectedTable);
        }
    }
    
    currentProblem = { num1, num2 };
    
    document.getElementById('num1').textContent = num1;
    document.getElementById('num2').textContent = num2;
    document.getElementById('answer').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('answer').focus();
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    if (isNaN(userAnswer)) {
        document.getElementById('feedback').textContent = 'Please enter a number';
        document.getElementById('feedback').className = 'feedback incorrect';
        return;
    }

    totalCount++;
    document.getElementById('total-count').textContent = totalCount;

    fetch('/check_answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            num1: currentProblem.num1,
            num2: currentProblem.num2,
            answer: userAnswer
        })
    })
    .then(response => response.json())
    .then(data => {
        const feedback = document.getElementById('feedback');
        if (data.correct) {
            correctCount++;
            document.getElementById('correct-count').textContent = correctCount;
            feedback.textContent = 'Correct! Well done!';
            feedback.className = 'feedback correct';
            setTimeout(generateProblem, 1500);
        } else {
            feedback.textContent = `Incorrect. The answer is ${data.correct_answer}`;
            feedback.className = 'feedback incorrect';
            setTimeout(generateProblem, 2000);
        }
    });
}

document.getElementById('check').addEventListener('click', checkAnswer);
document.getElementById('answer').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});
document.getElementById('table-select').addEventListener('change', generateProblem);

// Generate first problem when page loads
generateProblem();
