import debounce from './utils/debounce';
import select from './utils/select';

const header = select('.header');
const image = select('.fluid-image');
const heightPercent = 1;
let storedInnerWidth = window.innerWidth;

const resizeImage = debounce(() => {
  const newInnerWidth = window.innerWidth;

  if (newInnerWidth !== storedInnerWidth) {
    storedInnerWidth = newInnerWidth;

    image.style.height = `${window.innerHeight * heightPercent}px`;
  }
}, 250);

window.addEventListener('resize', resizeImage);
window.addEventListener('orientationchange', resizeImage);

image.style.height = `${window.innerHeight * heightPercent}px`;

setTimeout(() => {
  header.classList.add('visible');
}, 1000);
