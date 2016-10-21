// TODO: maybe check for mobile devices instead?
const useSimpleView = window.innerWidth < 768;

if (useSimpleView) {
  require.ensure(['./simple'], (require) => {
    require('./simple');
  }, 'simple');
} else {
  require.ensure(['./full'], (require) => {
    require('./full');
  }, 'full');
}
