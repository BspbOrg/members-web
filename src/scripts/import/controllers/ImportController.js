module.exports = /* @ngInject */function ($state, importItems, translationPrefix) {
  var controller = this
  controller.translationPrefix = translationPrefix
  controller.importing = false
  controller.importData = {
    create: false,
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
