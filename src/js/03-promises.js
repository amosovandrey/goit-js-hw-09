import Notiflix from 'notiflix';

const formEl = document.querySelector('form');
console.log(formEl);

formEl.addEventListener('click', onFormClick);

function onFormClick(e) {
  if (e.target === formEl.querySelector('button')) {
    e.preventDefault();
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
