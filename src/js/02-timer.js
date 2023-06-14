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
      Notiflix.Notify.warning('Please choose a date in the future', {
        position: 'center-center',
      });
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
  datetimePicker.disabled = true;
  const selectedDate = calendar.parseDate(datetimePicker.value);

  timerID = setInterval(() => {
    let countTime = selectedDate.getTime() - Date.now();

    updateCountdownValues(countTime);

    if (countTime <= 0) {
      datetimePicker.disabled = false;
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
