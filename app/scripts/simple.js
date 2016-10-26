import select from './utils/select';
import throttle from './utils/throttle';

const body = select('body');
const masthead = select('.masthead');
const header = select('.header');
const scrollToContinue = select('.section--starter .scroll-to-continue');
const firstSection = select('.section');
const headerImage = select('.section__media--image', firstSection);

body.classList.add('is-simple');

headerImage.style.height = `${window.innerHeight}px`;
setTimeout(() => header.classList.add('visible'), 750);
setTimeout(() => scrollToContinue.classList.add('visible'), 1000 * 3);

function activateMasthead ({ offset }) {
  const rect = firstSection.getBoundingClientRect();

  if (rect.bottom < 0) {
    masthead.classList.add('visible');
  } else {
    masthead.classList.remove('visible');
  }
}

window.addEventListener('scroll', throttle(activateMasthead, 100));
