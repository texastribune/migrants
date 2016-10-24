// import debounce from './utils/debounce';
import select from './utils/select';
import selectAll from './utils/select-all';
// import throttle from './utils/throttle';
import scale from './utils/scale';
import scrollWatcher from './utils/scroll-watcher';
//
const header = select('.header');
// const heightPercent = 1;
//
// let storedInnerWidth = window.innerWidth;
// const viewportHeight = window.innerHeight;

// const resizeImage = debounce(() => {
//   const newInnerWidth = window.innerWidth;
//
//   if (newInnerWidth !== storedInnerWidth) {
//     storedInnerWidth = newInnerWidth;
//
//     headerImage.style.height = `${window.innerHeight * heightPercent}px`;
//   }
// }, 250);
//
// window.addEventListener('resize', resizeImage);
// window.addEventListener('orientationchange', resizeImage);
//
//
setTimeout(() => header.classList.add('visible'), 750);
//
const sections = selectAll('.section').map((el, idx) => {
  const header = select('.header', el);
  const media = select('.section__media', el);
  const image = select('.section__media--image', el);

  const section = {
    idx,
    el,
    header,
    media,
    image,
    blurImage: image ? image.getAttribute('data-blur-photo') || false : false,
    cover: media ? select('.cover', image) : null,
    prose: select('.section__prose', el),
    inViewport: false,
    topVisible: false,
    bottomVisible: false
  };

  return section;
});

const wHeight = window.innerHeight;
const blurScale = scale([300, 0], [0, 5], true);
const opacityScale = scale([300, 0], [0, 1], true);

function onScroll ({ offset }) {
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

    if (section.blurImage) {
      if (section.media) section.media.style.filter = `blur(5px)`;
      if (section.cover) section.cover.style.opacity = 0.9;
    } else {
      if (section.media) section.media.style.filter = `blur(${blurScale(distanceFromBottom)}px)`;
      if (section.cover) section.cover.style.opacity = opacityScale(distanceFromBottom);
    }

    if (section.inViewport && !wasInViewport) {
      console.info('now in viewport: ', section.index);
      if (section.media) section.media.classList.add('pin-fixed');
      if (section.media) section.media.classList.add('visible');

      if (section.header) section.header.classList.add('visible');
    }

    if (!section.inViewport && wasInViewport) {
      console.info('leaving viewport: ', section.index);
      if (section.media) {
        section.media.classList.remove('pin-fixed');
        section.media.classList.remove('visible');
      }

      if (section.header) section.header.classList.remove('visible');
    }

    if (section.inViewport && section.topVisible && !topWasVisible) {
      console.info('top entering viewport: ', section.index);
      if (section.media) section.media.classList.add('pin-fixed');
      if (section.media) section.media.classList.add('visible');
    }

    if (!section.topVisible && topWasVisible) {
      console.info('top leaving viewport: ', section.index);
    }

    if (section.bottomVisible && !bottomWasVisible) {
      console.info('bottom entering viewport: ', section.index);
      if (section.media) section.media.classList.remove('pin-fixed');
      if (section.media) section.media.classList.remove('visible');
    }

    if (!section.bottomVisible && bottomWasVisible) {
      console.info('bottom leaving viewport: ', section.index);
      if (section.media) section.media.classList.add('pin-fixed');
      if (section.media) section.media.classList.add('visible');
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
