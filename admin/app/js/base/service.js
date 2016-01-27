class Service extends Base {
  static register(injectWith) {
    angular.module(window.appName).factory(this.name.camelCase(), this.create());
  }
}
