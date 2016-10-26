import EventObserver from './event-observer';
import raf from './raf';
import throttle from './throttle';

/**
 * `scrollWatcher` alerts any listeners when window's `scroll` event fires.
 * Intelligently doesn't activate the event listener unless it is needed, and
 * will clear the listener if nothing needs it.
 */
var scrollWatcher = function () {
  var observer = new EventObserver();
  var lastScrollPosition = 0;
  var active = false;
  var throttledOnWindowScroll = throttle(onWindowScroll, 100);

  function onWindowScroll () {
    lastScrollPosition = window.pageYOffset;
    requestTick();
  }

  function requestTick () {
    if (!active) {
      raf(update);
      active = true;
    }
  }

  function update () {
    observer.trigger('scroll', {offset: lastScrollPosition});
    active = false;
  }

  return {
    /**
     * Adds a new listener to `scrollWatcher`. Doesn't set the event listener
     * for the `scroll` event until at least one is added.
     *
     * @memberof scrollWatcher
     * @param {Function} callback
     * @return {void}
     */
    add: function (callback) {
      if (!observer.eventHasListeners('scroll')) {
        window.addEventListener('scroll', throttledOnWindowScroll, false);
      }

      observer.on('scroll', callback);
    },

    /**
     * Removes a listener from `scrollWatcher`. If there are no more listeners
     * active, the `scroll` event listener is unset.
     *
     * @memberof scrollWatcher
     * @param  {Function} callback
     * @return {void}
     */
    remove: function (callback) {
      observer.off('scroll', callback);

      if (!observer.eventHasListeners('scroll')) {
        window.removeEventListener('scroll', throttledOnWindowScroll, false);
      }
    },

    /**
     * Removes all listeners on `scrollWatcher`.
     *
     * @memberof scrollWatcher
     * @return {void}
     */
    clear: function () {
      observer.clearAllListeners('scroll');
      window.removeEventListener('scroll', throttledOnWindowScroll, false);
    }
  };
};

export default scrollWatcher();
