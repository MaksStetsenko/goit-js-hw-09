import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// CSS ==========================================

const timer = document.querySelector('.timer');
const fields = document.querySelectorAll('.field');
const timeValues = document.querySelectorAll('.value');
const lables = document.querySelectorAll('.label');

for (const field of fields) {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.alignItems = 'center';
  field.style.margin = '8px';
}

timer.style.display = 'flex';

for (const value of timeValues) {
  value.style.fontSize = '48px';
}

for (const label of lables) {
  label.style.fontSize = '24px';
}

// ================================================

const startBtn = document.querySelector('[data-start]');
const valueOfDays = document.querySelector('[data-days]');
const valueOfHours = document.querySelector('[data-hours]');
const valueOfMinutes = document.querySelector('[data-minutes]');
const valueOfSeconds = document.querySelector('[data-seconds]');

// ===================================================

let targetTime = null;
let timeInt = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future');
    }
    console.log(selectedDates[0]);
    if (selectedDates[0] > new Date()) {
      targetTime = selectedDates[0];
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

const count = () => {
  timeInt = setInterval(counter, 1000);
  startBtn.disabled = true;
};

function counter() {
  let deltaTime = targetTime - new Date();
  const time = convertMs(deltaTime);

  if (deltaTime === 0) {
    Notiflix.Notify.success('Время вышло');
    clearInterval(timeInt);
    return;
  }
  updateValueTime(time);
}

function updateValueTime({ days, hours, minutes, seconds }) {
  valueOfDays.textContent = `${days}`;
  valueOfHours.textContent = `${hours}`;
  valueOfMinutes.textContent = `${minutes}`;
  valueOfSeconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// ================================================

startBtn.addEventListener('click', count);
