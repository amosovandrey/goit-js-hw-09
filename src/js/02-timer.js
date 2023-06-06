import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

const startBtn = document.querySelector('[data-start]');
const datetimePicker = document.getElementById('datetime-picker');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

const calendar = flatpickr(datetimePicker, options);

const INTERVAL = 1000;
let timerID = null;

startBtn.disabled = true;

startBtn.addEventListener('click', startCountdown);

function startCountdown() {
  startBtn.disabled = true;
  const selectedDate = calendar.parseDate(datetimePicker.value);
  // let countTime = selectedDate.getTime() - Date.now();

  timerID = setInterval(() => {
    let countTime = selectedDate.getTime() - Date.now();

    updateCountdownValues(countTime);

    if (countTime <= 0) {
      clearInterval(timerID);
      updateCountdownValues(0);
      return;
    }
  }, INTERVAL);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateCountdownValues(countTime) {
  const { days, hours, minutes, seconds } = convertMs(countTime);
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import Notiflix from 'notiflix';

// const datetimePicker = document.getElementById('datetime-picker');
// const startBtn = document.querySelector('[data-start]');
// const daysValue = document.querySelector('[data-days]');
// const hoursValue = document.querySelector('[data-hours]');
// const minutesValue = document.querySelector('[data-minutes]');
// const secondsValue = document.querySelector('[data-seconds]');

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     const selectedDate = selectedDates[0];

//     if (selectedDate < Date.now()) {
//       Notiflix.Notify.warning('Please choose a date in the future');
//       startBtn.disabled = true;
//     } else {
//       startBtn.disabled = false;
//     }
//   },
// };

// flatpickr(datetimePicker, options);

// let countdownInterval;

// startBtn.addEventListener('click', () => {
//   startCountdown();
//   startBtn.disabled = true;
// });

// function startCountdown() {
//   const selectedDate = flatpickr.parseDate(datetimePicker.value);
//   const countdown = selectedDate.getTime() - Date.now();

//   if (countdown <= 0) {
//     updateTimerValues(0);
//     Notiflix.Notify.success('Countdown finished!');
//     return;
//   }

//   updateTimerValues(countdown);
//   countdownInterval = setInterval(() => {
//     const updatedCountdown = selectedDate.getTime() - Date.now();

//     if (updatedCountdown <= 0) {
//       clearInterval(countdownInterval);
//       updateTimerValues(0);
//       Notiflix.Notify.success('Countdown finished!');
//       return;
//     }

//     updateTimerValues(updatedCountdown);
//   }, 1000);
// }

// function updateTimerValues(countdown) {
//   const { days, hours, minutes, seconds } = convertMs(countdown);
//   daysValue.textContent = addLeadingZero(days);
//   hoursValue.textContent = addLeadingZero(hours);
//   minutesValue.textContent = addLeadingZero(minutes);
//   secondsValue.textContent = addLeadingZero(seconds);
// }

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = Math.floor(ms / day);
//   const hours = Math.floor((ms % day) / hour);
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// function addLeadingZero(value) {
//   return value.toString().padStart(2, '0');
// }
