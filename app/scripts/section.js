import select from './utils/select';

function Section (element) {
  this.el = select(element);
  this.header = select('.header', this.el);
  this.media = select('.section__media', this.el);
  this.image = select('.section__media--image', this.el);
  this.cover = this.media ? select('.cover', this.image) : null;
  this.prose = select('.section__prose', this.el);

  this.imageShouldBlur = this.image ? this.image.getAttribute('data-blur-photo') || false : false;

  this.inViewport = false;
  this.topVisible = false;
  this.bottomVisible = false;
};

export default Section;
