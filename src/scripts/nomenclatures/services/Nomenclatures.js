module.exports = /* @ngInject */function () {
  var nomenclatures = {}

  return {
    addNomenclature: function (name, def) {
      nomenclatures[name] = {
        def: def
      }
    },
    list: function (name) {
      var nomenclature = nomenclatures[name]
      if (!nomenclature) throw new Error('Undefined nomenclature ' + name)
      if (!nomenclature.list) {
        nomenclature.list = Object.keys(nomenclature.def).map(function (key) {
          return {
            id: key,
            label: nomenclature.def[key]
          }
        })
      }
      return nomenclature.list
    }
  }
}
