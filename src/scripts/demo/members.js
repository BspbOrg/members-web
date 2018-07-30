/* globals localStorage */

var key = 'bspb-members:demo:members'

module.exports = localStorage.getItem(key)
if (module.exports) {
  try {
    module.exports = JSON.parse(module.exports)
  } catch (e) {
    module.exports = false
  }
}

if (!module.exports) {
  module.exports = [
    {
      id: 1,
      firstName: 'Асен',
      middleName: 'Асенов',
      lastName: 'Виденов',
      membershipExpire: new Date().getTime() + 3 * 30 * 24 * 60 * 60 * 1000,
      category: 'student',
      email: 'boss@acme.com',
      country: 'Bulgaria'
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
}

module.exports.save = function () {
  localStorage.setItem(key, JSON.stringify(module.exports))
}
