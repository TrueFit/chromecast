class SlideDisplay extends Directive {
  defineInjections() {
    super.defineInjections();

    this.addInjections(['slideService', '$timeout']);
  }

  link(scope) {
    var visibleIndex = 0;
    var cycle = () => {
      this.$timeout(cycle, 10000);

      console.log(visibleIndex);

      visibleIndex++;
      if (visibleIndex >= scope.slides.length) {
        visibleIndex = 0;
      }
    };

    var updateSlides = () => {
      this.slideService.getAll().then((slides) => {
        visibleIndex = 0;

        for (var i = 0; i < slides.length; i++) {
          var slide = slides[i];

          slide.index = i;
          slide.url = "/images/" + slide.image;
          slide.shouldShow = (index) => { return index == visibleIndex; };
        }

        scope.slides = slides;

        cycle();
      });
    };
    updateSlides();
  }
}

SlideDisplay.register({
  group: 'slides',

  restrict: 'E',
  replace: true
});
