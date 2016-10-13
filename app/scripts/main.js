// import debounce from './utils/debounce';
// import select from './utils/select';
// import selectAll from './utils/select-all';
// // import throttle from './utils/throttle';
// import scrollWatcher from './utils/scroll-watcher';
//
// const header = select('.header');
// const headerImage = select('.header-image');
// const heightPercent = 1;
//
// let storedInnerWidth = window.innerWidth;
// const viewportHeight = window.innerHeight;
//
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
// headerImage.style.height = `${window.innerHeight * heightPercent}px`;
//
// setTimeout(() => header.classList.add('visible'), 750);
//
// const sections = selectAll('.story-section').map((el, index) => {
//   return {
//     index,
//     el,
//     image: select('.header-image', el),
//     prose: select('.prose-container', el),
//     inViewport: false,
//     topVisible: false,
//     bottomVisible: false
//   };
// });
//
// const wHeight = window.innerHeight;
//
// // window.addEventListener('scroll', throttle(() => {
//
// function onScroll ({ offset }) {
//   // const scrollTop = window.pageYOffset;
//   const scrollBottom = wHeight + offset;
//
//   sections.forEach((section, idx) => {
//     const rect = section.el.getBoundingClientRect();
//
//     const wasInViewport = section.inViewport;
//     section.inViewport = rect.bottom > 0 && rect.top < wHeight;
//
//     if (!section.inViewport) return false;
//
//     const topWasVisible = section.topVisible;
//     const bottomWasVisible = section.bottomVisible;
//
//     section.topVisible = offset < rect.top + offset;
//     section.bottomVisible = scrollBottom > rect.bottom + offset;
//
//     if (section.inViewport && !wasInViewport) {
//       console.info('now in viewport: ', section.index);
//     }
//
//     if (section.inViewport && section.topVisible && !topWasVisible) {
//       console.info('top entering viewport: ', section.index);
//       console.log('remove fixed, remove visible');
//       if (section.image) section.image.classList.remove('pin-fixed');
//       if (section.image) section.image.classList.add('visible');
//       if (section.prose) section.prose.classList.remove('visible');
//     }
//
//     if (!section.topVisible && topWasVisible) {
//       console.info('top leaving viewport: ', section.index);
//       console.log('add fixed, toggle visible');
//       if (section.image) section.image.classList.add('pin-fixed');
//       if (section.prose) section.prose.classList.toggle('visible');
//     }
//
//     if (section.bottomVisible && !bottomWasVisible) {
//       console.info('bottom entering viewport: ', section.index);
//       console.log('remove fixed, add bottom, toggle visible');
//       if (section.image) section.image.classList.remove('pin-fixed');
//       if (section.image) section.image.classList.add('pin-bottom');
//       // if (section.prose) section.prose.classList.toggle('visible');
//     }
//
//     if (!section.bottomVisible && bottomWasVisible) {
//       console.info('bottom leaving viewport: ', section.index);
//       console.log('add fixed, remove bottom, toggle visible');
//       if (section.image) section.image.classList.add('pin-fixed');
//       if (section.image) section.image.classList.remove('pin-bottom');
//       if (section.prose) section.prose.classList.toggle('visible');
//     }
//
//     if (!section.inViewport && wasInViewport) {
//       console.info('leaving viewport: ', section.index);
//       // select('.header-image', section.el).classList.remove('visible');
//     }
//   });
// }
//
// scrollWatcher.add(onScroll);
//
// sections.forEach((section) => (section.el.style.height = `${viewportHeight * 1.35}px`));

// const pageYOffset = window.pageYOffset;
//
// sections.forEach((section) => {
//   section.bounds = section.el.getBoundingClientRect();
//   section.offset = section.bounds.top + pageYOffset;
// });
