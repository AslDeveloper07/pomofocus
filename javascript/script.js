const showSettings = document.querySelectorAll(".settings");
const settingsModal = document.querySelector(".big_modal");

const ShowLogin = document.querySelectorAll(".profile");
const LoginModal = document.querySelector(".form");

const ShowMenu = document.querySelectorAll(".dot");
const menuModal = document.querySelector(".menu_modal");

const red =document.querySelector('red')
const purple =document.querySelector('purple')
const blue =document.querySelector('blue')

const pomodoro=document.querySelector('pomodoro')
const short=document.querySelector('short')
const long=document.querySelector('long')

const startBtn=document.querySelector('start')


const Overlay = document.querySelector(".overlay");

// SETTINGS MODAL
const openSettingsModal = () => {
  settingsModal.classList.remove("hidden");
  Overlay.classList.remove("hidden");
};
const closeSettingsModal = () => {
  settingsModal.classList.add("hidden");
  Overlay.classList.add("hidden");
};

// LOGIN MODAL
const openLoginModal = () => {
  LoginModal.classList.remove("hidden");
  Overlay.classList.remove("hidden");
};
const closeLoginModal = () => {
  LoginModal.classList.add("hidden");
  Overlay.classList.add("hidden");
};

// MENU MODAL (overlaysiz)
const toggleMenuModal = () => {
  menuModal.classList.toggle("hidden");
};

// .settings tugmalari
showSettings.forEach((btn) => {
  btn.addEventListener("click", openSettingsModal);
});

// .profile tugmalari
ShowLogin.forEach((btn) => {
  btn.addEventListener("click", openLoginModal);
});

// .dot tugmalari
ShowMenu.forEach((btn) => {
  btn.addEventListener("click", toggleMenuModal);
});

// Overlay bosilganda: settings va login modal yopiladi
Overlay.addEventListener("click", () => {
  closeSettingsModal();
  closeLoginModal();
});

// Escape tugmasi bosilganda: hammasi yopiladi
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSettingsModal();
    closeLoginModal();
    menuModal.classList.add("hidden");
  }
});
