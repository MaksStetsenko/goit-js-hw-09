const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

// ====================================================

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// ====================================================

let intervalId = null;

const onStartBtn = event => {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
};

const onStopBtn = event => {
  clearInterval(intervalId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

// ====================================================

startBtn.addEventListener('click', onStartBtn);

stopBtn.addEventListener('click', onStopBtn);
