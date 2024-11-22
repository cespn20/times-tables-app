// Wait for DOM to be fully loaded before starting
document.addEventListener('DOMContentLoaded', function() {
    let correctCount = 0;
    let totalCount = 0;
    let currentProblem = {};
    let completedProblems = new Set();
    let masteredTables = new Set();
    const PROBLEMS_PER_SET = 12;  // Since multiplication tables go from 1 to 12

    // Get DOM elements
    const trophyContainer = document.getElementById('trophy-container');
    const checkButton = document.getElementById('check');
    const answerInput = document.getElementById('answer');
    const tableSelect = document.getElementById('table-select');
    const feedback = document.getElementById('feedback');
    const num1Span = document.getElementById('num1');
    const num2Span = document.getElementById('num2');
    const correctCountSpan = document.getElementById('correct-count');
    const totalCountSpan = document.getElementById('total-count');
    const setsList = document.getElementById('sets-list');

    // Initialize scoreboard
    function initializeScoreboard() {
        // Clear existing items
        setsList.innerHTML = '';
        
        // Add items for numbers 1-12
        for (let i = 1; i <= 12; i++) {
            const setItem = document.createElement('div');
            setItem.className = 'set-item';
            setItem.id = `set-${i}`;
            
            const trophy = document.createElement('span');
            trophy.className = 'trophy-icon';
            trophy.innerHTML = '🏆';
            trophy.style.opacity = '0.3';
            
            const text = document.createElement('span');
            text.textContent = `${i} Times Table`;
            
            setItem.appendChild(trophy);
            setItem.appendChild(text);
            setsList.appendChild(setItem);
        }
    }

    function updateScoreboard(completedTable) {
        const setItem = document.getElementById(`set-${completedTable}`);
        if (setItem) {
            setItem.classList.add('completed');
            const trophy = setItem.querySelector('.trophy-icon');
            if (trophy) {
                trophy.style.opacity = '1';
            }
        }
    }

    function showTrophy() {
        console.log('Showing trophy!');
        if (!trophyContainer) {
            console.error('Trophy container not found!');
            return;
        }
        
        // Add the show class to display the trophy
        trophyContainer.classList.add('show');
        
        // Check if confetti function exists
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else {
            console.error('Confetti function not found!');
        }
        
        // Update scoreboard for the completed table
        const selectedTable = parseInt(tableSelect.value);
        if (!masteredTables.has(selectedTable)) {
            masteredTables.add(selectedTable);
            updateScoreboard(selectedTable);
        }
        
        setTimeout(() => {
            trophyContainer.classList.remove('show');
            completedProblems.clear();  // Reset for the next set
        }, 3000);
    }

    function generateProblem() {
        const selectedTable = tableSelect.value;
        
        let num1, num2;
        if (selectedTable === 'random') {
            num1 = Math.floor(Math.random() * 12) + 1;
            num2 = Math.floor(Math.random() * 12) + 1;
        } else if (selectedTable === '2and4') {
            const multiplier = Math.random() < 0.5 ? 2 : 4;
            if (Math.random() < 0.5) {
                num1 = multiplier;
                num2 = Math.floor(Math.random() * 12) + 1;
            } else {
                num1 = Math.floor(Math.random() * 12) + 1;
                num2 = multiplier;
            }
        } else {
            // For specific table practice
            const fixedNumber = parseInt(selectedTable);
            let variableNumber;
            do {
                variableNumber = Math.floor(Math.random() * 12) + 1;
            } while (completedProblems.has(variableNumber) && completedProblems.size < PROBLEMS_PER_SET);

            if (completedProblems.size >= PROBLEMS_PER_SET) {
                completedProblems.clear();  // Reset if we've done all problems
            }

            if (Math.random() < 0.5) {
                num1 = fixedNumber;
                num2 = variableNumber;
            } else {
                num1 = variableNumber;
                num2 = fixedNumber;
            }
        }
        
        currentProblem = { num1, num2 };
        
        num1Span.textContent = num1;
        num2Span.textContent = num2;
        answerInput.value = '';
        feedback.textContent = '';
        answerInput.focus();
    }

    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value);
        if (isNaN(userAnswer)) {
            feedback.textContent = 'Please enter a number';
            feedback.className = 'feedback incorrect';
            return;
        }

        totalCount++;
        totalCountSpan.textContent = totalCount;

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
            if (data.correct) {
                correctCount++;
                correctCountSpan.textContent = correctCount;
                feedback.textContent = 'Correct! Well done!';
                feedback.className = 'feedback correct';

                const selectedTable = tableSelect.value;
                
                if (selectedTable !== 'random' && selectedTable !== '2and4') {
                    // Add the completed problem to our set
                    const variableNumber = (currentProblem.num1 == parseInt(selectedTable)) 
                        ? currentProblem.num2 
                        : currentProblem.num1;
                    completedProblems.add(variableNumber);
                    
                    console.log('Completed problems:', Array.from(completedProblems));
                    console.log('Set size:', completedProblems.size);

                    // Check if we've completed all problems in the set
                    if (completedProblems.size === PROBLEMS_PER_SET) {
                        console.log('All problems completed! Showing trophy...');
                        showTrophy();
                    }
                }

                setTimeout(generateProblem, 1500);
            } else {
                feedback.textContent = `Incorrect. The answer is ${data.correct_answer}`;
                feedback.className = 'feedback incorrect';
                setTimeout(generateProblem, 2000);
            }
        });
    }

    // Set up event listeners
    checkButton.addEventListener('click', checkAnswer);
    
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
    
    tableSelect.addEventListener('change', () => {
        completedProblems.clear();  // Reset completed problems when changing tables
        generateProblem();
    });

    // Initialize the scoreboard
    initializeScoreboard();

    // Generate first problem
    generateProblem();
});
