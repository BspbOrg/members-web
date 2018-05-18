var app = require('../app')

switch (process.env.NODE_ENV || 'development') {
  case 'development':
    app.constant('ENDPOINT_URL', 'http://localhost:5000')
    break
  default:
    app.constant('ENDPOINT_URL', 'https://bspb-members-staging.herokuapp.com')
    break
}
