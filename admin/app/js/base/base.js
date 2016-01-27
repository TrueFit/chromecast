class Base {
  // help around managing injections, so it can go up a tree nicely
  defineInjections() {
    this.addInjections(['$q']);
  }

  addInjections(args) {
    this.dependencies = jQuery.merge(this.dependencies ? this.dependencies : [], args);
  }

  // create
  static create() {
    var instance = new this();

    // build up dependencies
    instance.defineInjections();
    var injectArgs = instance.dependencies;

    // wrap the object so it works in ES5
    var objectWrap = function() {
      // assign injectables
      var args = arguments ? arguments : [];
      for (var i = 0; i < injectArgs.length; i++) {
        instance[injectArgs[i]] = args[i];
      }

      // call init
      if (instance.init) {
        instance.init();
      }

      return instance;
    };
    objectWrap.$inject = injectArgs;

    // return
    return objectWrap;
  }
}
