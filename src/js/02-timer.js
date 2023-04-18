import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStartTimer = document.querySelector('button[data-start]');
const dateDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const textLabel = document.querySelectorAll('.label');
textLabel.forEach(
  element => (element.textContent = element.textContent.toUpperCase())
);

btnStartTimer.setAttribute('disabled', true);

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

btnStartTimer.addEventListener('click', onClickStartTimer);

let userTime = null;
let newTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  altInput: true,
  altFormat: 'F j, Y',
  dateFormat: 'Y-m-d',
  onClose(selectedDates) {
    userTime = selectedDates[0];

    onInput(selectedDates);
  },
};

function onClickStartTimer() {
  btnStartTimer.setAttribute('disabled', true);
  const intervalId = setInterval(() => {
    newTime = new Date();

    if (!btnStartTimer.hasAttribute('disabled') || userTime <= newTime) {
      clearInterval(intervalId);
      return;
    }
    const arrDate = convertMs(comparisonDateNum(userTime, newTime));
    const dateUser = name(arrDate);

    setNewDate(dateUser);
  }, 1000);
}

const fp = flatpickr('#datetime-picker', { ...options });

function onInput() {
  btnStartTimer.setAttribute('disabled', true);
  if (userTime > newTime) {
    btnStartTimer.removeAttribute('disabled');
    return;
  } else {
    window.alert('Please choose a date in the future');
    return;
  }
}

function name(params) {
  params.days = String(params.days).padStart(2, '0');
  params.hours = String(params.hours).padStart(2, '0');
  params.minutes = String(params.minutes).padStart(2, '0');
  params.seconds = String(params.seconds).padStart(2, '0');
  return params;
}

function setNewDate(dateUser) {
  dateDays.textContent = dateUser.days;
  dataHours.textContent = dateUser.hours;
  dataMinutes.textContent = dateUser.minutes;
  dataSeconds.textContent = dateUser.seconds;
}

function comparisonDateNum(andTime, now) {
  return andTime - now;
}