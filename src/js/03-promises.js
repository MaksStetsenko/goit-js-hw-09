import Notiflix from 'notiflix';

//===================================================

const firstDelay = document.querySelector('[name=delay]');
const step = document.querySelector('[name=step]');
const amount = document.querySelector('[name=amount]');
const form = document.querySelector('.form');

//===================================================

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmit(event) {
  event.preventDefault();
  let valueOfFirstDelay = Number(firstDelay.value);
  let valueOfStep = Number(step.value);
  let valueofAmount = Number(amount.value);

  for (let index = 1; index <= valueofAmount; index += 1) {
    createPromise(index, valueOfFirstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    valueOfFirstDelay += valueOfStep;
  }
}

//==================================================

form.addEventListener('submit', onSubmit);
