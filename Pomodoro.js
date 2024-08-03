let allTypes = document.querySelectorAll(".container .time-options button");
let timer = document.querySelector(".container .progress-bar h3");
let startButton = document.querySelector(".container .control-buttons .start-button");
let stopButton = document.querySelector(".container .control-buttons .stop-button");
let resetButton = document.querySelector(".container .control-buttons .reset-button");
let circularProgressBar = document.querySelector(".container .progress-bar");

const audio = new Audio('Sound_Effect/bip_alarm.mp3');

let getType =(elem, type) =>{
    for(x of allTypes) {
        x.classList.remove("active"); //Retire la classe "Active"
    }
    elem.classList.add("active"); //Ajoute la classe "Active"
    pomodoroType = type;
    resetTimer();
}

const timer_type_pomodoro = "Pomodoro";
const timer_type_shortbreak = "Shortbreak";
const timer_type_longbreak = "Longbreak";

let pomodoroType = timer_type_pomodoro; //Pomodoro en valeur par default

const pomodoroTimeInSec = 1500; //60sec x 25min = 1500
const shortBreakInSec = 300; //60sec x 5min = 300
const longBreakInSec = 900; //60sec x 15min = 900
let timerValue = pomodoroTimeInSec; //Pomodoro en valeur par default

let multipleFactor = 360 / timerValue; 
let progressInterval;

let resetTimer = () => {
    clearInterval(progressInterval);
    startButton.style.display = "block";
    stopButton.style.display = "none";
    if (pomodoroType === "Pomodoro") {
        timerValue = pomodoroTimeInSec;
    } else if (pomodoroType === "Shortbreak") {
        timerValue = shortBreakInSec;
    } else {
        timerValue = longBreakInSec;
    }
    multipleFactor = 360 / timerValue; 
    timerProgress();
    audio.stop();
}

let FormatedNumerInMinutes =(number) =>{
    //Formatage des nombres en minutes
    let minutes = Math.trunc(number / 60).toString().padStart(2, '0');
    //Formatage des nombres en secondes
    let secondes = Math.trunc(number % 60).toString().padStart(2, '0');

    return `${minutes} : ${secondes}`;
}

let timerProgress =() =>{
    if (timerValue === 0) {
        stopTimer();
        audio.play();
    }
    timer.innerHTML = `${FormatedNumerInMinutes(timerValue)}`;
    circularProgressBar.style.background = `conic-gradient(#664efe ${timerValue * multipleFactor}deg, #422f66 0deg)`;
}

let startTimer =() =>{
    progressInterval = setInterval(()=>{
        timerValue--;
        timerProgress();
    }, 1000);
    startButton.style.display = "none";
    stopButton.style.display = "block";
}

let stopTimer =() =>{
    clearInterval(progressInterval);
    startButton.style.display = "block";
    stopButton.style.display = "none";
}

stopButton.addEventListener("click", stopTimer);
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);