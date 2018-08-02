module.exports = /* @ngInject */function ($scope, $state, importItems, translationPrefix, defaultValues) {
  var controller = this
  controller.translationPrefix = translationPrefix
  controller.defaultValues = defaultValues
  controller.importing = false
  controller.importData = {
    create: true,
    update: false,
    failOnError: false,
    dryRun: false,
    defaults: {}
  }

  controller.import = function () {
    controller.importing = true
    importItems(controller.importData)
      .then(function (response) {
        controller.response = response.data
        controller.importing = false
      })
      .catch(function (err) {
        controller.importing = false
        console.log(err)
      })
  }
}
