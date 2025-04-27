"AI"
let workDuration = 25 * 60; // 25 minutes
let breakDuration = 5 * 60; // 5 minutes
let currentDuration = workDuration;
let timerInterval = null;
let isRunning = false;
let isWorkSession = true;
let pomodoroCount = 0;

const timerDisplay = document.getElementById('timer');
const sessionLabel = document.getElementById('session-label');
const pomodoroCounter = document.getElementById('pomodoro-count');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const progressBar = document.getElementById('progress-bar');
const alarmSound = document.getElementById('alarm-sound');

function updateTimerDisplay() {
    const minutes = Math.floor(currentDuration / 60);
    const seconds = currentDuration % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            currentDuration--;
            updateTimerDisplay();
            updateProgressBar();

            if (currentDuration <= 0) {
                clearInterval(timerInterval);
                isRunning = false;
                alarmSound.play();  // Play sound at end of session
                if (isWorkSession) {
                    pomodoroCount++;
                    pomodoroCounter.textContent = pomodoroCount;
                }
                switchSession();
            }
        }, 1000);
    }
}
function updateProgressBar() {
    let totalDuration = isWorkSession ? workDuration : breakDuration;
    let progress = ((totalDuration - currentDuration) / totalDuration) * 100;
    progressBar.style.width = `${progress}%`;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    currentDuration = isWorkSession ? workDuration : breakDuration;
    updateTimerDisplay();
    updateProgressBar();
}

function switchSession() {
    isWorkSession = !isWorkSession;
    sessionLabel.textContent = isWorkSession ? "Work Session" : "Break Session";
    sessionLabel.classList.add('fade');

    if (isWorkSession) {
        sessionLabel.classList.remove('break-session');
        progressBar.style.backgroundColor = '#4caf50'; // Green for work
    } else {
        sessionLabel.classList.add('break-session');
        progressBar.style.backgroundColor = '#2196f3'; // Blue for break
    }

    currentDuration = isWorkSession ? workDuration : breakDuration;
    updateTimerDisplay();
    updateProgressBar();

    setTimeout(() => sessionLabel.classList.remove('fade'), 1000);
}


function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    currentDuration = isWorkSession ? workDuration : breakDuration;
    updateTimerDisplay();
}

function switchSession() {
    isWorkSession = !isWorkSession;
    sessionLabel.textContent = isWorkSession ? "Work Session" : "Break Session";
    currentDuration = isWorkSession ? workDuration : breakDuration;
    updateTimerDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize
updateTimerDisplay();
