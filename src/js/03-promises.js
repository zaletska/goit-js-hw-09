import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); // Fulfill
      } else {
        reject({ position, delay }); // Reject
      }
    }, delay);
  })  
}

function onFormSubmit(evt) {
  evt.preventDefault();
  let {
    elements: { delay, step, amount },
  } = evt.currentTarget;
  let elmDelay = Number(delay.value);
  let elmStep = Number(step.value);
  let elmAmount = Number(amount.value);
  
  if (elmDelay < 0 || elmStep < 0 || elmAmount <= 0) {
    alert('Date must be positive');
    return;
}

  for (let position = 1; position <= elmAmount; position += 1) {
   createPromise(position, elmDelay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    elmDelay += elmStep;
  }
}
