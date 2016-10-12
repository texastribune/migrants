/* global performance */

/**
 * If `performance` is available, use it for timing. Otherwise, use `Date`.
 * @type {Object}
 * @private
 */
const clock = typeof performance === 'object' ? performance : Date;

/**
 * Returns a Number representation of the current time. Uses
 * `performance.now()` if available, otherwise uses `Date.now()`.
 *
 * @private
 * @return {Number}
 */
function getTimeStamp () {
  return clock.now();
}

export default function throttle (func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function () {
    previous = options.leading === false ? 0 : getTimeStamp();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    var now = getTimeStamp();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}
