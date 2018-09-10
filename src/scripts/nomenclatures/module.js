var moduleName = 'bspb.nomenclatures'

var nomenclatures = {
  membershipType: require('./plain/membershipType'),
  paymentType: require('./plain/paymentType'),
  memberCategory: require('./plain/memberCategory')
}

var mod = module.exports = require('angular')
  .module(moduleName, [])
  .service('$nomenclatures', require('./services/Nomenclatures'))
  .run(/* @ngInject */function ($rootScope, $nomenclatures) {
    $rootScope.$nomenclatures = $nomenclatures
    Object.keys(nomenclatures).forEach(function (nomenclatureName) {
      $nomenclatures.addNomenclature(nomenclatureName, nomenclatures[nomenclatureName])
    })
  })

Object.keys(nomenclatures).forEach(function (nomenclatureName) {
  mod
    .filter(nomenclatureName, require('./filters/nomenclatureLabel')(nomenclatures[nomenclatureName]))
})
