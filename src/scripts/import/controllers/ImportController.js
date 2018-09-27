module.exports = /* @ngInject */function (importItems, translationPrefix, defaultValues, fileExample) {
  var controller = this
  controller.translationPrefix = translationPrefix
  controller.defaultValues = defaultValues
  controller.fileExample = fileExample
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
    controller.error = null
    controller.response = null
    importItems(Object.assign({}, controller.importData, { defaults: JSON.stringify(controller.importData.defaults) }))
      .then(function (response) {
        controller.response = response.data
        controller.importing = false
      })
      .catch(function (err) {
        controller.importing = false
        controller.error = err.data ? err.data.error : err
      })
  }
}
