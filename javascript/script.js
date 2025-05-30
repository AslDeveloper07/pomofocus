// // DOM elementlari
// const showSettings = document.querySelectorAll(".settings");
// const settingsModal = document.querySelector(".big_modal");
// const ShowLogin = document.querySelectorAll(".profile");
// const LoginModal = document.querySelector(".form");
// const ShowMenu = document.querySelectorAll(".dot");
// const menuModal = document.querySelector(".menu_modal");
// const red = document.querySelector(".red");
// const purple = document.querySelector(".purple");
// const blue = document.querySelector(".blue");
// const pomodoro = document.querySelector(".pomodoro");
// const short = document.querySelector(".short");
// const long = document.querySelector(".long");
// const startBtn = document.querySelector(".start");
// const applyBtn = document.querySelector(".apply");
// const setPomo = document.getElementById("pomo_lab");
// const shortPomo = document.getElementById("short_lab");
// const longPomo = document.getElementById("long_lab");
// const numberPomo = document.getElementById("number");
// const darkTheme = document.getElementById("dark_mode");
// const hour = document.querySelector("#hour");
// const minut = document.querySelector("#minut");
// const Overlay = document.querySelector(".overlay");




// DOM elementlari
const showSettings = document.querySelectorAll(".settings");
const settingsModal = document.querySelector(".big_modal");
const ShowLogin = document.querySelectorAll(".profile");
const LoginModal = document.querySelector(".form");
const ShowMenu = document.querySelectorAll(".dot");
const menuModal = document.querySelector(".menu_modal");
const red = document.querySelector(".red");
const purple = document.querySelector(".purple");
const blue = document.querySelector(".blue");
const pomodoro = document.querySelector(".pomodoro");
const short = document.querySelector(".short");
const long = document.querySelector(".long");
const startBtn = document.querySelector(".start");
const applyBtn = document.querySelector(".apply");
const setPomo = document.getElementById("pomo_lab");
const shortPomo = document.getElementById("short_lab");
const longPomo = document.getElementById("long_lab");
const numberPomo = document.getElementById("number");
const darkTheme = document.getElementById("dark_mode");
const hour = document.querySelector("#hour");
const minut = document.querySelector("#minut");
const Overlay = document.querySelector(".overlay");

// Timer o'zgaruvchilari
let totalSeconds = 0;
let timerInterval;
let isRunning = false;
let isPaused = false;
let pausedSeconds = 0;
let currentColor = 'red';

// Boshlang'ich sozlamalar
setPomo.value = "28";
shortPomo.value = "13";
longPomo.value = "10";
updateTimerDisplay(28, 0);

// Modal funksiyalari
const openSettingsModal = () => {
  settingsModal.classList.remove("hidden");
  Overlay.classList.remove("hidden");
};

const closeSettingsModal = () => {
  settingsModal.classList.add("hidden");
  Overlay.classList.add("hidden");
};

const openLoginModal = () => {
  LoginModal.classList.remove("hidden");
  Overlay.classList.remove("hidden");
};

const closeLoginModal = () => {
  LoginModal.classList.add("hidden");
  Overlay.classList.add("hidden");
};

const toggleMenuModal = () => {
  menuModal.classList.toggle("hidden");
};

// Ranglarni o'zgartirish
const changeColor = (color) => {
  currentColor = color;
  document.body.style.transition = "background-color 0.7s ease";
  if (!isRunning || !darkTheme.checked) {
    document.body.style.backgroundColor = getColorCode(color);
  }
};

const getColorCode = (color) => {
  switch (color) {
    case 'red': return '#ff5c5c';
    case 'purple': return '#9c5cff';
    case 'blue': return '#5c9cff';
    default: return '#ff5c5c';
  }
};

// Active sinfni boshqarish
function setActiveButton(activeBtn) {
  [pomodoro, short, long].forEach(btn => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

// Timer funksiyalari
function startTimer() {
  if (!isPaused) {
    const minutes = parseInt(hour.textContent) || 0;
    const seconds = parseInt(minut.textContent) || 0;
    totalSeconds = minutes * 60 + seconds;
  } else {
    totalSeconds = pausedSeconds;
    isPaused = false;
  }

  if (timerInterval) clearInterval(timerInterval);

  if (darkTheme.checked) {
    document.body.style.backgroundColor = "#121212";
  }

  startBtn.textContent = "Pause";
  isRunning = true;

  timerInterval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      isRunning = false;
      startBtn.textContent = "Start";
      return;
    }

    totalSeconds--;
    const minutesLeft = Math.floor(totalSeconds / 60);
    const secondsLeft = totalSeconds % 60;

    hour.textContent = minutesLeft.toString().padStart(2, '0');
    minut.textContent = secondsLeft.toString().padStart(2, '0');
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  pausedSeconds = totalSeconds;
  isRunning = false;
  isPaused = true;
  startBtn.textContent = "Start";
  changeColor(currentColor);
}

function updateTimerDisplay(minutes, seconds) {
  hour.textContent = minutes.toString().padStart(2, '0');
  minut.textContent = seconds.toString().padStart(2, '0');
}

// Input validatsiyasi
function validateInputs() {
  const inputs = [setPomo, shortPomo, longPomo];
  for (const input of inputs) {
    const val = input.value.trim();
    if (!/^\d{1,2}$/.test(val) || parseInt(val) > 59) {
      alert("Bunday vaqt mavjud emas. Iltimos 2 xonali son kiriting (0–59 oralig'ida).");
      return false;
    }
  }
  return true;
}

// Event listenerlar
red.addEventListener("click", () => changeColor('red'));
purple.addEventListener("click", () => changeColor('purple'));
blue.addEventListener("click", () => changeColor('blue'));

pomodoro.addEventListener("click", () => {
  if (validateInputs()) {
    changeColor('red');
    updateTimerDisplay(parseInt(setPomo.value), 0);
    setActiveButton(pomodoro);
    if (isRunning) stopTimer();
  }
});

short.addEventListener("click", () => {
  if (validateInputs()) {
    changeColor('purple');
    updateTimerDisplay(parseInt(shortPomo.value), 0);
    setActiveButton(short);
    if (isRunning) stopTimer();
  }
});

long.addEventListener("click", () => {
  if (validateInputs()) {
    changeColor('blue');
    updateTimerDisplay(parseInt(longPomo.value), 0);
    setActiveButton(long);
    if (isRunning) stopTimer();
  }
});

startBtn.addEventListener("click", () => {
  const forwardEndIcon = document.querySelector(".ri-forward-end-fill");

  if (!isRunning && !isPaused) {
    if (!validateInputs()) return;

    if (pomodoro.classList.contains("active")) {
      updateTimerDisplay(parseInt(setPomo.value), 0);
    } else if (short.classList.contains("active")) {
      updateTimerDisplay(parseInt(shortPomo.value), 0);
    } else if (long.classList.contains("active")) {
      updateTimerDisplay(parseInt(longPomo.value), 0);
    }
  }

  if (isRunning) {
    stopTimer();
  } else {
    startTimer();
  }

  if (forwardEndIcon) {
    forwardEndIcon.classList.toggle("hidden");
  }
});


applyBtn.addEventListener("click", () => {
  if (validateInputs()) {
    if (pomodoro.classList.contains("active")) {
      updateTimerDisplay(parseInt(setPomo.value), 0);
    } else if (short.classList.contains("active")) {
      updateTimerDisplay(parseInt(shortPomo.value), 0);
    } else if (long.classList.contains("active")) {
      updateTimerDisplay(parseInt(longPomo.value), 0);
    }
    closeSettingsModal();
  }
});

// Modal eventlari
showSettings.forEach((btn) => {
  btn.addEventListener("click", openSettingsModal);
});

ShowLogin.forEach((btn) => {
  btn.addEventListener("click", openLoginModal);
});

ShowMenu.forEach((btn) => {
  btn.addEventListener("click", toggleMenuModal);
});

Overlay.addEventListener("click", () => {
  closeSettingsModal();
  closeLoginModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSettingsModal();
    closeLoginModal();
    menuModal.classList.add("hidden");
  }
});
