var app = require('../app')

app.constant('ENDPOINT_URL', '')

switch (process.env.NODE_ENV || 'development') {
  // case 'developments':
  //   app.constant('ENDPOINT_URL', 'http://localhost:5000')
  //   break
  // default:
  //   app.constant('ENDPOINT_URL', 'https://bspb-members-staging.herokuapp.com')
  //   break
}
