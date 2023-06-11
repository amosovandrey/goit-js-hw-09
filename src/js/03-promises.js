import Notiflix from 'notiflix';

const formEl = document.querySelector('form');

const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');

let intervalID = null;

formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const delay = delayEl.value;
  const step = stepEl.value;
  const amount = amountEl.value;

  let createdPromises = 0;

  let position = 0;

  if (intervalID) {
    clearInterval(intervalID);
  }

  intervalID = setInterval(() => {
    position += 1;

    createPromise(position, delay)
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

    createdPromises += 1;

    if (createdPromises >= amount) {
      clearInterval(intervalID);
      return;
    }
  }, step);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
