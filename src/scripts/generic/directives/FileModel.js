module.exports = /* @ngInject */function () {
  return {
    scope: {
      fileModel: '='
    },
    link: function (scope, element) {
      element.bind('change', function (changeEvent) {
        scope.$apply(function () {
          scope.fileModel = changeEvent.target.multiple ? changeEvent.target.files : changeEvent.target.files[0]
        })
      })
    }
  }
}
