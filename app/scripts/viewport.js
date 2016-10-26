import fastdom from 'fastdom';
import Observable from './utils/observable';

function Viewport () {
  this.win = window;
  this.fastdom = fastdom;

  this._scrollTop = null;
  this._size = null;

  this.scrollObservable = new Observable();
  // this.resizeObservable = new Observable();

  this.connect();

  this.fastdom.measure(() => {
    this.getSize();
  });
}

Viewport.prototype.connect = function () {
  this.win.addEventListener('scroll', this._whenScroll.bind(this));
};

Viewport.prototype._whenScroll = function () {
  this.fastdom.measure(() => {
    this._scrollTop = this.win.pageYOffset;

    this.scrollObservable.trigger(this._scrollTop);
  });
};

Viewport.prototype.onScroll = function (callback) {
  this.scrollObservable.add(callback);
};

// Viewport.prototype.onResize = function (callback) {
//   this.resizeObservable.add(callback);
// };

Viewport.prototype.getScrollTop = function () {
  if (this._scrollTop == null) {
    this._scrollTop = this.win.pageYOffset;
  }

  return this._scrollTop;
};

Viewport.prototype.getSize = function () {
  if (this._size == null) {
    this._size = {
      width: this.win.innerWidth,
      height: this.win.innerHeight
    };
  }

  return this._size;
};

export default Viewport;
