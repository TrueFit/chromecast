class Directive extends Base {
  link(scope, element, attr, ctrl) {
  }

  static defaultTemplatePath(opts, name) {
    if (opts.restrict != "E") {
      return null;
    }
    
    var undername = name.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    var filename = undername + '.html';
    var path = 'app/templates/directives/';

    if (opts.group) {
      path = path + opts.group + '/'
    }

    return path + filename;
  }

  static register(opts) {
    var name = this.name.camelCase();
    var opts = jQuery.extend({
      restrict: "",
      replace: false,
      scope: null,

      templateUrl: this.defaultTemplatePath(opts, name),

    }, opts);

    var controller = this.create();

    angular.module(window.appName).directive(name, () => {
      return {
        controller: controller,

        templateUrl: opts.templateUrl,
        scope: opts.scope,

        restrict: opts.restrict,
        replace: opts.replace,

        link: (scope, element, attr, ctrl) => {
          ctrl.link(scope, element, attr, ctrl);
        }
      };
    });
  }
}
