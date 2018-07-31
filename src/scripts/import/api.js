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
        transformRequest: function (data) {
          var formData = new FormData()
          angular.forEach(data, function (value, key) {
            formData.append(key, value)
          })

          return formData
        }
      })
    },
    payments: function (importData) {
      return $http({
        method: 'POST',
        headers: {
          'Content-Type': undefined
        },
        url: ENDPOINT_URL + '/import/payment',
        data: importData,
        transformRequest: function (data) {
          var formData = new FormData()
          angular.forEach(data, function (value, key) {
            formData.append(key, value)
          })

          return formData
        }
      })
    },
    family: function (importData) {
      return $http({
        method: 'POST',
        headers: {
          'Content-Type': undefined
        },
        url: ENDPOINT_URL + '/import/family',
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
  }
}
