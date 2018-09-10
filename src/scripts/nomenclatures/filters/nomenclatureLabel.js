module.exports = function (NOMENCLATURE) {
  return /* @ngInject */function ($translate) {
    return function (nomenclatureId) {
      return $translate.instant(NOMENCLATURE[nomenclatureId] || nomenclatureId)
    }
  }
}
