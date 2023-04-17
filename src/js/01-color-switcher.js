const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let timer = null;

btnStart.addEventListener('click', () => {
  timer = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
});

btnStop.addEventListener('click', () => {
  clearInterval(timer);

  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', true);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
