/* globals localStorage */

var key = 'bspb-members:demo:payments'

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
}

module.exports.save = function () {
  localStorage.setItem(key, JSON.stringify(module.exports))
}
