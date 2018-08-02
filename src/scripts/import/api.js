var angular = require('angular')
var FormData = require('form-data')

module.exports = /* @ngInject */function ($http, ENDPOINT_URL) {
  var baseImport = function (type, importData) {
    return $http({
      method: 'POST',
      headers: {
        'Content-Type': undefined
      },
      url: ENDPOINT_URL + '/import/' + type,
      data: importData,
      transformRequest: function (data) {
        var formData = new FormData()
        angular.forEach(data, function (value, key) {
          formData.append(key, value)
        })

        return formData
      }
    })
  }
  return {
    members: function (importData) {
      return baseImport('member', importData)
    },
    payments: function (importData) {
      return baseImport('payment', importData)
    },
    family: function (importData) {
      return baseImport('family', importData)
    }
  }
}
