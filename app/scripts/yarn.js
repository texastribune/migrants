import EventObserver from './utils/event-observer';
import scrollWatcher from './utils/scroll-watcher';
import select from './utils/select';
import selectAll from './utils/select-all';

class Yarn extends EventObserver {
  constructor (parentElement, childElements) {
    super();

    this.parent = select(parentElement);
    this.children = selectAll(childElements, this.parent);
    this.watcher = scrollWatcher;
  }
}

export default Yarn;
