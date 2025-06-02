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
const hour = document.querySelector("#hour");
const minut = document.querySelector("#minut");
const Overlay = document.querySelector(".overlay");
const forwardEndIcon = document.querySelector(".ri-forward-end-fill");
const darkTheme = document.querySelector("#dark_mode input[type='checkbox']");

// 🔊 Ovoz fayli
const clickSound = new Audio("sounds/click.mp3");

// Timer o'zgaruvchilari
let totalSeconds = 0;
let timerInterval;
let isRunning = false;
let isPaused = false;
let pausedSeconds = 0;
let currentColor = "red";
let currentMode = "pomodoro";

setPomo.value = "28";
shortPomo.value = "13";
longPomo.value = "10";
updateTimerDisplay(parseInt(setPomo.value), 0);


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

// Rang o'zgartirish
const changeColor = (color) => {
  currentColor = color;
  document.body.style.transition = "background-color 0.7s ease";
  if (!isRunning || !darkTheme.checked) {
    document.body.style.backgroundColor = getColorCode(color);
  }
};
const getColorCode = (color) => {
  switch (color) {
    case "red":
      return "#ff5c5c";
    case "purple":
      return "#9c5cff";
    case "blue":
      return "#5c9cff";
    default:
      return "#ff5c5c";
  }
};
function setActiveButton(activeBtn) {
  [pomodoro, short, long].forEach((btn) => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

// Timer funksiyalari
function startTimer() {
  if (!isPaused) {
    if (darkTheme.checked) {
      document.body.style.backgroundColor = "#000";
    }
    let minutes = 0;
    if (currentMode === "pomodoro") {
      minutes = parseInt(setPomo.value);
    } else if (currentMode === "short") {
      minutes = parseInt(shortPomo.value);
    } else if (currentMode === "long") {
      minutes = parseInt(longPomo.value);
    }
    totalSeconds = minutes * 60;
  } else {
    totalSeconds = pausedSeconds;
    isPaused = false;
  }

  if (timerInterval) clearInterval(timerInterval);

  if (darkTheme.checked) {
    document.body.style.backgroundColor = "#000";
  }

  startBtn.textContent = "Pause";
  isRunning = true;
  toggleForwardIcon(true);

  timerInterval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      isRunning = false;
      startBtn.textContent = "Start";
      toggleForwardIcon(false);
      return;
    }

    totalSeconds--;
    const minutesLeft = Math.floor(totalSeconds / 60);
    const secondsLeft = totalSeconds % 60;

    updateTimerDisplay(minutesLeft, secondsLeft);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  pausedSeconds = totalSeconds;
  isRunning = false;
  isPaused = true;
  startBtn.textContent = "Start";
  toggleForwardIcon(false);
  changeColor(currentColor);
}

function updatePageTitle(minutes, seconds) {
  const timeStr = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  document.title = `${timeStr} - Time for a break!`;
}

function updateTimerDisplay(minutes, seconds) {
  hour.textContent = minutes.toString().padStart(2, "0");
  minut.textContent = seconds.toString().padStart(2, "0");
  updatePageTitle(minutes, seconds);
}



// Input validatsiyasi
function validateInputs() {
  const inputs = [setPomo, shortPomo, longPomo];
  for (const input of inputs) {
    const val = input.value.trim();
    if (!/^\d{1,2}$/.test(val) || parseInt(val) > 59 || parseInt(val) === 0) {
      alert(
        "Bunday vaqt mavjud emas. Iltimos 2 xonali son kiriting (1–59 oralig'ida)."
      );
      return false;
    }
  }
  return true;
}

function toggleForwardIcon(show = true) {
  if (forwardEndIcon) {
    forwardEndIcon.classList.toggle("hidden", !show);
  }
}



// Ranglar
red.addEventListener("click", () => {
  changeColor("red");
  currentColor = "red";
});
purple.addEventListener("click", () => {
  changeColor("purple");
  currentColor = "purple";
});
blue.addEventListener("click", () => {
  changeColor("blue");
  currentColor = "blue";
});

// Pomodoro turini tanlash
pomodoro.addEventListener("click", () => {
  if (validateInputs()) {
    currentMode = "pomodoro";
    changeColor("red");
    updateTimerDisplay(parseInt(setPomo.value), 0);
    setActiveButton(pomodoro);
    if (isRunning || isPaused) stopTimer();
  }
});
short.addEventListener("click", () => {
  if (validateInputs()) {
    currentMode = "short";
    changeColor("purple");
    updateTimerDisplay(parseInt(shortPomo.value), 0);
    setActiveButton(short);
    if (isRunning || isPaused) stopTimer();
  }
});
long.addEventListener("click", () => {
  if (validateInputs()) {
    currentMode = "long";
    changeColor("blue");
    updateTimerDisplay(parseInt(longPomo.value), 0);
    setActiveButton(long);
    if (isRunning || isPaused) stopTimer();
  }
});




// Start tugmasi bosilganda
startBtn.addEventListener("click", () => {
  const clickSound = new Audio("./resources/music/click.wav");

  setTimeout(() => {
    clickSound.currentTime = 0;
    clickSound.play();
  }, 100);

  if (!isRunning && !isPaused) {
    if (!validateInputs()) return;
    if (currentMode === "pomodoro") {
      updateTimerDisplay(parseInt(setPomo.value), 0);
    } else if (currentMode === "short") {
      updateTimerDisplay(parseInt(shortPomo.value), 0);
    } else if (currentMode === "long") {
      updateTimerDisplay(parseInt(longPomo.value), 0);
    }
  }

  if (isRunning) {
    stopTimer();
  } else {
    startTimer();
  }
});

// Apply tugmasi
applyBtn.addEventListener("click", () => {
  if (validateInputs()) {
    if (currentMode === "pomodoro") {
      updateTimerDisplay(parseInt(setPomo.value), 0);
    } else if (currentMode === "short") {
      updateTimerDisplay(parseInt(shortPomo.value), 0);
    } else if (currentMode === "long") {
      updateTimerDisplay(parseInt(longPomo.value), 0);
    }
    closeSettingsModal();
  }
});

// Enter bosilganda apply bosilsin
[setPomo, shortPomo, longPomo].forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      applyBtn.click();
    }
  });
});

// Modal eventlari
showSettings.forEach((btn) => btn.addEventListener("click", openSettingsModal));
ShowLogin.forEach((btn) =>
  btn.addEventListener("click", () => (location.href = "sigin.html"))
);
ShowMenu.forEach((btn) => btn.addEventListener("click", toggleMenuModal));

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
forwardEndIcon.addEventListener("click", () => {
  // Short tugmasini bosgandek qilamiz
  short.click();

  // Hozirgi hour va minut qiymatlarini olamiz
  let startMinutes = parseInt(hour.textContent);
  let startSeconds = parseInt(minut.textContent);

  // Noto‘g‘ri qiymat bo‘lsa chiqib ketamiz
  if (isNaN(startMinutes) || isNaN(startSeconds)) return;

  // Umumiy soniyalarni hisoblaymiz
  let totalSecondsLeft = startMinutes * 60 + startSeconds;

  // 0 yoki manfiy bo‘lsa, hech narsa qilinmaydi
  if (totalSecondsLeft <= 0) return;

  // Sanashni boshlaymiz
  const countdownInterval = setInterval(() => {
    if (totalSecondsLeft <= 0) {
      clearInterval(countdownInterval);
      return;
    }

    totalSecondsLeft--;

    // Yangilangan daqiqa va soniya
    const newMinutes = Math.floor(totalSecondsLeft / 60);
    const newSeconds = totalSecondsLeft % 60;

    // Ekranni yangilash
    hour.textContent = newMinutes.toString().padStart(2, "0");
    minut.textContent = newSeconds.toString().padStart(2, "0");

    // Sahifa title ham yangilanadi
    updatePageTitle(newMinutes, newSeconds);
  }, 1000);
});




















