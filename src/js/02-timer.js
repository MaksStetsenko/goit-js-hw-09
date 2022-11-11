import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// ===================================================

const refs = {
  // This for CSS
  timer: document.querySelector('.timer'),
  fields: document.querySelectorAll('.field'),
  timeValues: document.querySelectorAll('.value'),
  lables: document.querySelectorAll('.label'),
  // This for timer
  startBtn: document.querySelector('[data-start]'),
  valueOfDays: document.querySelector('[data-days]'),
  valueOfHours: document.querySelector('[data-hours]'),
  valueOfMinutes: document.querySelector('[data-minutes]'),
  valueOfSeconds: document.querySelector('[data-seconds]'),
};

// CSS ==========================================

for (const field of refs.fields) {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.alignItems = 'center';
  field.style.margin = '8px';
}

refs.timer.style.display = 'flex';

for (const value of refs.timeValues) {
  value.style.fontSize = '48px';
}

for (const label of refs.lables) {
  label.style.fontSize = '24px';
}

// ================================================

let targetTime = null;
let timeInt = null;

refs.startBtn.disabled = true;

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
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

const count = () => {
  timeInt = setInterval(counter, 1000);
  refs.startBtn.disabled = true;
};

function counter() {
  let deltaTime = targetTime - new Date();
  const time = convertMs(deltaTime);

  if (deltaTime <= 0) {
    Notiflix.Notify.success('Время вышло');
    clearInterval(timeInt);
    return;
  }
  updateValueTime(time);
}

function updateValueTime({ days, hours, minutes, seconds }) {
  refs.valueOfDays.textContent = `${days}`;
  refs.valueOfHours.textContent = `${hours}`;
  refs.valueOfMinutes.textContent = `${minutes}`;
  refs.valueOfSeconds.textContent = `${seconds}`;
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

refs.startBtn.addEventListener('click', count);
