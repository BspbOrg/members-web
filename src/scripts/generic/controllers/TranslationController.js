module.exports = /* @ngInject */function ($injector) {
  var $ctrl = this

  if ($injector.has('translationPrefix')) {
    $ctrl.translationPrefix = $injector.get('translationPrefix', 'TranslationController')
  }

  if ($injector.has('translationParams')) {
    $ctrl.translationParams = $injector.get('translationParams', 'TranslationController')
  }
}
