// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";


const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

let intervalId = null;
let selectedDate = null;

refs.start.addEventListener('click', onStartClick);
refs.start.setAttribute('disabled', 'true');

flatpickr(refs.datetimePicker, options);

function onCloseInput(selectedDates) {
  selectedDate = selectedDates[0];

  if (selectedDate <= options.defaultDate) {
    alert('Please choose a date in the future');
    return;
  }

  refs.start.removeAttribute('disabled');
  const ms = selectedDate - options.defaultDate;
  buildTimer(ms);
}

function onStartClick() {
  if (selectedDate <= new Date()) {
    alert('Please choose a date in the future');
    refs.start.setAttribute('disabled', 'true');
    const ms = 0;
    buildTimer(ms);
    return;
  }

  refs.start.setAttribute('disabled', 'true');
  refs.datetimePicker.setAttribute('disabled', 'true');

  intervalId = setInterval(() => {
    const ms = selectedDate - new Date();
    if (ms <= 1000) {
      refs.datetimePicker.removeAttribute('disabled');
      clearInterval(intervalId);
    }
    buildTimer(ms);
  }, 1000);
}

function buildTimer(ms) {
  const timerData = convertMs(ms);
  randerTimer(timerData);
}

function randerTimer({ days, hours, minutes, seconds }) {
  refs.days.innerHTML = addLeadingZero(days);
  refs.hours.innerHTML = addLeadingZero(hours);
  refs.minutes.innerHTML = addLeadingZero(minutes);
  refs.seconds.innerHTML = addLeadingZero(seconds);
}

//--функція convertMs, де ms - різниця між кінцевою і поточною датою в мілісекундах
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//--інтерфейсі таймера необхідно додавати 0, якщо в числі менше двох символів
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}