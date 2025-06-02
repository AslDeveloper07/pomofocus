"use strict";

const $HTML = document;

let pomodoroBtn = $HTML.querySelector("#pomodoroBtn");
let shortBreakBtn = $HTML.querySelector("#shortBreakBtn");
let longBreakBtn = $HTML.querySelector("#longBreakBtn");
let timerEl = $HTML.querySelector("#timerEl");
let startBtn = $HTML.querySelector("#startBtn");
let resetBtn = $HTML.querySelector("#resetBtn");

let pomodoro = 25;
let shortBreak = 5;
let longBreak = 15;

let pomodoroTime = pomodoro * 60;
let shortBreakTime = shortBreak * 60;
let longBreakTime = longBreak * 60;

let timer = pomodoroTime;

let pomodoroInterval;
let shortBreakInterval;
let longBreakInterval;


pomodoroBtn.addEventListener("click", () => {
  timer = pomodoroTime;
  timerEl.textContent = formatTime(timer);
  startBtn.textContent = "Start";
  clearInterval(pomodoroInterval);
  clearInterval(shortBreakInterval);
  clearInterval(longBreakInterval);

  shortBreakBtn.classList.remove("active-btn");
  pomodoroBtn.classList.add("active-btn");
  longBreakBtn.classList.remove("active-btn");
});

shortBreakBtn.addEventListener("click", () => {
  timer = shortBreakTime;
  timerEl.textContent = formatTime(timer);
  startBtn.textContent = "Start";
  clearInterval(pomodoroInterval);
  clearInterval(shortBreakInterval);
  clearInterval(longBreakInterval);

  shortBreakBtn.classList.add("active-btn");
  pomodoroBtn.classList.remove("active-btn");
  longBreakBtn.classList.remove("active-btn");
});

longBreakBtn.addEventListener("click", () => {
  timer = longBreakTime;
  timerEl.textContent = formatTime(timer);
  startBtn.textContent = "Start";
  clearInterval(pomodoroInterval);
  clearInterval(shortBreakInterval);
  clearInterval(longBreakInterval);

  shortBreakBtn.classList.remove("active-btn");
  pomodoroBtn.classList.remove("active-btn");
  longBreakBtn.classList.add("active-btn");


});

startBtn.addEventListener("click", () => {
  if (startBtn.textContent === "Start") {
    startBtn.textContent = "Pause";
    startTimer();
  } else {
    startBtn.textContent = "Start";
    clearInterval(pomodoroInterval);
    clearInterval(shortBreakInterval);
    clearInterval(longBreakInterval);
  }
});

resetBtn.addEventListener("click", () => {
  timer = pomodoroTime;
  timerEl.textContent = formatTime(timer);
  startBtn.textContent = "Start";
  clearInterval(pomodoroInterval);
  clearInterval(shortBreakInterval);
  clearInterval(longBreakInterval);
})

function startTimer() {
  pomodoroInterval = setInterval(() => {
    timer--;
    timerEl.textContent = formatTime(timer);
    if (timer === 0) {
      clearInterval(pomodoroInterval);
      longBreakInterval = setInterval(() => {
        timer--;
        timerEl.textContent = formatTime(timer);
        if (timer === 0) {
          clearInterval(longBreakInterval);
          startBtn.textContent = "Start";
        }
      }, 1000);
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

startBtn.textContent = "Start";

timerEl.textContent = formatTime(timer);
