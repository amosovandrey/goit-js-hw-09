const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeBodyColor() {
  document.querySelector('body').style.backgroundColor = getRandomHexColor();
}

const DELAY = 1000;
let timerID = null;

function onStartClick() {
  timerID = setInterval(changeBodyColor, DELAY);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function onStopClick() {
  clearInterval(timerID);
  startBtn.disabled = false;
}
