var angular = require('angular')

module.exports = /* @ngInject */function ($state, importApi) {
  var controller = this

  controller.importData = {
    create: false,
    update: false,
    failOnError: false,
    dryRun: false,
    defaults: {}
  }

  controller.importing = false

  controller.import = function () {
    controller.importing = true
    importApi.members(controller.importData)
      .then(function (response) {
        controller.response = response.data
        controller.importing = false
      })
      .catch(function (err) {
        controller.importing = false
      })
  }
}
