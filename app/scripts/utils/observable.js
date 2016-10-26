/**
 * Another variation of the Observer pattern. Unlike `EventObserver`, there are
 * no string-based keys. Each instantiated instance is a single observable.
 *
 * @constructor
 */
function Observable () {
  this._callbacks = [];
}

/**
 * Method to add new callback.
 *
 * @param {Function} callback
 * @return {Function}
 */
Observable.prototype.add = function (callback) {
  var _this = this;

  this._callbacks.push(callback);

  return function () {
    _this.remove(callback);
  };
};

/**
 * Method to remove a callback.
 *
 * @param  {Function} callback
 */
Observable.prototype.remove = function (callback) {
  var index = this._callbacks.indexOf(callback);

  if (index > -1) {
    this._callbacks.splice(index, 1);
  }
};

/**
 * Clears all of the callbacks.
 */
Observable.prototype.clear = function () {
  this._callbacks = 0;
};

/**
 * Triggers all the callbacks, passing in an optional parameter.
 *
 * @param  {*} data
 */
Observable.prototype.trigger = function (data) {
  var callbacks = this._callbacks;

  for (var i = 0; i < callbacks.length; i++) {
    var callback = callbacks[i];
    callback(data);
  }
};

export default Observable;
