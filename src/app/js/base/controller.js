class Controller extends Base {
  defineInjections() {
    super.defineInjections();

    this.addInjections(['$scope']);
  }

  static register(injectWith) {
    // register controller
    angular.module(window.appName).controller(this.name, this.create());
  }
}
