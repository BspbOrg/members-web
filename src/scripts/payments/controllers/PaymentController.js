module.exports = /* @ngInject */function () {
  var $ctrl = this

  $ctrl.getPaymentAmount = function (paymentType) {
    switch (paymentType) {
      case 'regular':
        return 10
      case 'family':
        return 15
      case 'discounted':
        return 7
      case 'group':
        return 20
      default:
        return 10
    }
  }

  $ctrl.addToMembers = function (members, member) {
    members = members || []
    if (members.indexOf(member) === -1) {
      members.push(member)
    }
    return members
  }
}
