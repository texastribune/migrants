import fastdom from 'fastdom';
import Observable from './utils/observable';
import { onDocumentComplete } from './utils/on-document-complete';
import select from './utils/select';
import selectAll from './utils/select-all';
import Viewport from './viewport';

class Yarn {
  constructor (parentElement, childElementClass) {
    const container = select(parentElement);
    const sectionElements = selectAll(childElementClass, container);

    this.sections = sectionElements.map((el) => new Section(el));

    this.onInViewportObservable = new Observable();
    this.onNextInViewportObservable = new Observable();
    this.onExitViewportObservable = new Observable();

    this.viewport = new Viewport();

    onDocumentComplete(() => {
      fastdom.measure(() => {
        this.setSectionBounds();

        this.viewport.onScroll(this.checkSectionStatus.bind(this));
      });
    });
  }

  onEnterViewport (callback) {
    this.onInViewportObservable.add(callback);
  }

  onNextInViewport (callback) {
    this.onNextInViewportObservable.add(callback);
  }

  onExitViewport (callback) {
    this.onExitViewportObservable.add(callback);
  }

  setSectionBounds () {
    this.sections.forEach((section) => section.getBounds());
  }

  checkSectionStatus (offset) {
    this.sections.forEach((section) => {
      console.log(section.getBounds());
    });
  }
}

class Section {
  constructor (element) {
    this.element = element;
    this.header = select('.header', element);
    this.media = select('.section__media', element);
    this.image = select('.section__media--image', element);
    this.cover = this.media ? select('.cover', this.image) : null;
    this.prose = select('.section__prose', element);

    this.imageShouldBlur = this.image ? this.image.getAttribute('data-blur-photo') || false : false;

    this.inViewport = false;
    this.topVisible = false;
    this.bottomVisible = false;

    this._bounds = null;
  }

  getBounds () {
    if (this._bounds) {
      return this._bounds;
    }

    this._bounds = this.element.getBoundingClientRect();
    return this._bounds;
  }
}

export default Yarn;
