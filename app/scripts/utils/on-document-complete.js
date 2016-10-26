/**
 * Provides a hook for a callback to be called once the document and its
 * sub-resources have finished loading.
 *
 * @private
 * @param  {Function} callback
 */
export function onDocumentComplete (callback) {
  // if the page is not completely loaded, let's set up a load event
  if (document.readyState !== 'complete') {
    // set up our listener function so we can unset it once we use it
    var windowLoadListener = function () {
      // remove the listener
      window.removeEventListener('load', windowLoadListener, false);
      callback();
    };

    // set up the load listener
    window.addEventListener('load', windowLoadListener, false);
  } else {
    callback();
  }
}

/**
 *
 * A version of `onDocumentLoaded` that instead returns a Promise.
 *
 * @return {Promise}
 */
export function whenDocumentComplete () {
  return new Promise(onDocumentComplete);
}
