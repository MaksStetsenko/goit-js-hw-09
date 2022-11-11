import Notiflix from 'notiflix';

//===================================================

const refs = {
  firstDelay: document.querySelector('[name=delay]'),
  step: document.querySelector('[name=step]'),
  amount: document.querySelector('[name=amount]'),
  form: document.querySelector('.form'),
};

//===================================================

const createPromise = (position, delay) => {
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
};

const onSubmit = event => {
  event.preventDefault();

  let valueOfFirstDelay = Number(refs.firstDelay.value);
  let valueOfStep = Number(refs.step.value);
  let valueOfAmount = Number(refs.amount.value);

  for (let index = 1; index <= valueOfAmount; index += 1) {
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
};

//==================================================

refs.form.addEventListener('submit', onSubmit);
