module.exports = /* @ngInject */ function (
  $scope, $q, $state, $stateParams,
  $injector, $controller, options,
  translationPrefix, Member) {
  var $ctrl = $controller('ModelController', {
    $scope: $scope,
    model: Member,
    translationPrefix: translationPrefix,
    options: options
  })

  $ctrl.newMemberIdIndex = -1

  $ctrl.onNewMemberEntry = function (entry) {
    var names = entry.split(' ', 2)
    var item = {
      id: $ctrl.newMemberIdIndex--,
      firstName: names[0],
      lastName: names[1],
      label: entry
    }
    return item
  }
  $ctrl.onFamilyMemberSelect = function (item, isAdding) {
    if (item.isTag) {
      if (!$ctrl.data.newFamilyMembers) {
        $ctrl.data.newFamilyMembers = []
      }
      if (isAdding) {
        $ctrl.data.newFamilyMembers.push(item)
      } else {
        $ctrl.data.newFamilyMembers = $ctrl.data.newFamilyMembers.filter(function (arg) { return item.id !== arg.id })
      }
    }
  }

  $ctrl.preSave = function (data) {
    if (!data.newFamilyMembers) {
      return data
    }
    return $q.all(data.newFamilyMembers.map(function (item) {
      return Member.save({
        firstName: item.firstName,
        lastName: item.lastName,
        category: 'regular'
      }).$promise
    }))
      .then(function (result) {
        return result.map(function (item) {
          return item.id
        })
      })
      .then(function (result) {
        data.familyMembers = data.familyMembers.filter(function (memberId) {
          return memberId > 0
        }).concat(result)
        return data
      })
  }

  $ctrl.sendReminder = function () {
    Member.sendReminder({ memberId: $ctrl.data.id })
  }

  return $ctrl
}
