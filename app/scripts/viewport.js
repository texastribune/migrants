import Observable from './utils/observable';
import throttle from './utils/throttle';

export default class Viewport {
  constructor () {
    this.win = window;

    this.scrollObservable = new Observable();

    this._boundThrottledScroll = this._throttledScroll.bind(this);
  }

  activate () {
    this.win.addEventListener('scroll', this._boundThrottledScroll);
  }

  deactivate () {
    this.win.removeEventListener('scroll', this._boundThrottledScroll);
  }

  _throttledScroll () {

  }

  onScroll (callback) {
    this.scrollObservable.add(callback);
  }
}
