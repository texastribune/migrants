import select from './utils/select';
import selectAll from './utils/select-all';
import scrollWatcher from './utils/scroll-watcher';

const LAZYLOAD_OFFSET = 200;

const body = select('body');
const masthead = select('.masthead');
const header = select('.header');
const scrollToContinue = select('.section--starter .scroll-to-continue');
const firstSection = select('.section');
const headerImage = select('.section__media--image', firstSection);
const sectionImages = selectAll('.section__image');

const images = sectionImages.map((image) => {
  return {
    image,
    imageHasSrc: image.getAttribute('src'),
    hiddenOnMobile: image.classList.contains('section__image--hide-mobile')
  };
});

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

function lazyloadImages ({ offset }) {
  images.forEach((image, idx) => {
    if (image.imageHasSrc || image.hiddenOnMobile) return;

    const imageEl = image.image;

    const rect = imageEl.getBoundingClientRect();
    const distanceFromBottomViewport = rect.top - offset;

    if (distanceFromBottomViewport <= LAZYLOAD_OFFSET) {
      var onLoadHandler = function () {
        imageEl.removeEventListener('load', onLoadHandler, false);
        image.imageHasSrc = true;
      };

      imageEl.addEventListener('load', onLoadHandler, false);

      const src = imageEl.getAttribute('data-bg-src');
      imageEl.src = src;
    }
  });
}

scrollWatcher.add(activateMasthead);
scrollWatcher.add(lazyloadImages);
