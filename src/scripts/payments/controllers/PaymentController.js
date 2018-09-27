var noop = function () {}

module.exports = /* @ngInject */function ($controller, $scope, Payment, Member, translationPrefix, options) {
  var $ctrl = $controller('ModelController', {
    $scope: $scope,
    model: Payment,
    translationPrefix: translationPrefix,
    options: options
  })

  $ctrl.$onInit = (function (superOnInit) {
    return function onInit () {
      superOnInit.apply($ctrl, arguments)

      $ctrl.onBillingMemberChange()
      $ctrl.currentDate = new Date()
    }
  })($ctrl.$onInit || noop)

  $ctrl.onBillingMemberChange = function (payment) {
    payment = payment || $ctrl.data
    payment.members = $ctrl.replaceMember(payment.members, payment.billingMemberId)
    Payment.query({ limit: 1, context: 'short', billingMemberId: payment.billingMemberId }).$promise
      .then(function (payments) {
        if (payments.length >= 1) {
          if (!payment.membershipType) {
            payment.membershipType = payments[0].membershipType
            $ctrl.onMembershipChange(payment)
          }
          return
        }

        return Member.get({ id: payment.billingMemberId, context: 'edit' }).$promise
          .then(function (member) {
            if (member) {
              if (member.familyMembers.length > 0) {
                if (!payment.membershipType) {
                  payment.membershipType = 'family'
                  $ctrl.onMembershipChange(payment)
                  member.familyMembers.forEach(function (family) {
                    payment.members = $ctrl.addToMembers(payment.members, family)
                  })
                }
              } else {
                if (!payment.membershipType) {
                  switch (member.category) {
                    case 'regular':
                    default:
                      payment.membershipType = 'regular'
                      break
                    case 'retired':
                    case 'student':
                      payment.membershipType = 'discounted'
                      break
                  }
                  $ctrl.onMembershipChange(payment)
                }
              }
            }
          })
      })
      .catch(noop)
  }

  $ctrl.onMembersChange = function (payment) {
    payment = payment || $ctrl.data
    payment.members = $ctrl.addToMembers(payment.members, payment.billingMemberId)
  }

  $ctrl.onMembershipChange = function (payment) {
    payment = payment || $ctrl.data
    payment.amount = $ctrl.getPaymentAmount(payment.membershipType)
  }

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
    if (members.indexOf(member) !== -1) return members

    var newMembers = [].concat(members)
    newMembers.push(member)
    return newMembers
  }

  var lastMember
  $ctrl.replaceMember = function (members, member) {
    var newMembers = [].concat(members || [])
    var lastIdx = newMembers.indexOf(lastMember)
    if (lastIdx !== -1) {
      newMembers.splice(lastIdx, 1)
    }
    lastMember = member
    return $ctrl.addToMembers(newMembers, member)
  }

  return $ctrl
}
