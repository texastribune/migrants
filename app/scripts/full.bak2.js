import fastdom from 'fastdom';
import select from './utils/select';
import Yarn from './yarn';

const firstHeader = select('.section--starter .header');
const scrollToContinue = select('.section--starter .scroll-to-continue');

setTimeout(() => {
  fastdom.mutate(() => firstHeader.classList.add('visible'));
}, 750);

setTimeout(() => {
  fastdom.mutate(() => scrollToContinue.classList.add('visible'));
}, 1000 * 5);

const yarn = new Yarn('.sections', '.section');

yarn.onEnterViewport((section) => {
  console.log(section);
});
