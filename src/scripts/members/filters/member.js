module.exports = /* @ngInject */function () {
  return function (value) {
    return value ? [value.firstName, value.lastName].filter(function (val) { return val }).join(' ') : ''
  }
}
