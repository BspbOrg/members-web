var angular = require('angular')
var FormData = require('form-data')

module.exports = /* @ngInject */function ($http, ENDPOINT_URL) {
  return {
    members: function (importData) {
      return $http({
        method: 'POST',
        headers: {
          'Content-Type': undefined
        },
        url: ENDPOINT_URL + '/import/member',
        data: importData,
        transformRequest: function (data, headersGetter) {
          var formData = new FormData()
          angular.forEach(data, function (value, key) {
            formData.append(key, value)
          })

          return formData
        }
      })
    }
  }
}
