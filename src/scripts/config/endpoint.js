var app = require('../app')

switch (process.env.NODE_ENV || 'development') {
  case 'development':
    app.constant('ENDPOINT_URL', 'http://localhost:5000')
    break
  default:
    if (global.location.host.match('staging')) {
      app.constant('ENDPOINT_URL', 'https://bspb-members-staging.herokuapp.com')
    } else {
      app.constant('ENDPOINT_URL', 'https://api.members.bspb.org')
    }
    break
}
