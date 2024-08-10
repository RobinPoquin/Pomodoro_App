let allTypes = document.querySelectorAll(".container .time-options button");
let timer = document.querySelector(".container .progress-bar h3");
let startButton = document.querySelector(".container .control-buttons .start-button");
let stopButton = document.querySelector(".container .control-buttons .stop-button");
let resetButton = document.querySelector(".container .control-buttons .reset-button");
let circularProgressBar = document.querySelector(".container .progress-bar");

const audio = new Audio('Sound_Effect/bip_alarm.mp3');

let isDeepWorkMode = false;

let getType = (elem, type) => {
    for (let x of allTypes) {
        x.classList.remove("active"); // Retire la classe "Active"
    }
    elem.classList.add("active"); // Ajoute la classe "Active"
    pomodoroType = type;
    resetTimer();
}

const timer_type_pomodoro = "Pomodoro";
const timer_type_shortbreak = "Shortbreak";
const timer_type_longbreak = "Longbreak";
const timer_type_deepwork1h = "DeepWork1h";
const timer_type_deepwork1h30 = "DeepWork1h30";

let pomodoroType = timer_type_pomodoro; // Pomodoro en valeur par défaut

const pomodoroTimeInSec = 1500; // 60sec x 25min = 1500
const shortBreakInSec = 300; // 60sec x 5min = 300
const longBreakInSec = 900; // 60sec x 15min = 900
const deepWork1hInSec = 3600; // 60sec x 60min = 3600 (1h)
const deepWork1h30InSec = 5400; // 60sec x 90min = 5400 (1h30)
const deepWorkShortBreakInSec = 900; // 60sec x 15min = 900 (15min)
const deepWorkLongBreakInSec = 1500; // 60sec x 25min = 1500 (25min)
let timerValue = pomodoroTimeInSec; // Pomodoro en valeur par défaut

let multipleFactor = 360 / timerValue; 
let progressInterval;

let resetTimer = () => {
    clearInterval(progressInterval);
    startButton.style.display = "block";
    stopButton.style.display = "none";
    if (pomodoroType === timer_type_pomodoro) {
        timerValue = pomodoroTimeInSec;
    } else if (pomodoroType === timer_type_shortbreak) {
        timerValue = shortBreakInSec;
    } else if (pomodoroType === timer_type_longbreak) {
        timerValue = longBreakInSec;
    } else if (pomodoroType === timer_type_deepwork1h) {
        timerValue = deepWork1hInSec;
    } else if (pomodoroType === timer_type_deepwork1h30) {
        timerValue = deepWork1h30InSec;
    } 
    multipleFactor = 360 / timerValue; 
    timerProgress();
    audio.stop();
}

let FormatedNumerInMinutes = (number) => {
    // Formatage des nombres en minutes
    let minutes = Math.trunc(number / 60).toString().padStart(2, '0');
    // Formatage des nombres en secondes
    let secondes = Math.trunc(number % 60).toString().padStart(2, '0');

    return `${minutes} : ${secondes}`;
}

let timerProgress = () => {
    if (timerValue === 0) {
        stopTimer();
        audio.play();
    }
    timer.innerHTML = `${FormatedNumerInMinutes(timerValue)}`;
    circularProgressBar.style.background = `conic-gradient(#664efe ${timerValue * multipleFactor}deg, #422f66 0deg)`;
}

let startTimer = () => {
    progressInterval = setInterval(() => {
        timerValue--;
        timerProgress();
    }, 1000);
    startButton.style.display = "none";
    stopButton.style.display = "block";
}

let stopTimer = () => {
    clearInterval(progressInterval);
    startButton.style.display = "block";
    stopButton.style.display = "none";
}

let toggleMode = () => {
    isDeepWorkMode = !isDeepWorkMode;

    // Change the available buttons based on the mode
    if (isDeepWorkMode) {
        document.querySelector(".pomodoro").style.display = "none";
        document.querySelector(".short-break").style.display = "none";
        document.querySelector(".long-break").style.display = "none";
        document.querySelector(".deepwork-1h").style.display = "inline-block";
        document.querySelector(".deepwork-1h30").style.display = "inline-block";
        document.querySelector(".mode-toggle-button").innerText = "Mode Pomodoro";
        getType(document.querySelector(".deepwork-1h"), timer_type_deepwork1h); // Default to 1h
    } else {
        document.querySelector(".pomodoro").style.display = "inline-block";
        document.querySelector(".short-break").style.display = "inline-block";
        document.querySelector(".long-break").style.display = "inline-block";
        document.querySelector(".deepwork-1h").style.display = "none";
        document.querySelector(".deepwork-1h30").style.display = "none";
        document.querySelector(".mode-toggle-button").innerText = "Mode Deep Work";
        getType(document.querySelector(".pomodoro"), timer_type_pomodoro); // Default to Pomodoro
    }
};

window.onload = () => {
    toggleMode(); // Initialize in Pomodoro mode
};

stopButton.addEventListener("click", stopTimer);
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
