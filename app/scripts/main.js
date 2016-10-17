import debounce from './utils/debounce';
import select from './utils/select';
import selectAll from './utils/select-all';
// import throttle from './utils/throttle';
import scale from './utils/scale';
import scrollWatcher from './utils/scroll-watcher';

const header = select('.header');
const headerImage = select('.image');
const heightPercent = 1;

let storedInnerWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

const resizeImage = debounce(() => {
  const newInnerWidth = window.innerWidth;

  if (newInnerWidth !== storedInnerWidth) {
    storedInnerWidth = newInnerWidth;

    headerImage.style.height = `${window.innerHeight * heightPercent}px`;
  }
}, 250);

window.addEventListener('resize', resizeImage);
window.addEventListener('orientationchange', resizeImage);

headerImage.style.height = `${window.innerHeight * heightPercent}px`;

setTimeout(() => header.classList.add('visible'), 750);

const sections = selectAll('.story-section').map((el, index) => {
  const image = select('.image', el);

  return {
    index,
    el,
    image,
    cover: image ? select('.cover', image) : null,
    prose: select('.prose-container', el),
    inViewport: false,
    topVisible: false,
    bottomVisible: false
  };
});

const wHeight = window.innerHeight;
const blurScale = scale([300, 0], [0, 5], true);
const opacityScale = scale([300, 0], [0, 1], true);

function onScroll ({ offset }) {
  // const scrollTop = window.pageYOffset;
  const scrollBottom = wHeight + offset;

  sections.forEach((section, idx) => {
    const rect = section.el.getBoundingClientRect();

    const wasInViewport = section.inViewport;
    const topWasVisible = section.topVisible;
    const bottomWasVisible = section.bottomVisible;

    section.inViewport = rect.bottom > 0 && rect.top < wHeight;
    section.topVisible = offset < rect.top + offset;
    section.bottomVisible = scrollBottom > rect.bottom + offset;

    const distanceFromBottom = rect.bottom - wHeight;

    if (section.image) section.image.style.filter = `blur(${blurScale(distanceFromBottom)}px)`;
    if (section.cover) section.cover.style.opacity = opacityScale(distanceFromBottom);

    if (section.inViewport && !wasInViewport) {
      console.info('now in viewport: ', section.index);
      if (section.image) section.image.classList.add('pin-fixed');
      if (section.image) section.image.classList.add('visible');
    }

    if (!section.inViewport && wasInViewport) {
      console.info('leaving viewport: ', section.index);
      if (section.image) section.image.classList.remove('pin-fixed');
      if (section.image) section.image.classList.remove('visible');
    }

    if (section.inViewport && section.topVisible && !topWasVisible) {
      console.info('top entering viewport: ', section.index);
      // if (section.image) section.image.classList.add('pin-fixed');
      // if (section.image) section.image.classList.add('visible');
    }

    if (!section.topVisible && topWasVisible) {
      console.info('top leaving viewport: ', section.index);
    }

    if (section.bottomVisible && !bottomWasVisible) {
      console.info('bottom entering viewport: ', section.index);
      if (section.image) section.image.classList.remove('pin-fixed');
      if (section.image) section.image.classList.remove('visible');
    }

    if (!section.bottomVisible && bottomWasVisible) {
      console.info('bottom leaving viewport: ', section.index);
      if (section.image) section.image.classList.add('pin-fixed');
      if (section.image) section.image.classList.add('visible');
    }
  });
}

scrollWatcher.add(onScroll);

// const pageYOffset = window.pageYOffset;
//
// sections.forEach((section) => {
//   section.bounds = section.el.getBoundingClientRect();
//   section.offset = section.bounds.top + pageYOffset;
// });
