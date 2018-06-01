var angular = require('angular')

angular
  .module('demo', ['members', require('angular-mocks/ngMockE2E')])
  .run(/* @ngInject */function ($httpBackend) {
    var members = [
      {
        id: 1,
        firstName: 'Иван',
        middleName: 'Иванов',
        lastName: 'Иванов',
        membershipExpire: new Date().getTime() + 3 * 30 * 24 * 60 * 60 * 1000
      },
      {
        id: 2,
        firstName: 'Ясен',
        lastName: 'Върбанов',
        membershipExpire: new Date().getTime() - 3 * 30 * 24 * 60 * 60 * 1000
      },
      {
        id: 3,
        firstName: 'Иван',
        middleName: 'Стефанов',
        lastName: 'Петров',
        username: 'ivanpetrov',
        email: 'ivan@petrov',
        country: 'България',
        city: 'Пловдив',
        postalCode: '4000',
        address: 'пл. Централен',
        phone: '+3598900000',
        cardId: '1234',
        accessId: '10001',
        category: 'regular',
        membershipExpire: new Date().getTime() - 7 * 30 * 24 * 60 * 60 * 1000
      }
    ]
    var payments = [
      {
        id: 1,
        paymentDate: new Date().getTime() - 30 * 30 * 24 * 60 * 60 * 100,
        amount: 10,
        membershipType: 'Индивидуално членство',
        paymentType: 'В офис на БДЗП',
        members: [1],
        billingMemberId: 1
      },
      {
        id: 2,
        paymentDate: new Date().getTime() - 20 * 30 * 24 * 60 * 60 * 100,
        amount: 15,
        membershipType: 'Семейно членство',
        paymentType: 'Платежно нареждане',
        members: [2, 3],
        billingMemberId: 2
      },
      {
        id: 3,
        paymentDate: new Date().getTime() - 10 * 30 * 24 * 60 * 60 * 100,
        amount: 10,
        membershipType: 'Промоция 2 за 1',
        paymentType: 'Борика ПОС',
        members: [1, 3],
        billingMemberId: 3
      }
    ]

    var filterNoop = function () { return true }

    var reduceIdFinder = function (id, found, candidate) {
      return found || (candidate.id === id ? candidate : null)
    }

    function getList (list, filter) {
      filter = filter || filterNoop
      return function (method, url, data, headers, params) {
        var filteredList = list.filter(filter.bind(null, params))
        return [200, {
          data: filteredList.slice(Number(params.offset) || 0, Number(params.limit) || 50),
          count: filteredList.length
        }, {}]
      }
    }

    function getListItem (list, filter) {
      filter = filter || filterNoop
      return function (method, url, data, headers, params) {
        var item = list.filter(filter.bind(null, params)).reduce(reduceIdFinder.bind(null, Number(params.id)), null)
        if (item) {
          return [200, {data: item}, {}]
        }
        return [404, {error: 'Not found'}, {}]
      }
    }

    function createListItem (list) {
      return function (method, url, data) {
        var item = JSON.parse(data)
        item.id = list.length + 1
        list.push(item)
        return [200, {data: item}, {}]
      }
    }

    function updateListItem (list) {
      return function (method, url, data, headers, params) {
        var id = Number(params.id)
        var item = list.reduce(reduceIdFinder.bind(null, id), null)
        if (item) {
          Object.assign(item, JSON.parse(data), {id: id})
          return [200, {data: item}, {}]
        }
        return [404, {error: 'Not found'}, {}]
      }
    }

    $httpBackend.whenGET('/me').respond({
      success: true,
      data: {id: 1, firstName: 'Admin', lastName: 'Admin', role: 'admin'}
    })

    function filterByMemberIds (params, item) {
      console.debug('filterByMemberIds', params)
      if (!params.memberIds) return true
      if ((params.memberIds instanceof Array)) {
        return params.memberIds.map(Number.bind(null)).indexOf(item.id) !== -1
      }
      return item.id === Number(params.memberIds)
    }

    $httpBackend.whenGET(/^\/member(\?.+)?$/).respond(getList(members, filterByMemberIds))
    $httpBackend.whenPOST('/member').respond(createListItem(members))
    $httpBackend.whenGET(/^\/member\/(\d+)$/, undefined, ['id']).respond(getListItem(members, filterByMemberIds))
    $httpBackend.whenPOST(/^\/member\/(\d+)$/, undefined, undefined, ['id']).respond(updateListItem(members))

    function filterByMemberId (params, item) {
      console.debug('filterByMemberId', params)
      return !params.memberId || (item.members && item.members.indexOf(Number(params.memberId)) !== -1)
    }

    $httpBackend.whenGET(/^\/payment(\?.+)?$/).respond(getList(payments, filterByMemberId))
    $httpBackend.whenPOST('/payment').respond(createListItem(payments))
    $httpBackend.whenGET(/^\/payment\/(\d+)$/, undefined, ['id']).respond(getListItem(payments, filterByMemberId))
    $httpBackend.whenPOST(/^\/payment\/(\d+)$/, undefined, undefined, ['id']).respond(updateListItem(payments))

    // fallback to passthrough
    $httpBackend.whenGET(/^\/views\/.+/).passThrough()
    // $httpBackend.whenGET(/.*/).passThrough()
    // $httpBackend.whenPOST(/.*/).passThrough()
    // $httpBackend.whenPUT(/.*/).passThrough()
    // $httpBackend.whenDELETE(/.*/).passThrough()
  })
