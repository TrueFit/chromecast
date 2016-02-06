class FileModel extends Directive {
  defineInjections() {
    super.defineInjections();

    this.addInjections(['$parse']);
  }

  link(scope, element, attrs) {
    var model = this.$parse(attrs.fileModel);
    var modelSetter = model.assign;

    element.bind('change', () => {
      scope.$apply(() => {
        modelSetter(scope, element[0].files[0]);
      });
    });
  }
}

FileModel.register({
  restrict: 'A'
});
