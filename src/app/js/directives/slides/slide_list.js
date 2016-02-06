class SlideList extends Directive {
  defineInjections() {
    super.defineInjections();

    this.addInjections(['slideService']);
  }

  link(scope) {
    var updateSlides = () => {
      this.slideService.getAll().then((slides) => {
        console.log(slides);
      });
    };
    updateSlides();

    // form
    scope.slide = {
      name: "",
      text: "",
      backgroundColor: "",
      file: null
    };
    scope.addSlide = () => {
      this.slideService.post(scope.slide);
    };
  }
}

SlideList.register({
  group: 'slides',

  restrict: 'E',
  replace: true
});
