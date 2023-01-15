import Notiflix from 'notiflix';

const form = document.querySelector('.form');

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(`Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`Rejected promise ${position} in ${delay}ms`);
    }
  });
};

const onFormSubmit = el => {
  el.preventDefault();
  const step = el.currentTarget.elements.step.value;
  let delay = el.currentTarget.elements.delay.value;
  const amount = el.currentTarget.elements.amount.value;
  for (let i = 0; i < amount; i += 1) {
    setTimeout(() => {
      createPromise(i, delay)
        .then(({ position, delay }) => { Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`); })
        .catch(({ position, delay }) => { Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`); });
      delay += step;
    }
  )};
};

form.addEventListener('submit', onFormSubmit);