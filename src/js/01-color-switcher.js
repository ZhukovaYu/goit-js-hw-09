const events = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.body,
};

events.start.addEventListener('click', onStartClick);
events.stop.addEventListener('click', onStopClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId = null;

events.stop.setAttribute('disabled', 'true');

function onStartClick() {
  intervalId = setInterval(() => {
    events.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  events.start.setAttribute('disabled', 'true');
  events.stop.removeAttribute('disabled');
}

function onStopClick() {
  clearInterval(intervalId);
  events.start.removeAttribute('disabled');
  events.stop.setAttribute('disabled', 'true');
}